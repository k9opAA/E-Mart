import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { orderAPI } from '../../utils/api';
import './checkout.css';

const Checkout = () => {
    const navigate = useNavigate();
    const { cartItems, getCartTotal, getCartCount, clearCart } = useCart();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        address: '',
        town: '',
        phoneNumber: ''
    });

    // Auto-fill form if user is logged in
    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
            const savedUserData = localStorage.getItem('userData');
            let userData = null;
            
            if (savedUserData) {
                userData = JSON.parse(savedUserData);
            }

            setFormData(prev => ({
                ...prev,
                fullName: userData?.name || user.displayName || '',
                email: user.email || ''
            }));
        }
    }, []);

    // Redirect if cart is empty
    useEffect(() => {
        if (cartItems.length === 0) {
            toast.warning('Your cart is empty!', {
                position: 'top-center'
            });
            navigate('/');
        }
    }, [cartItems, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = () => {
        if (!formData.fullName.trim()) {
            toast.error('Please enter your full name', { position: 'top-center' });
            return false;
        }
        if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
            toast.error('Please enter a valid email', { position: 'top-center' });
            return false;
        }
        if (!formData.address.trim()) {
            toast.error('Please enter your address', { position: 'top-center' });
            return false;
        }
        if (!formData.town.trim()) {
            toast.error('Please enter your town/city', { position: 'top-center' });
            return false;
        }
        if (!formData.phoneNumber.trim()) {
            toast.error('Please enter your phone number', { position: 'top-center' });
            return false;
        }
        return true;
    };

    const handlePlaceOrder = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            // Prepare order data according to the backend schema
            const orderData = {
                name: formData.fullName,
                email: formData.email,
                address: formData.address,
                town: formData.town,
                phone: formData.phoneNumber,
                products: cartItems.map(item => ({
                    productId: item._id || item.id,
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price
                })),
                totalAmount: getCartTotal() * 1.1, // Including 10% tax
                orderStatus: 'pending'
            };

            // Send order to backend API using the API utility
            const result = await orderAPI.create(orderData);

            if (!result.success) {
                throw new Error(result.error || 'Failed to place order');
            }

            console.log('Order placed successfully:', result.data);

            // Clear cart and redirect
            clearCart();
            
            toast.success('Order placed successfully!', {
                position: 'top-center',
                autoClose: 3000
            });

            // Redirect to success page or home
            navigate('/');
            
        } catch (error) {
            console.error('Error placing order:', error);
            toast.error(error.message || 'Failed to place order. Please try again.', {
                position: 'top-center'
            });
        } finally {
            setLoading(false);
        }
    };

    if (cartItems.length === 0) {
        return null;
    }

    return (
        <div className="container py-8">
            <div className="checkout-container">
                <h1 className="checkout-title">Checkout</h1>

                <div className="checkout-content">
                    {/* Billing Form */}
                    <div className="billing-section">
                        <h2>Billing Information</h2>
                        <form onSubmit={handlePlaceOrder} className="billing-form">
                            <div className="form-group">
                                <label htmlFor="fullName">
                                    Full Name <span className="required">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    placeholder="Enter your full name"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">
                                    Email Address <span className="required">*</span>
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="address">
                                    Address <span className="required">*</span>
                                </label>
                                <textarea
                                    id="address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    placeholder="Enter your complete address"
                                    rows="3"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="town">
                                    Town/City <span className="required">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="town"
                                    name="town"
                                    value={formData.town}
                                    onChange={handleChange}
                                    placeholder="Enter your town or city"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="phoneNumber">
                                    Phone Number <span className="required">*</span>
                                </label>
                                <input
                                    type="tel"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    placeholder="Enter your phone number"
                                    required
                                />
                            </div>
                        </form>
                    </div>

                    {/* Order Summary */}
                    <div className="order-summary-section">
                        <div className="order-summary-card">
                            <h2>Order Summary</h2>

                            <div className="order-items">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="order-item">
                                        <div className="order-item-image">
                                            <img src={item.images[0]} alt={item.name} />
                                        </div>
                                        <div className="order-item-details">
                                            <h4>{item.name}</h4>
                                            <p>Qty: {item.quantity}</p>
                                        </div>
                                        <div className="order-item-price">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="order-totals">
                                <div className="total-row">
                                    <span>Subtotal ({getCartCount()} items)</span>
                                    <span>${getCartTotal().toFixed(2)}</span>
                                </div>
                                <div className="total-row">
                                    <span>Shipping</span>
                                    <span className="free">FREE</span>
                                </div>
                                <div className="total-row">
                                    <span>Tax (10%)</span>
                                    <span>${(getCartTotal() * 0.1).toFixed(2)}</span>
                                </div>
                                <div className="total-divider"></div>
                                <div className="total-row total-final">
                                    <span>Total</span>
                                    <span>${(getCartTotal() * 1.1).toFixed(2)}</span>
                                </div>
                            </div>

                            <button
                                type="button"
                                className="btn-place-order"
                                onClick={handlePlaceOrder}
                                disabled={loading}
                            >
                                {loading ? 'Placing Order...' : 'Place Order'}
                            </button>

                            <button
                                type="button"
                                className="btn-back-to-cart"
                                onClick={() => navigate('/cart')}
                                disabled={loading}
                            >
                                Back to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
