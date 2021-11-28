import express from "express";
import product from "../controllers/product.js";
import validate from "../middleware/validate.js";
import { validateProduct } from "./../models/product.js";

const router = express.Router();

router.get("/", product.list);
router.get("/:id", validate.objectID, product.get);
router.post("/", validate.body(validateProduct), product.create);
router.put(
  "/:id",
  validate.objectID,
  validate.body(validateProduct),
  product.update
);

export default router;
