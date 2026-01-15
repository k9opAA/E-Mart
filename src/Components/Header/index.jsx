import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/e-mart logo.png';

const Header=()=>{
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleAuthClick = () => {
        setIsLoggedIn(!isLoggedIn);
    };

    return(
        <div className="HeaderWrapper">
            <div className="top-stripe bg-purple">
                <div className="container">
                    <p className="mb-0 p-0 text-center">Welcome to <b>E-mart!</b> Your one-stop shop for all your needs.
                    </p>
                </div>
            </div>
            
            <nav className="navbar">
                <div className="container navbar-container">
                    <Link to="/" className="navbar-logo">
                        <img src={logo} alt="E-mart Logo" className="logo-image" />
                        <span className="logo-text">E-mart</span>
                    </Link>

                    <button className="hamburger" onClick={toggleMenu} aria-label="Toggle menu">
                        <span className={isMenuOpen ? 'hamburger-line open' : 'hamburger-line'}></span>
                        <span className={isMenuOpen ? 'hamburger-line open' : 'hamburger-line'}></span>
                        <span className={isMenuOpen ? 'hamburger-line open' : 'hamburger-line'}></span>
                    </button>

                    <div className={isMenuOpen ? 'navbar-menu active' : 'navbar-menu'}>
                        <ul className="navbar-links">
                            <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
                            <li><Link to="/products" onClick={() => setIsMenuOpen(false)}>Products/Services</Link></li>
                            <li><Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link></li>
                            <li><Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link></li>
                            <li><Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>Dashboard</Link></li>
                        </ul>
                        <div className="navbar-auth">
                            <button 
                                className={isLoggedIn ? 'btn-logout' : 'btn-login'} 
                                onClick={handleAuthClick}
                            >
                                {isLoggedIn ? 'Logout' : 'Login'}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}
export default Header;