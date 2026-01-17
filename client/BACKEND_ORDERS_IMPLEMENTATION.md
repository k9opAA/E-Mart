# Backend Orders Implementation Guide

The frontend checkout has been updated to send order data to the backend. You now need to implement the backend API endpoint.

## Required Backend Files

### 1. Create Order Model: `server/models/orders.js`

```javascript
const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    town: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    orderStatus: {
      type: String,
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

orderSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

orderSchema.set('toJSON', {
  virtuals: true,
});

exports.Order = mongoose.model("Order", orderSchema);
exports.orderSchema = orderSchema;
```

### 2. Create Orders Route: `server/routes/orders.js`

```javascript
const { Order } = require("../models/orders");
const express = require("express");
const router = express.Router();

// Get all orders
router.get("/", async (req, res) => {
  try {
    const orderList = await Order.find().populate("products.productId").sort({ createdAt: -1 });
    if (!orderList) {
      return res.status(500).json({ success: false });
    }
    res.status(200).send(orderList);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get single order by ID
router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("products.productId");
    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }
    return res.status(200).send(order);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create new order
router.post("/create", async (req, res) => {
  try {
    const { name, email, address, town, phone, products, totalAmount, orderStatus } = req.body;

    // Validate required fields
    if (!name || !email || !address || !town || !phone || !products || !totalAmount) {
      return res.status(400).json({ 
        success: false, 
        message: "Please provide all required fields" 
      });
    }

    // Validate products array
    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: "Order must contain at least one product" 
      });
    }

    let order = new Order({
      name,
      email,
      address,
      town,
      phone,
      products,
      totalAmount,
      orderStatus: orderStatus || "pending"
    });

    order = await order.save();

    if (!order) {
      return res.status(400).json({ 
        success: false, 
        message: "The order cannot be created!" 
      });
    }

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order: order
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Update order status
router.put("/:id", async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        orderStatus: req.body.orderStatus,
      },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ 
        message: "Order cannot be updated!" 
      });
    }

    res.send(order);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete order
router.delete("/:id", async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) {
      return res.status(404).json({ 
        message: "Order not found!", 
        success: false 
      });
    }
    res.status(200).json({ 
      success: true, 
      message: "Order deleted successfully!" 
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
```

### 3. Update Server Configuration: `server/server.js`

Add these lines to your `server.js` file:

```javascript
// Import the orders route
const orderRoutes = require('./routes/orders');

// Register the route (add this after your existing routes)
app.use('/api/orders', orderRoutes);
```

Your complete routes section should look like:

```javascript
//routes
const categoryRoutes = require('./routes/categories');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');

app.use('/api/category', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
```

## Testing the Implementation

After implementing the backend:

1. **Start your backend server** (if not already running)
   ```bash
   cd server
   npm start
   ```

2. **Start your frontend** (if not already running)
   ```bash
   cd client
   npm run dev
   ```

3. **Test the order flow:**
   - Add products to cart
   - Go to checkout
   - Fill in billing information
   - Click "Place Order"
   - Check your MongoDB database for the new order

## Frontend Changes Made

The Checkout component (`src/Pages/Checkout/index.jsx`) has been updated to:

- **Use centralized API utility** (`src/utils/api.js`) for cleaner, reusable code
- Format order data according to the schema you provided
- Send POST request to `http://localhost:4000/api/orders/create` via `orderAPI.create()`
- Map cart items to the products array with required fields:
  - `productId` (MongoDB ObjectId)
  - `name` (product name)
  - `quantity` (number of items)
  - `price` (product price)
- Include customer information (name, email, address, town, phone)
- Calculate `totalAmount` including tax
- Set `orderStatus` to "pending" by default
- Handle success/error responses properly

### New API Utility

A centralized API utility has been created at `src/utils/api.js` that provides:
- Reusable API functions for orders, products, and categories
- Consistent error handling
- Environment-based API URL configuration
- Type-safe endpoint definitions

This makes the codebase more maintainable and easier to update in the future.

## Database Verification

After placing an order, you can verify it in MongoDB:

```bash
# Using MongoDB Compass or mongo shell
db.orders.find().pretty()
```

Or check through your backend:
```
GET http://localhost:4000/api/orders
```

## Additional Features (Optional)

Consider adding these features later:

1. **Order confirmation email** - Send email to customer
2. **Order tracking page** - Allow customers to view order status
3. **Admin dashboard integration** - Manage orders in admin panel
4. **User order history** - Show past orders in user profile
5. **Payment integration** - Add payment gateway before order confirmation
