import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import './cart.css';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal, getCartCount } = useCart();
    const navigate = useNavigate();

    const handleRemoveItem = (item) => {
        removeFromCart(item.id);
        toast.info(`${item.name} removed from cart`, {
            position: 'bottom-right',
            autoClose: 2000
        });
    };

    const handleQuantityChange = (item, newQuantity) => {
        if (newQuantity > 0) {
            updateQuantity(item.id, newQuantity);
        }
    };

    const handleCheckout = () => {
        if (cartItems.length === 0) {
            toast.warning('Your cart is empty!', {
                position: 'top-center'
            });
            return;
        }
        navigate('/checkout');
    };

    const handleClearCart = () => {
        if (window.confirm('Are you sure you want to clear your cart?')) {
            clearCart();
            toast.info('Cart cleared', {
                position: 'bottom-right'
            });
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="container py-8">
                <div className="empty-cart">
                    <div className="empty-cart-icon">🛒</div>
                    <h2>Your Cart is Empty</h2>
                    <p>Looks like you haven't added anything to your cart yet.</p>
                    <button className="btn-continue-shopping" onClick={() => navigate('/')}>
                        Continue Shopping
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container py-8">
            <div className="cart-container">
                <div className="cart-header">
                    <h1>Shopping Cart</h1>
                    <button className="btn-clear-cart" onClick={handleClearCart}>
                        <FaTrash /> Clear Cart
                    </button>
                </div>

                <div className="cart-content">
                    <div className="cart-items">
                        {cartItems.map((item) => (
                            <div key={item.id} className="cart-item">
                                <div className="cart-item-image">
                                    <img src={item.images[0]} alt={item.name} />
                                </div>
                                
                                <div className="cart-item-details">
                                    <h3>{item.name}</h3>
                                    <p className="item-price">${item.price.toFixed(2)} each</p>
                                    <span className={`stock-status ${item.InStock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                                        {item.InStock > 0 ? 'In Stock' : 'Out of Stock'}
                                    </span>
                                </div>

                                <div className="cart-item-quantity">
                                    <button 
                                        className="qty-btn"
                                        onClick={() => handleQuantityChange(item, item.quantity - 1)}
                                    >
                                        <FaMinus />
                                    </button>
                                    <input 
                                        type="number" 
                                        value={item.quantity} 
                                        onChange={(e) => handleQuantityChange(item, parseInt(e.target.value) || 1)}
                                        min="1"
                                    />
                                    <button 
                                        className="qty-btn"
                                        onClick={() => handleQuantityChange(item, item.quantity + 1)}
                                    >
                                        <FaPlus />
                                    </button>
                                </div>

                                <div className="cart-item-total">
                                    <p className="item-total-price">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </p>
                                </div>

                                <button 
                                    className="btn-remove-item"
                                    onClick={() => handleRemoveItem(item)}
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="cart-summary">
                        <h2>Order Summary</h2>
                        
                        <div className="summary-row">
                            <span>Items ({getCartCount()})</span>
                            <span>${getCartTotal().toFixed(2)}</span>
                        </div>

                        <div className="summary-row">
                            <span>Shipping</span>
                            <span className="free">FREE</span>
                        </div>

                        <div className="summary-row">
                            <span>Tax (Estimated)</span>
                            <span>${(getCartTotal() * 0.1).toFixed(2)}</span>
                        </div>

                        <div className="summary-divider"></div>

                        <div className="summary-row summary-total">
                            <span>Total</span>
                            <span>${(getCartTotal() * 1.1).toFixed(2)}</span>
                        </div>

                        <button className="btn-checkout" onClick={handleCheckout}>
                            Proceed to Checkout
                        </button>

                        <button className="btn-continue-shopping-secondary" onClick={() => navigate('/')}>
                            Continue Shopping
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
