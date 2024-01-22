const express = require("express");
const router = express.Router();
const User = require("../models/User.js");
const bcrypt = require("bcryptjs");

const generateAvatar = () => {
  const randomAvatar = Math.floor(Math.random() * 69) + 1;
  return `https://i.pravatar.cc/150?img=${randomAvatar}}`;
};

// Yeni kullanıcı oluşturma
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const avatar = generateAvatar();

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ errorMessage: "Bu email zaten var" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      avatar: avatar,
    });
    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
  }
});

// kullanıcı silme
router.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: "Sunucu hatası" });
  }
});

// tüm kullanıcıları getirme
router.get("/",  async(req,res)=> {
    try {
        const users = await User.find()
        await res.status(200).json(users)
    } catch (error) {
        console.log(error)
        res.status(500).json({errorMessage: "Sunucu hatası"})
    }
})

// kullanıcı login işlemi
 router.post("/login" , async(req,res)=> {
    try {
        const {email,password} = req.body

        const user = await User.findOne({email})
        if(!user) return res.status(400).json({errorMessage: "Böyle bir kullanıcı yok"})

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(!isPasswordValid) return res.status(400).json({errorMessage: "Geçersiz şifre"})

        res.status(200).json({
            id: user._id,
            username: user.username,
            email: user.email,
            avatar: user.avatar,
            role: user.role
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({errorMessage: "Sunucu hatası"})
    }
 })

module.exports = router;
