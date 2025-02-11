import express from "express";
import SheetsController from "../controllers/SheetsController";
import { authenticateUser } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/add-job", authenticateUser, SheetsController.addJob);

export default router;
