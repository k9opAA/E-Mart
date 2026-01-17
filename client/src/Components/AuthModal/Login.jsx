import { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { BsGithub } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { 
    signInWithEmailAndPassword, 
    signInWithPopup, 
    sendSignInLinkToEmail,
    GoogleAuthProvider
} from 'firebase/auth';
import { auth } from '../../firebase';
import { db } from '../../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

const Login = ({ onLoginSuccess, onSwitchToSignUp }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [useEmailLink, setUseEmailLink] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    // Handle Email/Password Sign In
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (!auth) {
            setError('Firebase is not configured. Please set up Firebase credentials.');
            toast.error('Firebase is not configured properly');
            setLoading(false);
            return;
        }

        try {
            const userCredential = await signInWithEmailAndPassword(
                auth, 
                formData.email, 
                formData.password
            );

            console.log("User logged in Successfully");
            toast.success("User logged in Successfully", {
                position: "top-center",
            });

            // Fetch user data from Firestore
            const userDoc = await getDoc(doc(db, "Users", userCredential.user.uid));
            const userData = userDoc.exists() ? userDoc.data() : {};

            // Reset loading before calling callback
            setLoading(false);
            
            if (onLoginSuccess) {
                onLoginSuccess({
                    name: userData.firstName || userCredential.user.displayName || 'User',
                    email: userCredential.user.email,
                    balance: '$3.29',
                    uid: userCredential.user.uid,
                    photoURL: userData.photo || userCredential.user.photoURL,
                    firstName: userData.firstName || '',
                    lastName: userData.lastName || ''
                });
            }

        } catch (err) {
            console.error('Login error:', err);
            
            let errorMessage = '';
            switch (err.code) {
                case 'auth/user-not-found':
                    errorMessage = 'No account found with this email';
                    break;
                case 'auth/wrong-password':
                    errorMessage = 'Incorrect password';
                    break;
                case 'auth/invalid-email':
                    errorMessage = 'Invalid email address';
                    break;
                case 'auth/user-disabled':
                    errorMessage = 'This account has been disabled';
                    break;
                default:
                    errorMessage = err.message || 'Login failed. Please try again.';
            }
            setError(errorMessage);
            toast.error(errorMessage, {
                position: "bottom-center",
            });
            setLoading(false);
        }
    };

    // Handle Email Link Sign In
    const handleEmailLinkSignIn = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        if (!auth) {
            setError('Firebase is not configured. Please set up Firebase credentials.');
            setLoading(false);
            return;
        }

        try {
            const actionCodeSettings = {
                // URL you want to redirect back to. The domain (www.example.com) for this
                // URL must be in the authorized domains list in the Firebase Console.
                url: window.location.origin + '/verify-email',
                // This must be true.
                handleCodeInApp: true,
            };

            await sendSignInLinkToEmail(auth, formData.email, actionCodeSettings);
            
            // Save the email locally so you don't need to ask the user for it again
            window.localStorage.setItem('emailForSignIn', formData.email);
            
            setSuccess('Check your email! We sent you a sign-in link.');
            setFormData({ email: '', password: '' });
            setLoading(false);

        } catch (err) {
            console.error('Email link sign in error:', err);
            
            switch (err.code) {
                case 'auth/invalid-email':
                    setError('Invalid email address');
                    break;
                case 'auth/missing-email':
                    setError('Please enter your email address');
                    break;
                default:
                    setError('Failed to send email link. Please try again.');
            }
            setLoading(false);
        }
    };

    // Handle Google Sign In
    const handleGoogleSignIn = async () => {
        setError('');
        setLoading(true);

        if (!auth) {
            setError('Firebase is not configured. Please set up Firebase credentials.');
            toast.error('Firebase is not configured properly');
            setLoading(false);
            return;
        }

        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            console.log(result);
            const user = result.user;
            
            if (result.user) {
                // Store/update user data in Firestore
                await setDoc(doc(db, "Users", user.uid), {
                    email: user.email,
                    firstName: user.displayName,
                    photo: user.photoURL,
                    lastName: "",
                });
                
                toast.success("User logged in Successfully", {
                    position: "top-center",
                });
            }
            
            // Reset loading before calling callback
            setLoading(false);
            
            if (onLoginSuccess) {
                onLoginSuccess({
                    name: result.user.displayName || 'User',
                    email: result.user.email,
                    balance: '$3.29',
                    uid: result.user.uid,
                    photoURL: result.user.photoURL
                });
            }

        } catch (err) {
            console.error('Google sign in error:', err);
            setError('Google sign in failed. Please try again.');
            toast.error(err.message, {
                position: "bottom-center",
            });
            setLoading(false);
        }
    };

    // Handle GitHub Sign In
    const handleGithubSignIn = async () => {
        setError('');
        setLoading(true);

        if (!auth) {
            setError('Firebase is not configured. Please set up Firebase credentials.');
            setLoading(false);
            return;
        }

        try {
            // GitHub provider is optional - you can implement this if needed
            setError('GitHub sign-in is not configured yet.');
            setLoading(false);
        } catch (err) {
            console.error('GitHub sign in error:', err);
            
            if (err.code === 'auth/account-exists-with-different-credential') {
                setError('An account already exists with this email using a different sign-in method.');
            } else {
                setError('GitHub sign in failed. Please try again.');
            }
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError('');
        setSuccess('');
    };

    return (
        <>
            <div className="authModalHeader">
                <h2>Sign In</h2>
                <p>Welcome back! Please sign in to continue.</p>
            </div>

            {error && (
                <div className="authError">
                    {error}
                </div>
            )}

            {success && (
                <div className="authSuccess">
                    {success}
                </div>
            )}

            <form className="authForm" onSubmit={useEmailLink ? handleEmailLinkSignIn : handleSubmit}>
                <div className="formGroup">
                    <label>Email Address</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled={loading}
                    />
                </div>

                {!useEmailLink && (
                    <>
                        <div className="formGroup">
                            <label>Password</label>
                            <div className="passwordInput">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    disabled={loading}
                                    minLength="6"
                                />
                                <button
                                    type="button"
                                    className="togglePassword"
                                    onClick={() => setShowPassword(!showPassword)}
                                    disabled={loading}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>

                        <div className="forgotPassword">
                            <a href="#forgot">Forgot password?</a>
                        </div>
                    </>
                )}

                <button type="submit" className="submitBtn" disabled={loading}>
                    {loading ? 'Please wait...' : (useEmailLink ? 'Send Sign-In Link' : 'Sign In')}
                </button>

                <div className="switchAuthMethod">
                    <button 
                        type="button" 
                        onClick={() => {
                            setUseEmailLink(!useEmailLink);
                            setError('');
                            setSuccess('');
                        }}
                        disabled={loading}
                    >
                        {useEmailLink ? 'Sign in with password instead' : 'Sign in with email link (no password)'}
                    </button>
                </div>
            </form>

            <div className="divider">
                <span>or continue with</span>
            </div>

            <div className="socialButtons">
                <button 
                    className="socialBtn googleBtn" 
                    onClick={handleGoogleSignIn}
                    disabled={loading}
                    type="button"
                >
                    <FcGoogle /> Google
                </button>
                <button 
                    className="socialBtn githubBtn" 
                    onClick={handleGithubSignIn}
                    disabled={loading}
                    type="button"
                >
                    <BsGithub /> GitHub
                </button>
            </div>

            <div className="switchMode">
                <p>Don't have an account? <button onClick={onSwitchToSignUp} type="button">Sign Up</button></p>
            </div>
        </>
    );
};

export default Login;
