const express = require("express");
require("dotenv").config();
const connectDB = require("./config/database");

//Middleware
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");

//Routes
const userRoutes = require("./routes/userRoutes");
const cardRoutes = require("./routes/cardRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Koneksi ke database (harus di panggil lebih awal)
connectDB();

//Middleware global (taruh sebelum route)
app.use(express.json());
app.use(logger);

//Routes (API endpoint)
app.use("/api/users", userRoutes);
app.use("/api/cards", cardRoutes);

// Middleware untuk menangani route yang tidak ditemukan (404)
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

//Error handling (ditaruh di paling akhir)
app.use(errorHandler);

// Jalankan server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
