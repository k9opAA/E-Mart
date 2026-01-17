import { useEffect, useState } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updatingStatus, setUpdatingStatus] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/orders");
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
        setError(null);
      } else {
        setError("Failed to fetch orders");
      }
    } catch (err) {
      setError("API endpoint not available yet");
      console.log("Orders API not available:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingStatus(orderId);
    try {
      const response = await fetch(`http://localhost:4000/api/orders/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderStatus: newStatus }),
      });

      if (response.ok) {
        const updatedOrder = await response.json();
        setOrders(orders.map(order => 
          order._id === orderId ? { ...order, orderStatus: newStatus } : order
        ));
        if (selectedOrder?._id === orderId) {
          setSelectedOrder({ ...selectedOrder, orderStatus: newStatus });
        }
        alert("Order status updated successfully!");
      } else {
        alert("Failed to update order status");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Error updating order status");
    } finally {
      setUpdatingStatus(null);
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-700 border-green-300";
      case "delivering":
        return "bg-blue-100 text-blue-700 border-blue-300";
      case "confirmed":
        return "bg-purple-100 text-purple-700 border-purple-300";
      case "cancelled":
        return "bg-red-100 text-red-700 border-red-300";
      case "pending":
      default:
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
    }
  };

  return (
    <div className="p-6">
      <div className="bg-white p-4 rounded shadow-sm mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Orders Management</h1>
      </div>

      <div className="bg-white p-4 rounded shadow-sm">
        {loading ? (
          <p className="text-gray-600">Loading orders...</p>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-2">{error}</p>
            <p className="text-sm text-gray-400">
              This page will display orders once the orders API endpoint is implemented.
            </p>
          </div>
        ) : orders.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No orders found</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-200">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="p-3 text-left">Order ID</th>
                  <th className="p-3 text-left">Customer</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Phone</th>
                  <th className="p-3 text-left">Date</th>
                  <th className="p-3 text-left">Total</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="border-t hover:bg-gray-50">
                    <td className="p-3 font-mono text-xs">{order._id.slice(-8)}</td>
                    <td className="p-3 font-medium">{order.name}</td>
                    <td className="p-3 text-gray-600">{order.email}</td>
                    <td className="p-3 text-gray-600">{order.phone}</td>
                    <td className="p-3">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="p-3 font-semibold">${order.totalAmount.toFixed(2)}</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded text-xs border ${getStatusBadgeColor(order.orderStatus)}`}>
                        {order.orderStatus}
                      </span>
                    </td>
                    <td className="p-3">
                      <button 
                        onClick={() => setSelectedOrder(order)}
                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-xs"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
              <h2 className="text-xl font-bold">Order Details</h2>
              <button 
                onClick={() => setSelectedOrder(null)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="p-6">
              {/* Customer Information */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 text-blue-600">Customer Information</h3>
                <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded">
                  <div>
                    <p className="text-sm text-gray-600">Name</p>
                    <p className="font-medium">{selectedOrder.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium">{selectedOrder.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-medium">{selectedOrder.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Town</p>
                    <p className="font-medium">{selectedOrder.town}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-gray-600">Address</p>
                    <p className="font-medium">{selectedOrder.address}</p>
                  </div>
                </div>
              </div>

              {/* Order Information */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 text-blue-600">Order Information</h3>
                <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded">
                  <div>
                    <p className="text-sm text-gray-600">Order ID</p>
                    <p className="font-mono text-sm">{selectedOrder._id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Order Date</p>
                    <p className="font-medium">{new Date(selectedOrder.createdAt).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Amount</p>
                    <p className="font-bold text-lg">${selectedOrder.totalAmount.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Current Status</p>
                    <span className={`inline-block px-3 py-1 rounded text-sm border ${getStatusBadgeColor(selectedOrder.orderStatus)}`}>
                      {selectedOrder.orderStatus}
                    </span>
                  </div>
                </div>
              </div>

              {/* Products */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 text-blue-600">Products</h3>
                <div className="border rounded overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="p-3 text-left">Product Name</th>
                        <th className="p-3 text-right">Quantity</th>
                        <th className="p-3 text-right">Price</th>
                        <th className="p-3 text-right">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedOrder.products.map((product, index) => (
                        <tr key={index} className="border-t">
                          <td className="p-3 font-medium">{product.name}</td>
                          <td className="p-3 text-right">{product.quantity}</td>
                          <td className="p-3 text-right">${product.price.toFixed(2)}</td>
                          <td className="p-3 text-right font-semibold">${(product.quantity * product.price).toFixed(2)}</td>
                        </tr>
                      ))}
                      <tr className="border-t bg-gray-50">
                        <td colSpan="3" className="p-3 text-right font-bold">Total:</td>
                        <td className="p-3 text-right font-bold text-lg">${selectedOrder.totalAmount.toFixed(2)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Status Management */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-3 text-blue-600">Update Order Status</h3>
                <div className="flex flex-wrap gap-2">
                  {["pending", "confirmed", "delivering", "delivered", "cancelled"].map((status) => (
                    <button
                      key={status}
                      onClick={() => handleStatusChange(selectedOrder._id, status)}
                      disabled={updatingStatus === selectedOrder._id || selectedOrder.orderStatus === status}
                      className={`px-4 py-2 rounded font-medium text-sm transition ${
                        selectedOrder.orderStatus === status
                          ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                          : status === "confirmed"
                          ? "bg-purple-600 text-white hover:bg-purple-700"
                          : status === "cancelled"
                          ? "bg-red-600 text-white hover:bg-red-700"
                          : status === "delivering"
                          ? "bg-blue-600 text-white hover:bg-blue-700"
                          : status === "delivered"
                          ? "bg-green-600 text-white hover:bg-green-700"
                          : "bg-yellow-600 text-white hover:bg-yellow-700"
                      } ${updatingStatus === selectedOrder._id ? "opacity-50 cursor-wait" : ""}`}
                    >
                      {updatingStatus === selectedOrder._id ? "Updating..." : status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
