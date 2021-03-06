import express from "express";
import { ROLES } from "../constants/roles.js";
import user from "../controllers/user.js";
import auth from "../middleware/auth.js";
import validate from "../middleware/validate.js";
import {
  validateDeposit,
  validatePassword,
  validateUser,
} from "../models/user.js";

const router = express.Router();

router.post("/", validate.body(validateUser), user.create);
router.patch(
  "/password",
  [auth.isAuthenticated, validate.body(validatePassword)],
  user.changePassword
);
router.delete("/", auth.isAuthenticated, user.deleteSelf);
router.patch(
  "/deposit",
  [
    auth.isAuthenticated,
    auth.hasRole(ROLES.BUYER),
    validate.body(validateDeposit),
  ],
  user.deposit
);
router.patch(
  "/reset",
  [auth.isAuthenticated, auth.hasRole(ROLES.BUYER)],
  user.resetDeposit
);
router.get("/profile", auth.isAuthenticated, user.profile);
router.get(
  "/products",
  [auth.isAuthenticated, auth.hasRole(ROLES.SELLER)],
  user.products
);

export default router;
