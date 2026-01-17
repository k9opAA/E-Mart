import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';
import { auth } from '../../firebase/config';

const VerifyEmail = () => {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const verifyEmailLink = async () => {
            if (!auth) {
                setError('Firebase is not configured.');
                setLoading(false);
                return;
            }

            // Confirm the link is a sign-in with email link.
            if (isSignInWithEmailLink(auth, window.location.href)) {
                // Get the email if available. This should be available if the user completes
                // the flow on the same device where they started it.
                let email = window.localStorage.getItem('emailForSignIn');
                
                if (!email) {
                    // User opened the link on a different device. To prevent session fixation
                    // attacks, ask the user to provide the associated email again.
                    email = window.prompt('Please provide your email for confirmation');
                }

                if (!email) {
                    setError('Email is required to complete sign-in.');
                    setLoading(false);
                    return;
                }

                try {
                    // Sign in the user with the email link
                    await signInWithEmailLink(auth, email, window.location.href);
                    
                    // Clear the email from storage
                    window.localStorage.removeItem('emailForSignIn');
                    
                    // Redirect to home page
                    navigate('/');
                    
                } catch (err) {
                    console.error('Email link verification error:', err);
                    setError('Invalid or expired link. Please request a new sign-in link.');
                    setLoading(false);
                }
            } else {
                setError('Invalid sign-in link.');
                setLoading(false);
            }
        };

        verifyEmailLink();
    }, [navigate]);

    return (
        <div style={{ 
            minHeight: '100vh', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            padding: '20px'
        }}>
            <div style={{ 
                maxWidth: '500px', 
                width: '100%', 
                textAlign: 'center',
                background: 'white',
                padding: '40px',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}>
                {loading ? (
                    <>
                        <div style={{ 
                            fontSize: '48px', 
                            marginBottom: '20px',
                            animation: 'spin 1s linear infinite'
                        }}>
                            ⌛
                        </div>
                        <h2>Verifying your email...</h2>
                        <p style={{ color: 'rgba(0,0,0,0.6)' }}>Please wait while we verify your email link.</p>
                    </>
                ) : error ? (
                    <>
                        <div style={{ fontSize: '48px', marginBottom: '20px' }}>❌</div>
                        <h2 style={{ color: '#c62828' }}>Verification Failed</h2>
                        <p style={{ color: 'rgba(0,0,0,0.7)', marginBottom: '20px' }}>{error}</p>
                        <button 
                            onClick={() => navigate('/')}
                            style={{
                                padding: '12px 24px',
                                background: '#2bbef9',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                fontSize: '16px',
                                fontWeight: '600',
                                cursor: 'pointer'
                            }}
                        >
                            Go to Home
                        </button>
                    </>
                ) : (
                    <>
                        <div style={{ fontSize: '48px', marginBottom: '20px' }}>✅</div>
                        <h2 style={{ color: '#065f46' }}>Email Verified!</h2>
                        <p style={{ color: 'rgba(0,0,0,0.6)' }}>Redirecting you to the home page...</p>
                    </>
                )}
            </div>
        </div>
    );
};

export default VerifyEmail;
