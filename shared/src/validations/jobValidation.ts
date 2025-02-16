import { z } from "zod";
import { ALLOWED_STATUS, ALLOWED_JOB_TITLES } from "../models/Job";

// Helper function for URL validation
const isValidURL = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};


const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/; // DD/MM/YYYY format

export const jobSchema = z.object({
  company: z.string().min(1, "Company name is required"),
  jobLink: z.string().url("Invalid job link URL"),
  jobPostDate: z.string().regex(dateRegex, "Job Post Date must be in DD/MM/YYYY format"),
  jobFoundDate: z.string().regex(dateRegex, "Job Found Date must be in DD/MM/YYYY format"),
  applicationDate: z.string().regex(dateRegex, "Application Date must be in DD/MM/YYYY format").optional(),
  status: z.enum(ALLOWED_STATUS),
  connectionName: z.string().min(1, "Connection name is required").optional(),
  connectionLinkedIn: z.string().url("Invalid connection LinkedIn URL").optional(),
  hiringManager: z.string().optional(),
  hiringManagerLinkedIn: z.string().url("Invalid Hiring Manager LinkedIn URL").optional(),
  jobTitle: z.enum(ALLOWED_JOB_TITLES),
});