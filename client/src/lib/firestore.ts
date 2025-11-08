import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  deleteDoc,
  Timestamp
} from 'firebase/firestore';
import { db } from './firebase';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface Chat {
  id: string;
  title: string;
  timestamp: string;
  messages: Message[];
  userId: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export async function saveChat(userId: string, chat: Omit<Chat, 'userId' | 'createdAt' | 'updatedAt'>) {
  const chatRef = doc(db, 'chats', chat.id);
  const now = Timestamp.now();
  
  await setDoc(chatRef, {
    ...chat,
    userId,
    createdAt: now,
    updatedAt: now
  });
}

export async function updateChat(chatId: string, updates: Partial<Chat>) {
  const chatRef = doc(db, 'chats', chatId);
  
  await setDoc(chatRef, {
    ...updates,
    updatedAt: Timestamp.now()
  }, { merge: true });
}

export async function getUserChats(userId: string): Promise<Chat[]> {
  const chatsRef = collection(db, 'chats');
  const q = query(
    chatsRef,
    where('userId', '==', userId),
    orderBy('updatedAt', 'desc')
  );
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    ...doc.data(),
    id: doc.id
  } as Chat));
}

export async function getChat(chatId: string): Promise<Chat | null> {
  const chatRef = doc(db, 'chats', chatId);
  const chatSnap = await getDoc(chatRef);
  
  if (chatSnap.exists()) {
    return { ...chatSnap.data(), id: chatSnap.id } as Chat;
  }
  
  return null;
}

export async function deleteChat(chatId: string) {
  const chatRef = doc(db, 'chats', chatId);
  await deleteDoc(chatRef);
}
