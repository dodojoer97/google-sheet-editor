import { google } from "googleapis";
import { Job } from "@shared/models/Job";
import { jobSchema } from "@shared/validations/jobValidation";
<<<<<<< HEAD:backend/src/services/GoogleSheetsService.ts
import * as dotenv from "dotenv";

// Load environment variables from .env
dotenv.config();
=======

import * as dotenv from "dotenv"
dotenv.config()
>>>>>>> parent of 48cb909 (add functions):functions/src/services/GoogleSheetsService.ts

class GoogleSheetsService {
	private static instance: GoogleSheetsService;
	private sheets;
	private spreadsheetId: string;

	private constructor() {
<<<<<<< HEAD:backend/src/services/GoogleSheetsService.ts
		// Load credentials from environment variables
		const serviceAccountString = process.env.GOOGLE_SERVICE_ACCOUNT;
		if (!serviceAccountString) {
			throw new Error(
				"Service account not found in environment variables. " +
					"Please set GOOGLE_SERVICE_ACCOUNT in your .env file."
			);
		}

		const serviceAccount = JSON.parse(serviceAccountString);

		this.spreadsheetId = process.env.SPREADSHEET_ID || "";
		if (!this.spreadsheetId) {
			throw new Error(
				"Spreadsheet ID not found in environment variables. " +
					"Please set SPREADSHEET_ID in your .env file."
			);
		}

=======
>>>>>>> parent of 48cb909 (add functions):functions/src/services/GoogleSheetsService.ts
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
		const requestBody = { values: [jobData.toArray()] }

		
		await this.sheets.spreadsheets.values.append({
			spreadsheetId: this.spreadsheetId,
			range: "Sheet1!A:L",
			valueInputOption: "RAW",
			requestBody
		});
	}
}

export default GoogleSheetsService.getInstance();
