import { useState, useEffect } from 'react';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { orderAPI } from '../../utils/api';
import { toast } from 'react-toastify';
import './dashboard.css';

const Dashboard = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userEmail, setUserEmail] = useState('');
    const [cancellingOrderId, setCancellingOrderId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            const user = auth.currentUser;
            
            if (!user) {
                navigate('/');
                return;
            }

            setUserEmail(user.email);

            try {
                // Fetch all orders and filter by current user's email on frontend
                const result = await orderAPI.getAll();
                
                if (result.success) {
                    // Filter orders by current user's email
                    const userOrders = result.data.filter(order => 
                        order.email.toLowerCase() === user.email.toLowerCase()
                    );
                    
                    // Sort orders by creation date (newest first)
                    const sortedOrders = userOrders.sort((a, b) => 
                        new Date(b.createdAt) - new Date(a.createdAt)
                    );
                    setOrders(sortedOrders);
                } else {
                    toast.error('Failed to load orders', {
                        position: 'bottom-center'
                    });
                }
            } catch (error) {
                console.error('Error fetching orders:', error);
                toast.error('Error loading orders', {
                    position: 'bottom-center'
                });
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [navigate]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };
    const handleCancelOrder = async (orderId, orderStatus) => {
        // Check if order can be cancelled
        if (orderStatus.toLowerCase() === 'confirmed') {
            toast.error('Cannot cancel a confirmed order', {
                position: 'bottom-center',
                autoClose: 3000
            });
            return;
        }

        // Show confirmation dialog
        const confirmCancel = window.confirm(
            'Are you sure you want to cancel this order? This action cannot be undone.'
        );

        if (!confirmCancel) {
            return;
        }

        setCancellingOrderId(orderId);

        try {
            const result = await orderAPI.delete(orderId);
            
            if (result.success) {
                // Remove the cancelled order from state
                setOrders(prevOrders => prevOrders.filter(order => order._id !== orderId));
                
                toast.success('Order cancelled successfully', {
                    position: 'top-center',
                    autoClose: 2000
                });
            } else {
                toast.error(result.error || 'Failed to cancel order', {
                    position: 'bottom-center',
                    autoClose: 3000
                });
            }
        } catch (error) {
            console.error('Error cancelling order:', error);
            toast.error('Error cancelling order', {
                position: 'bottom-center',
                autoClose: 3000
            });
        } finally {
            setCancellingOrderId(null);
        }
    };

    const canCancelOrder = (orderStatus) => {
        const status = orderStatus.toLowerCase();
        return status !== 'confirmed' && status !== 'cancelled' && status !== 'delivered';
    };
    const getStatusClass = (status) => {
        switch (status.toLowerCase()) {
            case 'pending':
                return 'status-pending';
            case 'processing':
                return 'status-processing';
            case 'shipped':
                return 'status-shipped';
            case 'delivered':
                return 'status-delivered';
            case 'cancelled':
                return 'status-cancelled';
            default:
                return 'status-pending';
        }
    };

    if (loading) {
        return (
            <div className="container py-8">
                <div className="dashboard-loading">
                    <div className="loading-spinner"></div>
                    <p>Loading your orders...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container py-8">
            <div className="dashboard-container">
                <div className="dashboard-header">
                    <h1>My Dashboard</h1>
                    <p className="dashboard-email">Orders for: {userEmail}</p>
                </div>

                {orders.length === 0 ? (
                    <div className="no-orders">
                        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                        </svg>
                        <h2>No Orders Yet</h2>
                        <p>You haven't placed any orders yet. Start shopping to see your orders here!</p>
                        <button className="btn-shop-now" onClick={() => navigate('/')}>
                            Start Shopping
                        </button>
                    </div>
                ) : (
                    <div className="orders-list">
                        <div className="orders-summary">
                            <div className="summary-card">
                                <h3>Total Orders</h3>
                                <p className="summary-number">{orders.length}</p>
                            </div>
                            <div className="summary-card">
                                <h3>Total Spent</h3>
                                <p className="summary-number">
                                    ${orders.reduce((sum, order) => sum + order.totalAmount, 0).toFixed(2)}
                                </p>
                            </div>
                            <div className="summary-card">
                                <h3>Pending Orders</h3>
                                <p className="summary-number">
                                    {orders.filter(order => order.orderStatus.toLowerCase() === 'pending').length}
                                </p>
                            </div>
                        </div>

                        <div className="orders-table-container">
                            {orders.map((order) => (
                                <div key={order._id} className="order-card">
                                    <div className="order-card-header">
                                        <div className="order-info">
                                            <h3>Order #{order._id.slice(-8).toUpperCase()}</h3>
                                            <p className="order-date">{formatDate(order.createdAt)}</p>
                                        </div>
                                        <span className={`order-status ${getStatusClass(order.orderStatus)}`}>
                                            {order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}
                                        </span>
                                    </div>

                                    <div className="order-card-body">
                                        <div className="order-details-grid">
                                            <div className="detail-item">
                                                <label>Customer Name</label>
                                                <p>{order.name}</p>
                                            </div>
                                            <div className="detail-item">
                                                <label>Phone</label>
                                                <p>{order.phone}</p>
                                            </div>
                                            <div className="detail-item">
                                                <label>Town/City</label>
                                                <p>{order.town}</p>
                                            </div>
                                            <div className="detail-item full-width">
                                                <label>Delivery Address</label>
                                                <p>{order.address}</p>
                                            </div>
                                        </div>

                                        <div className="order-products">
                                            <h4>Products Ordered</h4>
                                            <div className="products-table">
                                                <table>
                                                    <thead>
                                                        <tr>
                                                            <th>Product Name</th>
                                                            <th>Quantity</th>
                                                            <th>Price</th>
                                                            <th>Subtotal</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {order.products.map((product, index) => (
                                                            <tr key={index}>
                                                                <td>{product.name}</td>
                                                                <td>{product.quantity}</td>
                                                                <td>${product.price.toFixed(2)}</td>
                                                                <td>${(product.quantity * product.price).toFixed(2)}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>

                                        <div className="order-total">
                                            <strong>Total Amount:</strong>
                                            <span className="total-amount">${order.totalAmount.toFixed(2)}</span>
                                        </div>

                                        {canCancelOrder(order.orderStatus) && (
                                            <div className="order-actions">
                                                <button 
                                                    className="btn-cancel-order"
                                                    onClick={() => handleCancelOrder(order._id, order.orderStatus)}
                                                    disabled={cancellingOrderId === order._id}
                                                >
                                                    {cancellingOrderId === order._id ? (
                                                        <>
                                                            <span className="cancel-spinner"></span>
                                                            Cancelling...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                                                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                                                            </svg>
                                                            Cancel Order
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
