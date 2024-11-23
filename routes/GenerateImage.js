import express from "express";
import { generateImage } from "../controllers/GenerateImage.js";
const router = express.Router();
// router.patch("/", generateImage);
router.post("/", generateImage);
export default router;