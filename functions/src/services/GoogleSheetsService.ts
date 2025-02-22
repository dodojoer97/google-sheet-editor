import { google } from "googleapis";
import { Job } from "@shared/models/Job";
import { jobSchema } from "@shared/validations/jobValidation";
import * as dotenv from "dotenv";
import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

dotenv.config();

class GoogleSheetsService {
	private static instance: GoogleSheetsService;
	private sheets;
	private spreadsheetId = process.env.GOOGLE_SHEET_ID!;

	private constructor() {
		// ✅ Use Firebase Service Account JSON for authentication
		const serviceAccount = JSON.parse(functions.config().google.service_account);

		const auth = new google.auth.GoogleAuth({
			credentials: serviceAccount,
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
		// ✅ Validate data before inserting into Google Sheets
		const validationResult = jobSchema.safeParse(jobData);
		if (!validationResult.success) {
			throw new Error(
				"Validation failed: " + JSON.stringify(validationResult.error.format())
			);
		}

		const requestBody = { values: [jobData.toArray()] };

		await this.sheets.spreadsheets.values.append({
			spreadsheetId: this.spreadsheetId,
			range: "Sheet1!A:L",
			valueInputOption: "RAW",
			requestBody,
		});
	}
}

export default GoogleSheetsService.getInstance();
