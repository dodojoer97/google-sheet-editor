export declare const ALLOWED_STATUS: readonly ["Awaiting Dror’s Review", "Easy Apply + Connection Outreach on LinkedIn", "Referred via Dror", "Requested Referral by LinkedIn + Sent CV"];
export declare const ALLOWED_JOB_TITLES: readonly ["Full Stack", "Frontend", "Backend", "React dev (frontend)"];
export declare class Job {
    company: string;
    jobLink: string;
    jobPostDate: string;
    jobFoundDate: string;
    applicationDate: string;
    status: string;
    connectionName: string;
    connectionLinkedIn?: string;
    hiringManager: string;
    hiringManagerLinkedIn?: string;
    jobTitle: string;
    constructor(data: Job);
    toArray(): string[];
}
//# sourceMappingURL=Job.d.ts.map