const express = require("express");
const router = express.Router();
const Product = require("../models/Product.js");

// ürün oluşturma işlemi
router.post("/", async (req, res) => {
  try {
    const { name, price, category, img, review, description, color, size } =
      req.body;
    const newProduct = new Product({
      name,
      price,
      category,
      img,
      review,
      description,
      color,
      size,
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: "Sunucu hatası" });
  }
});

// tüm ürünleri getirme işlemi
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: "Sunucu hatası" });
  }
});

// tek bir ürünü getirme işlemi
router.get("/:id", async (req, res) => {
  try {
    const productId = await Product.findById(req.params.id);

    if (!productId)
      return res.status(404).json({ errorMessage: "Ürün bulunamadı" });

    res.status(200).json(productId);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: "Sunucu hatası" });
  }
});

// ürün güncelleme işlemi
router.put("/:id", async (req, res) => {
  try {
    const { name, price, category, img, review, description, color, size } =
      req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, category, img, review, description, color, size },
      { new: true }
    );

    if (!updatedProduct)
      return res.status(404).json({ errorMessage: "Ürün bulunamadı" });

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: "Sunucu hatası" });
  }
});

// ürün silme işlemi
router.delete("/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct)
      return res.status(404).json({ errorMessage: "Ürün bulunamadı" });

    res.status(200).json(deletedProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: "Sunucu hatası" });
  }
});

// ürünleri isme göre arama işlemi
router.get("/search/:name", async (req, res) => {
  try {
    const products = await Product.find({
      name: { $regex: req.params.name, $options: "i" },
    });
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: "Sunucu hatası" });
  }
});

module.exports = router;
