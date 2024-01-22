const express = require("express");
const router = express.Router();


// diğer route dosyalarını burada import ediyoruz
const categoryRoute = require("./categories.js")
const productRoute = require("./products.js")
const authRoute = require("./auth.js")
const couponRoute = require("./coupons.js")
const paymentRoute = require("./payment.js")


router.use("/categories", categoryRoute)
router.use("/products", productRoute)
router.use("/auth", authRoute)
router.use("/coupons", couponRoute)
router.use("/payment", paymentRoute)


module.exports = router;