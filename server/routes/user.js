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
router.delete("/", auth.isAuthenticated, user.delete);
router.patch(
  "/deposit",
  [
    auth.isAuthenticated,
    auth.hasRole(ROLES.BUYER),
    validate.body(validateDeposit),
  ],
  user.deposit
);

export default router;
