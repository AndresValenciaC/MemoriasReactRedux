import express from "express";
import { sigIn, sigUp } from "../../controllers/userController/user.js";
const router = express.Router();

router.post("/sigIn", sigIn);
router.post("/sigUp", sigUp);

export default router;
