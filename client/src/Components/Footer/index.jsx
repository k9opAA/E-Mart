import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import './footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3 className="footer-title">E-mart</h3>
                        <p className="footer-description">
                            Your trusted online shopping destination for quality products at great prices.
                        </p>
                        <div className="social-icons">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                                <FaFacebookF />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                                <FaTwitter />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                                <FaInstagram />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                                <FaLinkedinIn />
                            </a>
                            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                                <FaYoutube />
                            </a>
                        </div>
                    </div>

                    <div className="footer-section">
                        <h4 className="footer-heading">Quick Links</h4>
                        <ul className="footer-links">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/about">About Us</Link></li>
                            <li><Link to="/products">Products</Link></li>
                            <li><Link to="/contact">Contact Us</Link></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4 className="footer-heading">Customer Service</h4>
                        <ul className="footer-links">
                            <li><Link to="/profile">My Account</Link></li>
                            <li><Link to="/dashboard">Order History</Link></li>
                            <li><Link to="/cart">Shopping Cart</Link></li>
                            <li><Link to="/contact">Help & Support</Link></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4 className="footer-heading">Contact Info</h4>
                        <ul className="footer-info">
                            <li>
                                <strong>Email:</strong><br />
                                contactzabirabdullah@gmail.com<br />
                                ali.azgor.0810@gmail.com
                            </li>
                            <li>
                                <strong>Support:</strong><br />
                                Available 24/7
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p className="copyright">
                        © {currentYear} E-mart. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
