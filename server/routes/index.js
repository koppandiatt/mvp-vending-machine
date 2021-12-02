import express from "express";
import authRoutes from "./auth.js";
import userRoutes from "./user.js";
import productRoutes from "./product.js";
import auth from "../middleware/auth.js";
import { ROLES } from "../constants/roles.js";
import shop, { validateCheckOut } from "../controllers/shop.js";
import validate from "../middleware/validate.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/products", productRoutes);
router.post(
  "/buy",
  [
    auth.isAuthenticated,
    auth.hasRole(ROLES.BUYER),
    validate.body(validateCheckOut),
  ],
  shop.buy
);

export default router;
