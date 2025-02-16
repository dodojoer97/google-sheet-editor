// Define allowed dropdown values
export const ALLOWED_STATUS = [
    "Awaiting Dror’s Review",
    "Easy Apply + Connection Outreach on LinkedIn",
    "Referred via Dror",
    "Requested Referral by LinkedIn + Sent CV",
];
export const ALLOWED_JOB_TITLES = ["Full Stack", "Frontend", "Backend", "React dev (frontend)"];
export class Job {
    constructor(data) {
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
    toArray() {
        return [
            this.company, // Column: Company Name
            "", // Column: Dror's comments (skipped)
            this.jobLink, // Column: Job Link
            this.jobPostDate, // Column: Job Post Date
            this.jobFoundDate, // Column: Job Found Date
            this.applicationDate, // Column: Application Date
            this.status, // Column: Status (Dropdown)
            this.connectionName, // Column: Connection Name
            this.connectionLinkedIn || "", // Column: Connection LinkedIn
            this.hiringManager, // Column: Hiring Manager Name
            this.hiringManagerLinkedIn || "", // Column: Hiring Manager LinkedIn
            this.jobTitle, // Column: Job Title (Dropdown)
        ];
    }
}
