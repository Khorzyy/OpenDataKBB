import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Import routes
import tableRoutes from "./controllers/tableRoutes.js";
import dataRoutes from "./controllers/dataRoutes.js";
import uploadRoutes from "./controllers/uploadRoutes.js"; // ⬅️ ganti path
import catalogRoutes from "./controllers/catalogRoutes.js";
import fileRoutes from "./controllers/fileRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Koneksi MongoDB
mongoose.connect(process.env.MONGOURI)
  .then(() => console.log("✅ MongoDB Atlas connected"))
  .catch(err => console.error("❌ Connection error:", err));

// Routes
app.use("/api/files", fileRoutes);
app.use("/api/catalog", catalogRoutes);
app.use("/api/tables", tableRoutes);
app.use("/api/data", dataRoutes);
app.use("/tables", uploadRoutes); // sekarang ini benar2 route
app.use("/uploads", express.static("uploads"));

// Test API
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from local API 🚀" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});
