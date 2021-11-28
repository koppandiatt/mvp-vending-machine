import express from "express";
import user from "../controllers/user.js";
import validate from "../middleware/validate.js";
import { validateUser } from "../models/user.js";

const router = express.Router();

router.post("/", validate.body(validateUser), user.create);

export default router;
