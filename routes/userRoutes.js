const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user"); // Model User
const authMiddleware = require("../middleware/authMiddleware");
const mongoose = require("mongoose");

const router = express.Router();

//Register user
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    //cek ketersediaan username apakah sudah dipakai
    const userExists = await User.findOne({ username });
    if (userExists)
      return res.status(400).json({ message: "Username sudah digunakan" });

    // Buat user baru
    const newUser = new User({ username, password });
    await newUser.save();
    res.status(201).json({ message: "User berhasil didaftarkan" });
  } catch (error) {
    res.status(505).json({ message: "Terjadi kesalahan saat registrasi" });
  }
});

// Login user
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Cari user berdasarkan username
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User tidak ditemukan" });

    // Cek password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(404)
        .json({ message: "username dan password tidak sesuai" });

    // Buat token JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ message: "Login berhasil", token });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan saat login" });
  }
});

// Auth user login
router.get("/", authMiddleware, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil data users" });
  }
});

// ✅ GET Semua User
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// ✅ POST /users - Tambah User Baru dengan Validasi
router.post("/", async (req, res) => {
  try {
    const { username, level, energy, gold } = req.body;
    if (!username) {
      return res.status(400).json({ message: "Username wajib diisi" });
    }

    const newUser = new User({ username, level, energy, gold });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    next(err);
  }
});

// ✅ GET User by ID dengan Validasi ID
router.get("/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    next(err);
  }
});

// ✅ PUT /users/:id - Update User dengan Validasi Data Kosong
router.put("/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    if (Object.keys(req.body).length === 0) {
      return res
        .status(400)
        .json({ message: "Data update tidak boleh kosong" });
    }

    const userUpdate = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!userUpdate) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(userUpdate);
  } catch (err) {
    next(err);
  }
});

// Delete user by ID
router.delete("/:id", async (req, res) => {
  try {
    // validasi dulu
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(400).json({ message: "User not found" });
    }
    res.json({ message: "User delete successfully" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
