import express from "express";
import product from "../controllers/product.js";
import validate from "../middleware/validate.js";
import { validateProduct } from "./../models/product.js";

const router = express.Router();

router.get("/", product.list);
router.post("/", validate.body(validateProduct), product.create);

export default router;
