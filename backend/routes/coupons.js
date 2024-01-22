const express = require("express");
const router = express.Router();
const Coupon = require("../models/Coupon.js");

// Yeni kupon oluşturma işlemi
router.post("/", async (req, res) => {
  try {
    const { code, discountPercent } = req.body;
    const newCoupon = new Coupon({ code, discountPercent });
    await newCoupon.save();
    res.status(201).json(newCoupon);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: "Sunucu hatası" });
  }
});

// tüm kuponları getirme işlemi
router.get("/", async (req, res) => {
  try {
    const coupons = await Coupon.find();
    res.status(200).json(coupons);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: "Sunucu hatası" });
  }
});

// tek bir kuponu getirme işlemi (id ye göre)
router.get("/:id", async (req, res) => {
  try {
    const couponId = await Coupon.findById(req.params.id);
    if (!couponId)
      return res.status(404).json({ errorMessage: "Kupon bulunamadı" });
    res.status(200).json(couponId);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: "Sunucu hatası" });
  }
});

// tek bir kuponu getirme işlemi (kupon koduna göre)
router.get("/code/:code", async (req, res) => {
  try {
    const couponCode = await Coupon.findOne({ code: req.params.code });
    if (!couponCode)
      return res.status(404).json({ errorMessage: "Kupon kodu bulunamadı" });
    res.status(200).json(couponCode);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: "Sunucu hatası" });
  }
});

// kupon güncelleme işlemi
router.put("/:id", async (req, res) => {
  try {
    const { code, discountPercent } = req.body;
    const updatedCoupon = await Coupon.findByIdAndUpdate(
      req.params.id,
      { code, discountPercent },
      { new: true }
    );
    res.status(200).json(updatedCoupon);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: "Sunucu hatası" });
  }
});

// kupon silme işlemi
router.delete("/:id", async (req, res) => {
  try {
    const deletedCoupon = await Coupon.findByIdAndDelete(req.params.id);
    if (!deletedCoupon)
      return res.status(404).json({ errorMessage: "Kupon bulunamadı" });
    res.status(200).json(deletedCoupon);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: "Sunucu hatası" });
  }
});

module.exports = router;
