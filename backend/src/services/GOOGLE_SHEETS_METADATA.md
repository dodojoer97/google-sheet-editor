# Google Sheets Metadata Endpoint

## Overview

The `getSheetMetadata` method in the `GoogleSheetsService` class retrieves metadata from a Google Sheet, including column headers and possible dropdown options (Named Ranges). This method is useful for dynamically generating forms based on spreadsheet structure.

## How It Works

The `getSheetMetadata` method follows these steps:

1. **Fetch Column Headers**: The first row (A1:Z1) of the sheet is retrieved to determine the field names.
2. **Retrieve Named Ranges**: Named Ranges are fetched from the sheet to check for dropdown fields.
3. **Extract Dropdown Options**: If a Named Range matches a column header, its values are extracted to define available options for that field.
4. **Construct Field Metadata**: Each column header is assigned a type:
   - If it has a matching Named Range, it is classified as a `dropdown` with predefined options.
   - Otherwise, it is treated as a `text` field.

## Important Requirement

For the metadata retrieval to correctly associate dropdown options with fields, **Named Ranges must have the same name as the corresponding column header**.

### Example

#### Spreadsheet Structure:

| **Job Title** | **Department** |
| ------------- | -------------- |
| Engineer      | IT             |
| Designer      | Marketing      |

#### Named Ranges:

- `Job Title` → Contains a predefined list of job titles (e.g., `Engineer`, `Designer`, `Manager`).
- `Department` → Contains department names (e.g., `IT`, `Marketing`, `HR`).

#### Metadata Output:

```json
{
	"fields": [
		{
			"name": "Job Title",
			"type": "dropdown",
			"options": ["Engineer", "Designer", "Manager"]
		},
		{
			"name": "Department",
			"type": "dropdown",
			"options": ["IT", "Marketing", "HR"]
		}
	]
}
```

## Error Handling

If a Named Range exists but is not accessible, an error is logged, and the process continues for other fields.

## Usage Example

To retrieve metadata:

```typescript
const metadata = await GoogleSheetsService.getSheetMetadata()
console.log(metadata)
```

## Summary

- Column headers define field names.
- Named Ranges **must** match column headers for dropdowns to work.
- Fields without a Named Range are treated as text fields.
- The metadata endpoint enables dynamic form generation based on spreadsheet structure.
