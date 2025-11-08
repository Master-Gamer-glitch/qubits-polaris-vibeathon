# Firebase Setup Guide for Candela

## Current Status
✅ Firebase SDK installed  
✅ Authentication context created  
✅ Firestore utilities ready  
✅ Security rules configured  
✅ Hosting configuration ready  
❌ **Firebase credentials need verification**

## Error: "Firebase: Error (auth/invalid-api-key)"

This error occurs when the Firebase API key is not properly configured. Here's how to fix it:

### Step 1: Verify Firebase Project Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to **Project Settings** (gear icon)
4. Scroll down to "Your apps" section
5. Make sure you have a **Web app** registered (with the `</>` icon)
   - If not, click "Add app" → Select Web platform → Register app

### Step 2: Enable Required APIs

1. In Firebase Console, go to **Authentication**
2. Click **Get started** (if not already enabled)
3. Go to **Sign-in method** tab
4. Enable these providers:
   - ✅ **Email/Password** - Click, toggle "Enable", Save
   - ✅ **Google** - Click, toggle "Enable", Save

### Step 3: Create Firestore Database

1. In Firebase Console, go to **Firestore Database**
2. Click **Create database**
3. Choose **Start in production mode** (we have secure rules configured)
4. Select your preferred location (closest to your users)
5. Click **Enable**

### Step 4: Deploy Firestore Rules

After creating the database, you need to deploy the security rules:

```bash
# Install Firebase CLI (if not installed)
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase in this project
firebase init

# Select:
# - Firestore (rules and indexes)
# - Hosting
# 
# Use existing files when prompted

# Deploy rules
firebase deploy --only firestore:rules,firestore:indexes
```

### Step 5: Verify API Key Restrictions

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your Firebase project
3. Go to **APIs & Services** → **Credentials**
4. Find your **Browser key** (should match your Firebase API key)
5. Click on it to edit
6. Under **Application restrictions**:
   - Either set to "None" (for testing)
   - Or add your Replit domain to "HTTP referrers"
7. Under **API restrictions**:
   - Make sure these APIs are enabled:
     - Identity Toolkit API
     - Cloud Firestore API
     - Firebase Authentication API

### Step 6: Add Authorized Domains

1. In Firebase Console → **Authentication** → **Settings** tab
2. Scroll to **Authorized domains**
3. Add your Replit domain (e.g., `your-repl.replit.dev`)

### Step 7: Verify Configuration Values

Double-check that all these secrets are correctly set in Replit:

- `VITE_FIREBASE_API_KEY` - Should be 39 characters, starts with "AIza"
- `VITE_FIREBASE_AUTH_DOMAIN` - Should end with `.firebaseapp.com`
- `VITE_FIREBASE_PROJECT_ID` - Your project ID
- `VITE_FIREBASE_STORAGE_BUCKET` - Should end with `.appspot.com`
- `VITE_FIREBASE_MESSAGING_SENDER_ID` - Numeric string
- `VITE_FIREBASE_APP_ID` - Should start with "1:"

### Step 8: Restart the Application

After making changes, restart the workflow to pick up any changes.

## Testing Authentication

Once configured, you should be able to:

1. **Sign Up**: Create a new account with email/password
2. **Sign In**: Log in with existing credentials
3. **Google Sign-In**: Authenticate with Google account
4. **Chat Persistence**: Your chats will be saved to Firestore
5. **Sign Out**: Log out and your session ends

## Common Issues

### Issue: "invalid-api-key"
**Solution**: Follow Steps 5 & 6 above to check API key restrictions and authorized domains

### Issue: "auth/operation-not-allowed"
**Solution**: Make sure Email/Password and Google providers are enabled (Step 2)

### Issue: "permission-denied" when saving chats
**Solution**: Deploy Firestore rules (Step 4) or temporarily set rules to test mode

### Issue: Google Sign-In popup blocked
**Solution**: Allow popups for your Replit domain in browser settings

## Firestore Rules (Already Configured)

The following security rules are already set up in `firestore.rules`:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /chats/{chatId} {
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
      allow read, update, delete: if request.auth != null && resource != null && request.auth.uid == resource.data.userId;
    }
  }
}
```

This ensures:
- Users can only create chats for themselves
- Users can only read/update/delete their own chats
- Unauthenticated users cannot access any chats

## Next Steps

After completing the setup:
1. Restart the application
2. Try signing up with email/password
3. Verify you can access the chat interface
4. Test that chats are persisted (refresh page, they should remain)

Need help? Check the Firebase Console logs for detailed error messages.
