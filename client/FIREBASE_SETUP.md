# Firebase Authentication Setup Guide

## 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add Project"
3. Enter project name (e.g., "E-mart")
4. Click "Continue" and follow the setup wizard
5. Click "Create Project"

## 2. Register Your Web App

1. In your Firebase project, click the **Web icon** (</>)
2. Register app with a nickname (e.g., "E-mart Web")
3. Copy the Firebase configuration object
4. Paste it in `src/firebase/config.js` replacing the placeholder values

## 3. Enable Authentication Methods

### Email/Password Authentication
1. Go to **Authentication** > **Sign-in method**
2. Click on **Email/Password**
3. Enable the first toggle (Email/Password)
4. Click **Save**

### Google Authentication
1. In **Sign-in method**, click on **Google**
2. Enable the toggle
3. Select a support email
4. Click **Save**

### GitHub Authentication
1. First, create a GitHub OAuth App:
   - Go to GitHub Settings > Developer settings > OAuth Apps
   - Click "New OAuth App"
   - Fill in:
     - Application name: E-mart
     - Homepage URL: http://localhost:5173 (for development)
     - Authorization callback URL: (Copy from Firebase)
   - Click "Register application"
   - Copy the **Client ID** and generate **Client Secret**

2. In Firebase:
   - Go to **Authentication** > **Sign-in method**
   - Click on **GitHub**
   - Enable the toggle
   - Paste your GitHub **Client ID** and **Client Secret**
   - Copy the **Authorization callback URL** from Firebase
   - Go back to GitHub OAuth App settings and paste this URL
   - Click **Save** in Firebase

## 4. Update Firebase Configuration

Open `src/firebase/config.js` and replace the placeholder values:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
};
```

## 5. Test Authentication

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Click the user icon in the header
3. Try each authentication method:
   - Sign Up with Email/Password
   - Sign In with Google
   - Sign In with GitHub

## Security Rules (Optional)

For production, set up Firestore security rules:

1. Go to **Firestore Database** > **Rules**
2. Add appropriate security rules based on your needs

## Troubleshooting

### Common Issues:

1. **"Auth domain is not authorized"**
   - Go to Firebase Console > Authentication > Settings > Authorized domains
   - Add your domain (localhost is included by default)

2. **"This app domain is not authorized for OAuth operations"**
   - Add your domain to authorized domains in Firebase

3. **GitHub OAuth not working**
   - Verify the callback URL matches exactly
   - Check that Client ID and Secret are correct
   - Ensure the GitHub OAuth app is not suspended

## Features Implemented

✅ Email/Password Registration
✅ Email/Password Login
✅ Google Sign In
✅ GitHub Sign In
✅ Error Handling
✅ Loading States
✅ Form Validation
✅ User Profile Display
✅ Logout Functionality

## Next Steps

- Add password reset functionality
- Implement email verification
- Add user profile editing
- Store user data in Firestore
- Add protected routes
