import express from "express";
import authRoutes from "./auth.js";
import userRoutes from "./user.js";
import productRoutes from "./product.js";
import auth from "../middleware/auth.js";
import { ROLES } from "../constants/roles.js";
import shop from "../controllers/shop.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/products", productRoutes);
router.post(
  "/buy",
  [auth.isAuthenticated, auth.hasRole(ROLES.BUYER)],
  shop.buy
);

export default router;
