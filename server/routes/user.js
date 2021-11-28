import express from "express";
import user from "../controllers/user.js";

const router = express.Router();

router.post("/", user.create);

export default router;
