const { Category } = require("../models/categories");
const { Product } = require("../models/products");
const express = require("express");
const router = express.Router();

router.get(`/`, async (req, res) => {
  try {
    const productList = await Product.find().populate("category");
    if (!productList) {
      return res.status(500).json({ success: false });
    }
    res.send(productList);
  } catch (error) {
    res.status(500).json({ success: false, error: error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(500).json({ message: "The product was not found." });
    }
    return res.status(200).send(product);
  } catch (error) {
    res.status(500).json({ success: false, error: error });
  }
});

router.post("/create", async (req, res) => {
  try {
    const category = await Category.findById(req.body.category);
    if (!category) return res.status(404).send("Invalid Category!");

    let product = new Product({
      name: req.body.name,
      description: req.body.description,
      images: req.body.images,
      brand: req.body.brand,
      price: req.body.price,
      category: req.body.category,
      InStock: req.body.InStock,
      rating: req.body.rating,
      isFeatured: req.body.isFeatured,
    });

    product = await product.save();

    if (!product) return res.status(500).send("The product cannot be created");

    res.status(201).send(product);
  } catch (error) {
    res.status(500).json({ success: false, error: error });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        description: req.body.description,
        images: req.body.images,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        InStock: req.body.InStock,
        rating: req.body.rating,
        isFeatured: req.body.isFeatured,
      },
      { new: true } // Returns updated object
    );

    if (!product) return res.status(404).send("The product cannot be updated!");

    res.status(200).send(product);
  } catch (error) {
    res.status(500).json({ success: false, error: error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found!" });
    }
    return res.status(200).json({ success: true, message: "Product deleted!" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error });
  }
});

module.exports = router;