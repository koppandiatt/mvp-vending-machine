import express from "express";
import product from "../controllers/product.js";
import validate from "../middleware/validate.js";
import auth from "../middleware/auth.js";
import { validateProduct } from "./../models/product.js";
import { ROLES } from "../constants/roles.js";

const router = express.Router();

router.get("/", product.list);
router.get("/:id", validate.objectID, product.get);
router.post(
  "/",
  [
    auth.isAuthenticated,
    auth.hasRole(ROLES.SELLER),
    validate.body(validateProduct),
  ],
  product.create
);
router.put(
  "/:id",
  [
    auth.isAuthenticated,
    auth.hasRole(ROLES.SELLER),
    validate.objectID,
    validate.body(validateProduct),
  ],
  product.update
);
router.delete(
  "/:id",
  [auth.isAuthenticated, auth.hasRole(ROLES.SELLER), validate.objectID],
  product.delete
);

export default router;
