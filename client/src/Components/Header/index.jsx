import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/image/e-mart logo.png';
import Button from '@mui/material/Button';
import CountryDropdown from '../CountryDropdown';
import { LuUser } from "react-icons/lu";
import { BsHandbag } from "react-icons/bs";
import { IoChevronDown } from "react-icons/io5";
import SearchBox from './SearchBox';
import Navigation from './Navigation';
import AuthModal from '../AuthModal';
import { auth } from '../../firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { toast } from 'react-toastify';
import { useCart } from '../../context/CartContext';

const Header=()=>{
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const { getCartCount, getCartTotal } = useCart();

    // Check if user is already logged in on component mount
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in
                const savedUserData = localStorage.getItem('userData');
                if (savedUserData) {
                    setUserData(JSON.parse(savedUserData));
                } else {
                    setUserData({
                        name: user.displayName || user.email.split('@')[0],
                        email: user.email,
                        uid: user.uid,
                        photoURL: user.photoURL,
                        balance: '$3.29'
                    });
                }
                setIsLoggedIn(true);
            } else {
                // User is signed out
                setIsLoggedIn(false);
                setUserData(null);
                localStorage.removeItem('userData');
            }
        });

        return () => unsubscribe();
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLoginSuccess = (user) => {
        setUserData(user);
        setIsLoggedIn(true);
        setIsModalOpen(false);
        // Save user data to localStorage
        localStorage.setItem('userData', JSON.stringify(user));
        // Navigate to home page
        navigate('/');
        toast.success('Welcome back!', {
            position: 'top-center',
            autoClose: 2000
        });
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            setIsLoggedIn(false);
            setUserData(null);
            setShowDropdown(false);
            localStorage.removeItem('userData');
            navigate('/');
            toast.success('Logged out successfully', {
                position: 'top-center',
                autoClose: 2000
            });
        } catch (error) {
            console.error('Logout error:', error);
            toast.error('Failed to logout', {
                position: 'bottom-center'
            });
        }
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    return(
        <div className="HeaderWrapper">
            <div className="top-stripe bg-purple">
                <div className="container">
                    <p className="mb-0 p-0 text-center">Welcome to <b>E-mart!</b> Your one-stop shop for all your needs.
                    </p>
                </div>
            </div>
            
            <header className='header'>
                <div className='container'>
                    <div className='row align-items-center'>
                        <div className='logoWrapper d-flex align-items-center col-sm-2'>
                            <Link to={'/'}>
                                <img src={logo} alt="E-mart Logo" />
                            </Link>
                        </div>

                        <div className='col-sm-10 d-flex align-items-center part2'>
                            <CountryDropdown/>
                            <SearchBox/>

                            <div className='part3 d-flex align-items-center'>
                                {!isLoggedIn ? (
                                    <button className='circle' onClick={() => setIsModalOpen(true)}>
                                        <LuUser/>
                                    </button>
                                ) : (
                                    <div className='userProfile' ref={dropdownRef}>
                                        <button className='userProfileBtn' onClick={toggleDropdown}>
                                            {userData?.photoURL ? (
                                                <img 
                                                    src={userData.photoURL} 
                                                    alt={userData.name}
                                                    className='userAvatarImg'
                                                />
                                            ) : (
                                                <div className='userAvatar'>
                                                    {userData?.name?.charAt(0).toUpperCase()}
                                                </div>
                                            )}
                                            <div className='userInfo'>
                                                <span className='userName'>{userData?.name}</span>
                                            </div>
                                            <IoChevronDown className={showDropdown ? 'rotate' : ''} />
                                        </button>
                                        {showDropdown && (
                                            <div className='userDropdown'>
                                                <Link to="/profile" onClick={() => setShowDropdown(false)}>
                                                    <LuUser /> Profile
                                                </Link>
                                                <Link to="/dashboard" onClick={() => setShowDropdown(false)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                                        <path d="M8 4a.5.5 0 0 1 .5.5V6a.5.5 0 0 1-1 0V4.5A.5.5 0 0 1 8 4zM3.732 5.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707zM2 10a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 10zm9.5 0a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5zm.754-4.246a.389.389 0 0 0-.527-.02L7.547 9.31a.91.91 0 1 0 1.302 1.258l3.434-4.297a.389.389 0 0 0-.029-.518z"/>
                                                        <path fillRule="evenodd" d="M0 10a8 8 0 1 1 15.547 2.661c-.442 1.253-1.845 1.602-2.932 1.25C11.309 13.488 9.475 13 8 13c-1.474 0-3.31.488-4.615.911-1.087.352-2.49.003-2.932-1.25A7.988 7.988 0 0 1 0 10zm8-7a7 7 0 0 0-6.603 9.329c.203.575.923.876 1.68.63C4.397 12.533 6.358 12 8 12s3.604.532 4.923.96c.757.245 1.477-.056 1.68-.631A7 7 0 0 0 8 3z"/>
                                                    </svg>
                                                    Dashboard
                                                </Link>
                                                <button onClick={handleLogout}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                                        <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
                                                        <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                                                    </svg>
                                                    Logout
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )}
                                
                                <div className='cartTab d-flex align-items-center'>
                                    <span className='price'>${getCartTotal().toFixed(2)}</span>
                                    <div className='position-relative' onClick={() => navigate('/cart')} style={{ cursor: 'pointer' }}>
                                        <button className='circle cartBtn'>
                                            <BsHandbag/>
                                        </button>
                                        <span className='count d-flex align-items-center justify-content-center'>
                                            {getCartCount()}
                                        </span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </header>

            <Navigation/>
            
            <AuthModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)}
                onLoginSuccess={handleLoginSuccess}
            />
        </div>
    )
}
export default Header;