import { google } from "googleapis";
import { Job } from "@shared/models/Job";
import { jobSchema } from "@shared/validations/jobValidation";

import * as dotenv from "dotenv";
dotenv.config();

class GoogleSheetsService {
	private static instance: GoogleSheetsService;
	private sheets;
	private spreadsheetId;

	private constructor() {
		// Load credentials from environment variables
		const serviceAccountString = process.env.GOOGLE_SERVICE_ACCOUNT;
		if (!serviceAccountString) {
			throw new Error(
				"Service account not found in environment variables. " +
					"Please set GOOGLE_SERVICE_ACCOUNT in your .env file."
			);
		}

		const serviceAccount = JSON.parse(serviceAccountString);

		const auth = new google.auth.GoogleAuth({
			credentials: serviceAccount,
			scopes: ["https://www.googleapis.com/auth/spreadsheets"],
		});

		this.sheets = google.sheets({ version: "v4", auth });

		this.spreadsheetId = process.env.GOOGLE_SHEET_ID || "";
		if (!this.spreadsheetId) {
			throw new Error(
				"Spreadsheet ID not found in environment variables. " +
					"Please set SPREADSHEET_ID in your .env file."
			);
		}
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
			throw new Error(
				"Validation failed: " + JSON.stringify(validationResult.error.format())
			);
		}
		const requestBody = { values: [jobData.toArray()] };

		await this.sheets.spreadsheets.values.append({
			spreadsheetId: this.spreadsheetId,
			range: "Ido!A:L",
			valueInputOption: "RAW",
			requestBody,
		});
	}
}

export default GoogleSheetsService.getInstance();
