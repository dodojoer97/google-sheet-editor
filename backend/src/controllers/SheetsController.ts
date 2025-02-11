import { Request, Response } from "express";
import GoogleSheetsService from "../services/GoogleSheetsService";

class SheetsController {
	public static async addJob(req: Request, res: Response): Promise<void> {
		try {
			const { title, company, jobLink, status } = req.body;
			if (!title || !company || !jobLink || !status) {
				res.status(400).json({ error: "Missing required fields" });
				return;
			}

			await GoogleSheetsService.appendRow([
				title,
				company,
				jobLink,
				status,
				new Date().toISOString(),
			]);

			res.status(201).json({ message: "Job added successfully" });
		} catch (error) {
			console.error("Error in SheetsController:", error);
			res.status(500).json({ error: "Internal Server Error" });
		}
	}
}

export default SheetsController;
