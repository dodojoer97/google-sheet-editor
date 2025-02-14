import { google } from "googleapis";
import * as dotenv from "dotenv";

dotenv.config();

console.log("process.env.GOOGLE_SHEET_ID; ", process.env.GOOGLE_SHEET_ID);

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

	public async appendRow(rowData: string[]): Promise<void> {
		try {
			console.log("this.spreadsheetId: ", this.spreadsheetId);
			await this.sheets.spreadsheets.values.append({
				spreadsheetId: this.spreadsheetId,
				range: "Sheet1!A:E",
				valueInputOption: "RAW",
				requestBody: { values: [rowData] },
			});
		} catch (error) {
			console.error("Error appending row to Google Sheet:", error);
			throw error;
		}
	}
}

export default GoogleSheetsService.getInstance();
