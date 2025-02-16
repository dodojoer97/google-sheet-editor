"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Job = exports.ALLOWED_JOB_TITLES = exports.ALLOWED_STATUS = void 0;
// Define allowed dropdown values
exports.ALLOWED_STATUS = [
    "Awaiting Dror’s Review",
    "Easy Apply + Connection Outreach on LinkedIn",
    "Referred via Dror",
    "Requested Referral by LinkedIn + Sent CV",
];
exports.ALLOWED_JOB_TITLES = ["Full Stack", "Frontend", "Backend", "React dev (frontend)"];
var Job = /** @class */ (function () {
    function Job(data) {
        this.company = data.company;
        this.jobLink = data.jobLink;
        this.jobPostDate = data.jobPostDate;
        this.jobFoundDate = data.jobFoundDate;
        this.applicationDate = data.applicationDate;
        this.status = data.status;
        this.connectionName = data.connectionName;
        this.connectionLinkedIn = data.connectionLinkedIn;
        this.hiringManager = data.hiringManager;
        this.hiringManagerLinkedIn = data.hiringManagerLinkedIn;
        this.jobTitle = data.jobTitle;
    }
    // Convert to array (used for Google Sheets insertion)
    Job.prototype.toArray = function () {
        return [
            this.company,
            "",
            this.jobLink,
            this.jobPostDate,
            this.jobFoundDate,
            this.applicationDate,
            this.status,
            this.connectionName,
            this.connectionLinkedIn || "",
            this.hiringManager,
            this.hiringManagerLinkedIn || "",
            this.jobTitle, // Column: Job Title (Dropdown)
        ];
    };
    return Job;
}());
exports.Job = Job;
