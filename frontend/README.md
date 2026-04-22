## ⚙️ Environment Variables

Copy `.env.example` to `.env` and fill in the values:

```env
# Backend API base URL (proxied via Vite)
VITE_API_BASE_URL=http://localhost:5000

# Firebase project credentials (for Google OAuth)
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

> **Tip:** Get Firebase credentials from the [Firebase Console](https://console.firebase.google.com/).
> Enable **Google Sign-In** under *Authentication → Sign-in method*.

---