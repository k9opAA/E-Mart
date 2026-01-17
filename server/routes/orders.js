const { Order } = require("../models/orders");
const express = require("express");
const router = express.Router();

// Get all orders
router.get(`/`, async (req, res) => {
  try {
    const orderList = await Order.find().populate("products.productId");
    if (!orderList) {
      return res.status(500).json({ success: false });
    }
    res.send(orderList);
  } catch (error) {
    res.status(500).json({ success: false, error: error });
  }
});

// Get order by ID
router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "products.productId"
    );
    if (!order) {
      return res.status(500).json({ message: "The order was not found." });
    }
    return res.status(200).send(order);
  } catch (error) {
    res.status(500).json({ success: false, error: error });
  }
});

// Create new order
router.post("/create", async (req, res) => {
  try {
    let order = new Order({
      name: req.body.name,
      address: req.body.address,
      town: req.body.town,
      email: req.body.email,
      phone: req.body.phone,
      products: req.body.products,
      totalAmount: req.body.totalAmount,
      orderStatus: req.body.orderStatus || "pending",
    });

    order = await order.save();

    if (!order) {
      return res.status(400).send("The order cannot be created!");
    }

    res.status(201).send(order);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
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
      return res.status(400).send("The order cannot be updated!");
    }

    res.send(order);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete order
router.delete("/:id", async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (order) {
      return res
        .status(200)
        .json({ success: true, message: "The order is deleted!" });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Order not found!" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, error: error });
  }
});

module.exports = router;
