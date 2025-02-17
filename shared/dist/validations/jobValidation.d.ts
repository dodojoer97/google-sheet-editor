import { z } from "zod";
export declare const jobSchema: z.ZodObject<{
    company: z.ZodString;
    jobLink: z.ZodString;
    jobPostDate: z.ZodString;
    jobFoundDate: z.ZodString;
    applicationDate: z.ZodOptional<z.ZodString>;
    status: z.ZodEnum<["Awaiting Dror’s Review", "Easy Apply + Connection Outreach on LinkedIn", "Referred via Dror", "Requested Referral by LinkedIn + Sent CV"]>;
    connectionName: z.ZodOptional<z.ZodString>;
    connectionLinkedIn: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, string | undefined>;
    hiringManager: z.ZodOptional<z.ZodString>;
    hiringManagerLinkedIn: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, string | undefined>;
    jobTitle: z.ZodEnum<["Full Stack", "Frontend", "Backend", "React dev (frontend)"]>;
}, "strip", z.ZodTypeAny, {
    company: string;
    jobLink: string;
    jobPostDate: string;
    jobFoundDate: string;
    status: "Awaiting Dror’s Review" | "Easy Apply + Connection Outreach on LinkedIn" | "Referred via Dror" | "Requested Referral by LinkedIn + Sent CV";
    jobTitle: "Full Stack" | "Frontend" | "Backend" | "React dev (frontend)";
    applicationDate?: string | undefined;
    connectionName?: string | undefined;
    connectionLinkedIn?: string | undefined;
    hiringManager?: string | undefined;
    hiringManagerLinkedIn?: string | undefined;
}, {
    company: string;
    jobLink: string;
    jobPostDate: string;
    jobFoundDate: string;
    status: "Awaiting Dror’s Review" | "Easy Apply + Connection Outreach on LinkedIn" | "Referred via Dror" | "Requested Referral by LinkedIn + Sent CV";
    jobTitle: "Full Stack" | "Frontend" | "Backend" | "React dev (frontend)";
    applicationDate?: string | undefined;
    connectionName?: string | undefined;
    connectionLinkedIn?: string | undefined;
    hiringManager?: string | undefined;
    hiringManagerLinkedIn?: string | undefined;
}>;
//# sourceMappingURL=jobValidation.d.ts.map