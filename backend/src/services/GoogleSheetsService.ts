import { google } from "googleapis"
import { Job } from "@shared/models/Job"
import { jobSchema } from "@shared/validations/jobValidation"

import * as dotenv from "dotenv"
dotenv.config()

class GoogleSheetsService {
	private static instance: GoogleSheetsService
	private sheets
	private spreadsheetId

	private constructor() {
		// Load credentials from environment variables
		const serviceAccountString = process.env.GOOGLE_SERVICE_ACCOUNT
		if (!serviceAccountString) {
			throw new Error(
				"Service account not found in environment variables. " +
					"Please set GOOGLE_SERVICE_ACCOUNT in your .env file."
			)
		}

		const serviceAccount = JSON.parse(serviceAccountString)

		const auth = new google.auth.GoogleAuth({
			credentials: serviceAccount,
			scopes: ["https://www.googleapis.com/auth/spreadsheets"],
		})

		this.sheets = google.sheets({ version: "v4", auth })

		this.spreadsheetId = process.env.GOOGLE_SHEET_ID || ""
		if (!this.spreadsheetId) {
			throw new Error(
				"Spreadsheet ID not found in environment variables. " +
					"Please set SPREADSHEET_ID in your .env file."
			)
		}
	}

	public static getInstance(): GoogleSheetsService {
		if (!GoogleSheetsService.instance) {
			GoogleSheetsService.instance = new GoogleSheetsService()
		}
		return GoogleSheetsService.instance
	}

	public async appendRow(jobData: Job): Promise<void> {
		// Validate data before inserting into Google Sheets
		const validationResult = jobSchema.safeParse(jobData)
		if (!validationResult.success) {
			throw new Error(
				"Validation failed: " + JSON.stringify(validationResult.error.format())
			)
		}
		const requestBody = { values: [jobData.toArray()] }

		await this.sheets.spreadsheets.values.append({
			spreadsheetId: this.spreadsheetId,
			range: "Ido!A:L",
			valueInputOption: "RAW",
			requestBody,
		})
	}

	public async getSheetMetadata(): Promise<{ fields: any[] }> {
		try {
			// ✅ Step 1: Fetch headers (first row)
			const headerResponse = await this.sheets.spreadsheets.values.get({
				spreadsheetId: this.spreadsheetId,
				range: "Ido!A1:Z1",
			})

			const headers = headerResponse.data.values?.[0] || []

			// ✅ Step 2: Fetch Named Ranges
			const namedRangesResponse = await this.sheets.spreadsheets.get({
				spreadsheetId: this.spreadsheetId,
				fields: "namedRanges",
			})

			const namedRanges = namedRangesResponse.data.namedRanges || []

			// ✅ Step 3: Fetch possible dropdown options from Named Ranges
			const dropdownOptions: Record<string, string[]> = {}

			for (const namedRange of namedRanges) {
				const name = namedRange.name
				if (!name) continue // ✅ Skip if name is undefined

				try {
					// Fetch dropdown options from the Named Range
					const rangeData = await this.sheets.spreadsheets.values.get({
						spreadsheetId: this.spreadsheetId,
						range: `${namedRange.name}`, // ✅ Use Named Range directly
					})
					const values = rangeData.data.values?.flat()

					if (!dropdownOptions[name]) {
						dropdownOptions[name] = values || []
					}
				} catch (error) {
					console.error(`Failed to fetch Named Range ${name}:`, error)
					throw error
				}
			}

			// ✅ Step 4: Parse metadata & check if a header is a Named Range
			const fieldData = headers.map((header) => {
				if (dropdownOptions[header]) {
					return {
						name: header,
						type: "dropdown",
						options: dropdownOptions[header],
					}
				}
				return { name: header, type: "text" }
			})

			return { fields: fieldData }
		} catch (error) {
			throw new Error("Error retrieving sheet metadata: " + error)
		}
	}

	/** ✅ Append new row with dynamic form data */
	public async submitFormData(formData: Record<string, any>): Promise<void> {
		const values = Object.values(formData)

		await this.sheets.spreadsheets.values.append({
			spreadsheetId: this.spreadsheetId,
			range: "Ido!A:L",
			valueInputOption: "RAW",
			requestBody: { values: [values] },
		})
	}
}

export default GoogleSheetsService.getInstance()
