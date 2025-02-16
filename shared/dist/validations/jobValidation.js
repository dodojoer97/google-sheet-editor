import { z } from "zod";
import { ALLOWED_STATUS, ALLOWED_JOB_TITLES } from "../models/Job";
// Helper function for URL validation
const isValidURL = (url) => {
    if (!url || url.trim() === "")
        return true; // Allow empty values
    try {
        new URL(url);
        return true;
    }
    catch {
        return false;
    }
};
// Regex for DD/MM/YYYY date format
const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
export const jobSchema = z.object({
    company: z.string().min(1, "Company name is required"),
    jobLink: z.string().url("Invalid job link URL"),
    jobPostDate: z.string().regex(dateRegex, "Job Post Date must be in DD/MM/YYYY format"),
    jobFoundDate: z.string().regex(dateRegex, "Job Found Date must be in DD/MM/YYYY format"),
    applicationDate: z
        .string()
        .optional()
        .transform((val) => val ?? "") // Ensure empty string if undefined
        .refine((val) => val === "" || dateRegex.test(val), {
        message: "Application Date must be in DD/MM/YYYY format",
    }),
    status: z.enum(ALLOWED_STATUS),
    connectionName: z.string().optional().transform((val) => val ?? ""), // Allow empty string instead of undefined
    connectionLinkedIn: z
        .string()
        .optional()
        .transform((val) => val ?? "")
        .refine(isValidURL, {
        message: "Invalid connection LinkedIn URL",
    }),
    hiringManager: z.string().optional().transform((val) => val ?? ""),
    hiringManagerLinkedIn: z
        .string()
        .optional()
        .transform((val) => val ?? "")
        .refine(isValidURL, {
        message: "Invalid Hiring Manager LinkedIn URL",
    }),
    jobTitle: z.enum(ALLOWED_JOB_TITLES),
});
