// API configuration to handle different environments

export function getApiUrl(): string {
  // Check if we're running on Firebase hosting
  const isFirebaseHosting = 
    typeof window !== 'undefined' && 
    (window.location.hostname === 'qubits-polaris.web.app' || 
     window.location.hostname === 'qubits-polaris.firebaseapp.com');

  // If on Firebase, use the Replit backend URL
  if (isFirebaseHosting) {
    // Use the Replit deployment URL
    return 'https://workspace-masterrgamer393.replit.app';
  }

  // Otherwise, use relative URLs (for local development/Replit preview)
  return '';
}

export const API_BASE_URL = getApiUrl();
