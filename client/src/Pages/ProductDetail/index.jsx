import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import { BsHandbag } from 'react-icons/bs';
import { FiHeart } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { toast } from 'react-toastify';
import './productDetail.css';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const response = await fetch(`http://localhost:4000/api/products/${id}`);
                
                if (!response.ok) {
                    throw new Error('Product not found');
                }
                
                const data = await response.json();
                setProduct(data);
            } catch (err) {
                console.error('Error fetching product:', err);
                setError(err.message);
                toast.error('Failed to load product details', {
                    position: 'top-center'
                });
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        if (!product) return;
        
        for (let i = 0; i < quantity; i++) {
            addToCart(product);
        }
        
        toast.success(`${product.name} (${quantity}) added to cart!`, {
            position: 'bottom-right',
            autoClose: 2000
        });
    };

    const handleOrderNow = () => {
        if (!product) return;
        
        for (let i = 0; i < quantity; i++) {
            addToCart(product);
        }
        
        navigate('/checkout');
        toast.success('Redirecting to checkout...', {
            position: 'top-center',
            autoClose: 1500
        });
    };

    const increaseQuantity = () => {
        if (product && quantity < product.InStock) {
            setQuantity(quantity + 1);
        }
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    if (loading) {
        return (
            <div className="container py-8">
                <div className="product-loading">
                    <div className="spinner"></div>
                    <p>Loading product details...</p>
                </div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="container py-8">
                <div className="product-error">
                    <h2>Product Not Found</h2>
                    <p>{error || 'The product you are looking for does not exist.'}</p>
                    <button className="btn-back" onClick={() => navigate('/')}>
                        Back to Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container py-8">
            <div className="product-detail-container">
                {/* Product Images */}
                <div className="product-images">
                    <div className="main-image">
                        <img 
                            src={product.images?.[selectedImage] || product.images?.[0]} 
                            alt={`${product.name}`} 
                        />
                    </div>

                    {product.images?.length > 1 && (
                        <div className="thumbs-container">
                            {product.images?.map((image, index) => (
                                <div 
                                    key={index}
                                    className={`thumb-image ${selectedImage === index ? 'active' : ''}`}
                                    onClick={() => setSelectedImage(index)}
                                >
                                    <img src={image} alt={`Thumb ${index + 1}`} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Product Info */}
                <div className="product-info-section">
                    <div className="product-header">
                        <h1>{product.name}</h1>
                        <button className="btn-wishlist" title="Add to Wishlist">
                            <FiHeart />
                        </button>
                    </div>

                    <div className="product-rating">
                        <Rating 
                            name="product-rating" 
                            value={product.rating || 0} 
                            readOnly 
                            precision={0.5} 
                        />
                        <span className="rating-text">({product.rating || 0})</span>
                    </div>

                    <div className="product-price">
                        <span className="current-price">${product.price}</span>
                        {product.oldPrice && (
                            <span className="old-price">${product.oldPrice}</span>
                        )}
                        {product.oldPrice && (
                            <span className="discount-badge">
                                {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}% OFF
                            </span>
                        )}
                    </div>

                    <div className="product-stock">
                        <span className={`stock-status ${product.InStock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                            {product.InStock > 0 ? `In Stock (${product.InStock} available)` : 'Out of Stock'}
                        </span>
                    </div>

                    {product.description && (
                        <div className="product-description">
                            <h3>Description</h3>
                            <p>{product.description}</p>
                        </div>
                    )}

                    {product.brand && (
                        <div className="product-detail-item">
                            <span className="label">Brand:</span>
                            <span className="value">{product.brand}</span>
                        </div>
                    )}

                    {product.category && (
                        <div className="product-detail-item">
                            <span className="label">Category:</span>
                            <span className="value">{product.category}</span>
                        </div>
                    )}

                    {product.weight && (
                        <div className="product-detail-item">
                            <span className="label">Weight:</span>
                            <span className="value">{product.weight}</span>
                        </div>
                    )}

                    {/* Quantity Selector */}
                    <div className="quantity-section">
                        <label>Quantity:</label>
                        <div className="quantity-controls">
                            <button 
                                className="qty-btn" 
                                onClick={decreaseQuantity}
                                disabled={quantity <= 1}
                            >
                                -
                            </button>
                            <input 
                                type="number" 
                                value={quantity} 
                                onChange={(e) => {
                                    const val = parseInt(e.target.value) || 1;
                                    if (val >= 1 && val <= product.InStock) {
                                        setQuantity(val);
                                    }
                                }}
                                min="1"
                                max={product.InStock}
                            />
                            <button 
                                className="qty-btn" 
                                onClick={increaseQuantity}
                                disabled={quantity >= product.InStock}
                            >
                                +
                            </button>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="product-actions">
                        <button 
                            className="btn-add-to-cart-detail"
                            onClick={handleAddToCart}
                            disabled={product.InStock <= 0}
                        >
                            <BsHandbag /> Add to Cart
                        </button>
                        <button 
                            className="btn-order-now"
                            onClick={handleOrderNow}
                            disabled={product.InStock <= 0}
                        >
                            Order Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
