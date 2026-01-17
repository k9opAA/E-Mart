const { Category } = require("../models/categories");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const categoryList = await Category.find();
    if (!categoryList) return res.status(500).json({ success: false });
    res.status(200).send(categoryList);
  } catch (error) {
    res.status(500).json({ success: false, error: error });
  }
});



router.post('/create', async(req, res) => {
    try {
        let category = new Category({
            name: req.body.name,
            images: req.body.images,
            color: req.body.color
        });

        category = await category.save();

        if (!category) return res.status(400).send('The category cannot be created!');
        res.status(201).send(category);
    } catch (error) {
        res.status(500).json({ success: false, error: error });
    }
});

router.get("/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(500).json({ message: "The category with the given ID was not found." });
    }
    return res.status(200).send(category);
  } catch (error) {
    res.status(500).json({ success: false, error: error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await Category.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "Category not found!", success: false });
    }
    res.status(200).json({ success: true, message: "Category Deleted!" });
  } catch (error) {
    res.status(500).json({ success: false, error: error });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        images: req.body.images,
        color: req.body.color,
      },
      { new: true }
    );

    if (!category) return res.status(400).send("Category cannot be updated!");

    res.send(category);
  } catch (error) {
    res.status(500).json({ success: false, error: error });
  }
});

module.exports = router;