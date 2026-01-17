import { useState } from 'react';
import { IoClose } from "react-icons/io5";
import Login from './Login';
import Registration from './Registration';

const AuthModal = ({ isOpen, onClose, onLoginSuccess }) => {
    const [isSignUp, setIsSignUp] = useState(false);

    const handleLoginSuccess = (userData) => {
        onLoginSuccess(userData);
        onClose();
    };

    const switchToSignUp = () => {
        setIsSignUp(true);
    };

    const switchToSignIn = () => {
        setIsSignUp(false);
    };

    if (!isOpen) return null;

    return (
        <div className="authModalOverlay" onClick={onClose}>
            <div className="authModalContent" onClick={(e) => e.stopPropagation()}>
                <button className="closeModalBtn" onClick={onClose}>
                    <IoClose />
                </button>

                {isSignUp ? (
                    <Registration 
                        onLoginSuccess={handleLoginSuccess}
                        onSwitchToSignIn={switchToSignIn}
                    />
                ) : (
                    <Login 
                        onLoginSuccess={handleLoginSuccess}
                        onSwitchToSignUp={switchToSignUp}
                    />
                )}
            </div>
        </div>
    );
};

export default AuthModal;
