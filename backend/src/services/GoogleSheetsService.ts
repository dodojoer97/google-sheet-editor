import { google } from "googleapis";
import * as dotenv from "dotenv";
import { jobSchema } from "../validations/validation"; // Import Zod validation schema
import { Job } from "../models/Job"; // Import Job model

dotenv.config();

console.log("process.env.GOOGLE_SHEET_ID: ", process.env.GOOGLE_SHEET_ID);

class GoogleSheetsService {
	private static instance: GoogleSheetsService;
	private sheets;
	private spreadsheetId: string = process.env.GOOGLE_SHEET_ID!;

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

	/**
	 * Validates job data and appends a row to Google Sheets.
	 * @param jobData - The job data object to validate and insert.
	 * @throws Error if validation fails or Google Sheets API fails.
	 */
	public async appendRow(jobData: Job): Promise<void> {
		try {
			// Validate job data using Zod
			const validationResult = jobSchema.safeParse(jobData);
			if (!validationResult.success) {
				console.error("Validation failed:", validationResult.error.format());
				throw new Error(`Validation failed: ${JSON.stringify(validationResult.error.format())}`);
			}

			console.log("Appending data to Google Sheets:", jobData);
			await this.sheets.spreadsheets.values.append({
				spreadsheetId: this.spreadsheetId,
				range: "Sheet1!A:L", // Ensure the correct range based on Google Sheets columns
				valueInputOption: "RAW",
				requestBody: { values: [jobData.toArray()] }, // Convert Job object to an array
			});
		} catch (error) {
			console.error("Error appending row to Google Sheet:", error);
			throw error;
		}
	}
}

export default GoogleSheetsService.getInstance();
