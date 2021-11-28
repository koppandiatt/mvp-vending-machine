import express from "express";
import userRoutes from "./user.js";
import productRoutes from "./product.js";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/products", productRoutes);

export default router;
