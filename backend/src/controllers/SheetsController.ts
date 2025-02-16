import { Request, Response } from "express";
import GoogleSheetsService from "../services/GoogleSheetsService";
import { Job } from "@shared/models/Job";

class SheetsController {
	public static async addJob(req: Request, res: Response): Promise<void> {
		try {
			// ✅ Create a new Job instance
			const job = new Job(req.body);

			// ✅ Delegate validation & insertion to GoogleSheetsService
			await GoogleSheetsService.appendRow(job);

			res.status(201).json({ message: "Job added successfully" });
		} catch (error) {
			console.error("Error in SheetsController:", error);

			// ✅ Check if it's a validation error from GoogleSheetsService
			if (error instanceof Error && error.message.startsWith("Validation failed:")) {
				res.status(400).json({ error: "Invalid job data", details: error.message });
			} else {
				res.status(500).json({ error: "Internal Server Error" });
			}
		}
	}
}

export default SheetsController;
