import express from "express";
import authRoutes from "./auth.js";
import userRoutes from "./user.js";
import productRoutes from "./product.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/products", productRoutes);

export default router;
