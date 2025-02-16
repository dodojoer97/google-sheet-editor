import { google } from "googleapis";
import { Job } from "@shared/models/Job";
import { jobSchema } from "@shared/validations/jobValidation";

import * as dotenv from "dotenv";
dotenv.config();

class GoogleSheetsService {
	private static instance: GoogleSheetsService;
	private sheets;
	private spreadsheetId = process.env.GOOGLE_SHEET_ID!;

	private constructor() {
		const auth = new google.auth.GoogleAuth({
			credentials: require("../../service-account.json"),
			scopes: ["https://www.googleapis.com/auth/spreadsheets"],
		});

		this.sheets = google.sheets({ version: "v4", auth });
	}

	public static getInstance(): GoogleSheetsService {
		if (!GoogleSheetsService.instance) {
			GoogleSheetsService.instance = new GoogleSheetsService();
		}
		return GoogleSheetsService.instance;
	}

	public async appendRow(jobData: Job): Promise<void> {
		// Validate data before inserting into Google Sheets
		const validationResult = jobSchema.safeParse(jobData);
		if (!validationResult.success) {
			throw new Error("Validation failed: " + JSON.stringify(validationResult.error.format()));
		}

		await this.sheets.spreadsheets.values.append({
			spreadsheetId: this.spreadsheetId,
			range: "Sheet1!A:L",
			valueInputOption: "RAW",
			requestBody: { values: [jobData.toArray()] },
		});
	}
}

export default GoogleSheetsService.getInstance();
