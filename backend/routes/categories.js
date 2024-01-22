const express = require("express");
const router = express.Router();
const Category = require("../models/Category.js");

// Yeni kategori oluşturma
router.post("/", async (req, res) => {
  try {
    const { name, img } = req.body;

    const newCategory = new Category({ name, img });
    await newCategory.save();

    res.status(201).json(newCategory);
  } catch (error) {
    console.log(error);
  }
});

// Tüm kategorileri getirme
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: "Sunucu hatası" });
  }
});

// belirli bir kategoriyi  getirme
router.get("/:id", async (req, res) => {
  try {
    const categoryId = await Category.findById(req.params.id);
    res.status(200).json(categoryId);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: "Sunucu hatası" });
  }
});

// kategori güncelleme
router.put("/:id", async (req, res) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedCategory);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: "Sunucu hatası" });
  }
});

// kategori silme
router.delete("/:id", async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedCategory);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: "Sunucu hatası" });
  }
});

module.exports = router;
