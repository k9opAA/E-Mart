import { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { BsGithub } from "react-icons/bs";
import { 
    createUserWithEmailAndPassword, 
    signInWithPopup,
    updateProfile,
    GoogleAuthProvider
} from 'firebase/auth';
import { auth, db } from '../../firebase';
import { setDoc, doc } from 'firebase/firestore';
import { toast } from 'react-toastify';

const Registration = ({ onLoginSuccess, onSwitchToSignIn }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    // Handle Email/Password Registration
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
            // Validate passwords match
            if (formData.password !== formData.confirmPassword) {
                setError('Passwords do not match');
                toast.error('Passwords do not match');
                setLoading(false);
                return;
            }

            // Create new user
            const userCredential = await createUserWithEmailAndPassword(
                auth, 
                formData.email, 
                formData.password
            );

            const user = userCredential.user;
            console.log(user);

            // Update user profile with name
            if (user) {
                await updateProfile(user, {
                    displayName: formData.name
                });

                // Store user data in Firestore
                await setDoc(doc(db, "Users", user.uid), {
                    email: user.email,
                    firstName: formData.name.split(' ')[0] || formData.name,
                    lastName: formData.name.split(' ')[1] || '',
                    photo: ""
                });
            }

            console.log("User Registered Successfully!!");
            toast.success("User Registered Successfully!!", {
                position: "top-center",
            });

            // Reset loading before calling callback
            setLoading(false);
            
            if (onLoginSuccess) {
                onLoginSuccess({
                    name: formData.name,
                    email: userCredential.user.email,
                    balance: '$0.00',
                    uid: userCredential.user.uid
                });
            }

        } catch (err) {
            console.error('Registration error:', err);
            
            let errorMessage = '';
            switch (err.code) {
                case 'auth/email-already-in-use':
                    errorMessage = 'This email is already registered';
                    break;
                case 'auth/invalid-email':
                    errorMessage = 'Invalid email address';
                    break;
                case 'auth/weak-password':
                    errorMessage = 'Password should be at least 6 characters';
                    break;
                case 'auth/operation-not-allowed':
                    errorMessage = 'Email/password accounts are not enabled';
                    break;
                default:
                    errorMessage = 'Registration failed. Please try again.';
            }
            setError(errorMessage);
            toast.error(errorMessage, {
                position: "bottom-center",
            });
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
                // Store user data in Firestore
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
                    balance: '$0.00',
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
    };

    return (
        <>
            <div className="authModalHeader">
                <h2>Create Account</h2>
                <p>Join us today and start shopping!</p>
            </div>

            {error && (
                <div className="authError">
                    {error}
                </div>
            )}

            <form className="authForm" onSubmit={handleSubmit}>
                <div className="formGroup">
                    <label>Full Name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        disabled={loading}
                    />
                </div>

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

                <div className="formGroup">
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        disabled={loading}
                        minLength="6"
                    />
                </div>

                <button type="submit" className="submitBtn" disabled={loading}>
                    {loading ? 'Please wait...' : 'Sign Up'}
                </button>
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
                <p>Already have an account? <button onClick={onSwitchToSignIn} type="button">Sign In</button></p>
            </div>
        </>
    );
};

export default Registration;
