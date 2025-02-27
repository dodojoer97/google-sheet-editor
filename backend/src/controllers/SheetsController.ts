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

	/** ✅ Fetch sheet metadata (fields & dropdown options) */
	public static async getMetadata(req: Request, res: Response): Promise<void> {
		try {
			const metadata = await GoogleSheetsService.getSheetMetadata();
			res.json(metadata);
		} catch (error) {
			console.error("Error retrieving metadata:", error);
			res.status(500).json({ error: "Failed to fetch sheet metadata" });
		}
	}

	/** ✅ Submit form data dynamically */
	public static async submitForm(req: Request, res: Response): Promise<void> {
		try {
			const formData = req.body;
			await GoogleSheetsService.submitFormData(formData);
			res.status(201).json({ message: "Data submitted successfully" });
		} catch (error) {
			console.error("Error submitting form data:", error);
			res.status(500).json({ error: "Failed to submit form data" });
		}
	}
}

export default SheetsController;
