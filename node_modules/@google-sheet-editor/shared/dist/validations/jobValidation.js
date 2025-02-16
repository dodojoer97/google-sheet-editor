"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobSchema = void 0;
var zod_1 = require("zod");
var Job_1 = require("../models/Job");
// Helper function for URL validation
var isValidURL = function (url) {
    try {
        new URL(url);
        return true;
    }
    catch (_a) {
        return false;
    }
};
// Job Schema using Zod
exports.jobSchema = zod_1.z.object({
    company: zod_1.z.string().min(1, "Company name is required"),
    jobLink: zod_1.z.string().url("Invalid job link URL"),
    jobPostDate: zod_1.z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Job Post Date must be in YYYY-MM-DD format"),
    jobFoundDate: zod_1.z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Job Found Date must be in YYYY-MM-DD format"),
    applicationDate: zod_1.z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Application Date must be in YYYY-MM-DD format"),
    status: zod_1.z.enum(Job_1.ALLOWED_STATUS),
    connectionName: zod_1.z.string().min(1, "Connection name is required"),
    connectionLinkedIn: zod_1.z.string().optional().refine(function (val) { return !val || isValidURL(val); }, {
        message: "Invalid connection LinkedIn URL",
    }),
    hiringManager: zod_1.z.string().min(1, "Hiring Manager name is required"),
    hiringManagerLinkedIn: zod_1.z.string().optional().refine(function (val) { return !val || isValidURL(val); }, {
        message: "Invalid Hiring Manager LinkedIn URL",
    }),
    jobTitle: zod_1.z.enum(Job_1.ALLOWED_JOB_TITLES),
});
