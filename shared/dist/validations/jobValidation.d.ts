import { z } from "zod";
export declare const jobSchema: z.ZodObject<{
    company: z.ZodString;
    jobLink: z.ZodString;
    jobPostDate: z.ZodString;
    jobFoundDate: z.ZodString;
    applicationDate: z.ZodEffects<z.ZodEffects<z.ZodOptional<z.ZodString>, string, string | undefined>, string, string | undefined>;
    status: z.ZodEnum<["Awaiting Dror’s Review", "Easy Apply + Connection Outreach on LinkedIn", "Referred via Dror", "Requested Referral by LinkedIn + Sent CV"]>;
    connectionName: z.ZodEffects<z.ZodOptional<z.ZodString>, string, string | undefined>;
    connectionLinkedIn: z.ZodEffects<z.ZodEffects<z.ZodOptional<z.ZodString>, string, string | undefined>, string, string | undefined>;
    hiringManager: z.ZodEffects<z.ZodOptional<z.ZodString>, string, string | undefined>;
    hiringManagerLinkedIn: z.ZodEffects<z.ZodEffects<z.ZodOptional<z.ZodString>, string, string | undefined>, string, string | undefined>;
    jobTitle: z.ZodEnum<["Full Stack", "Frontend", "Backend", "React dev (frontend)"]>;
}, "strip", z.ZodTypeAny, {
    company: string;
    jobLink: string;
    jobPostDate: string;
    jobFoundDate: string;
    applicationDate: string;
    status: "Awaiting Dror’s Review" | "Easy Apply + Connection Outreach on LinkedIn" | "Referred via Dror" | "Requested Referral by LinkedIn + Sent CV";
    connectionName: string;
    connectionLinkedIn: string;
    hiringManager: string;
    hiringManagerLinkedIn: string;
    jobTitle: "Full Stack" | "Frontend" | "Backend" | "React dev (frontend)";
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