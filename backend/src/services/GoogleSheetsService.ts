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

		/** ✅ Get sheet metadata - column headers & possible dropdown values */
		public async getSheetMetadata(): Promise<{ fields: any[] }> {
			try {
				// Fetch headers (first row)
				const headerResponse = await this.sheets.spreadsheets.values.get({
					spreadsheetId: this.spreadsheetId,
					range: "Ido!A1:Z1",
				});
	
				const headers = headerResponse.data.values?.[0] || [];
	
				// Fetch some sample data to detect dropdown values
				const dataResponse = await this.sheets.spreadsheets.values.get({
					spreadsheetId: this.spreadsheetId,
					range: "Ido!A2:Z50",
				});
	
				const rows = dataResponse.data.values || [];
	
				const fieldData = headers.map((header, index) => {
					const columnValues = rows.map(row => row[index]).filter(Boolean);
					const uniqueValues = [...new Set(columnValues)].slice(0, 10); // Limit options
	
					return {
						name: header,
						type: uniqueValues.length > 1 && uniqueValues.length < 10 ? "dropdown" : "text",
						options: uniqueValues.length > 1 && uniqueValues.length < 10 ? uniqueValues : undefined
					};
				});
	
				return { fields: fieldData };
			} catch (error) {
				throw new Error("Error retrieving sheet metadata: " + error);
			}
		}
	
		/** ✅ Append new row with dynamic form data */
		public async submitFormData(formData: Record<string, any>): Promise<void> {
			const values = Object.values(formData);
	
			await this.sheets.spreadsheets.values.append({
				spreadsheetId: this.spreadsheetId,
				range: "Ido!A:L",
				valueInputOption: "RAW",
				requestBody: { values: [values] },
			});
		}

	
}

export default GoogleSheetsService.getInstance();
