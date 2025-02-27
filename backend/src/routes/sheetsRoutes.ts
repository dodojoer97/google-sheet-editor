import express from "express";
import SheetsController from "../controllers/SheetsController";
import { authenticateUser } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/add-job", authenticateUser, SheetsController.addJob);
router.get("/metadata", authenticateUser, SheetsController.getMetadata);
router.post("/submit-form", authenticateUser, SheetsController.submitForm);

export default router;
