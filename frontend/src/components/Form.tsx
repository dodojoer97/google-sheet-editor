import { useState } from "react";
import FirebaseAuthService from "../services/FirebaseAuthService";
import { Job, jobSchema, ALLOWED_STATUS, ALLOWED_JOB_TITLES } from "@shared";
import config from "../config/endpoints";

/**
 * Convert YYYY-MM-DD (date input format) to DD/MM/YYYY.
 */
const convertToDDMMYYYY = (date: string) => {
  if (!date) return "";
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
};

/**
 * Convert DD/MM/YYYY back to YYYY-MM-DD (for input value).
 */
const convertToYYYYMMDD = (date: string) => {
  if (!date) return "";
  const [day, month, year] = date.split("/");
  return `${year}-${month}-${day}`;
};

export default function JobForm() {
  const [job, setJob] = useState<Partial<Job>>({
    company: "",
    jobLink: "",
    jobPostDate: "",
    jobFoundDate: "",
    applicationDate: "",
    status: ALLOWED_STATUS[0],
    connectionName: "",
    connectionLinkedIn: "",
    hiringManager: "",
    hiringManagerLinkedIn: "",
    jobTitle: ALLOWED_JOB_TITLES[0],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setJob((prev) => ({
      ...prev,
      [name]: name.includes("Date") ? convertToDDMMYYYY(value) : value, // Convert only date fields
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting...");
    setErrors({});

    const validationResult = jobSchema.safeParse(job);
    if (!validationResult.success) {
      const errorMessages: Record<string, string> = {};
      validationResult.error.errors.forEach((error) => {
        if (error.path.length) {
          errorMessages[error.path[0]] = error.message;
        }
      });
      setErrors(errorMessages);
      return;
    }

    try {
      const user = FirebaseAuthService.getAuthInstance().currentUser;
      if (!user) {
        setErrors({ auth: "You must be signed in to submit a job." });
        return;
      }

      const token = await user.getIdToken();
      const response = await fetch(`${config.API_BASE_URL}/add-job`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(job), // Send in DD/MM/YYYY format
      });

      if (response.ok) {
        alert("Job added successfully!");
        setErrors({});
      } else {
        setErrors({ server: "Error submitting the job. Please try again later." });
      }
    } catch (error) {
      console.error("Error:", error);
      setErrors({ server: "Server is not responding." });
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-semibold text-center mb-4">Job Tracker</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {errors.auth && <p className="text-red-500">{errors.auth}</p>}
        {errors.server && <p className="text-red-500">{errors.server}</p>}

        <label className="font-medium">
          Company Name
          <input
            type="text"
            name="company"
            className="border p-2 rounded w-full"
            value={job.company}
            onChange={handleChange}
            required
          />
        </label>
        {errors.company && <p className="text-red-500 text-sm">{errors.company}</p>}

        <label className="font-medium">
          Job Link
          <input
            type="url"
            name="jobLink"
            className="border p-2 rounded w-full"
            value={job.jobLink}
            onChange={handleChange}
            required
          />
        </label>
        {errors.jobLink && <p className="text-red-500 text-sm">{errors.jobLink}</p>}

        <label className="font-medium">
          Job Post Date
          <input
            type="date"
            name="jobPostDate"
            className="border p-2 rounded w-full"
            value={convertToYYYYMMDD(job.jobPostDate || "")}
            onChange={handleChange}
            required
          />
        </label>

        <label className="font-medium">
          Job Found Date
          <input
            type="date"
            name="jobFoundDate"
            className="border p-2 rounded w-full"
            value={convertToYYYYMMDD(job.jobFoundDate || "")}
            onChange={handleChange}
            required
          />
        </label>

        <label className="font-medium">
          Application Date
          <input
            type="date"
            name="applicationDate"
            className="border p-2 rounded w-full"
            value={convertToYYYYMMDD(job.applicationDate || "")}
            onChange={handleChange}
          />
        </label>

        <label className="font-medium">
          Status
          <select
            name="status"
            className="border p-2 rounded w-full"
            value={job.status}
            onChange={handleChange}
            required
          >
            {ALLOWED_STATUS.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>

        <label className="font-medium">
          Connection Name (Optional)
          <input
            type="text"
            name="connectionName"
            className="border p-2 rounded w-full"
            value={job.connectionName}
            onChange={handleChange}
          />
        </label>

        <label className="font-medium">
          Connection LinkedIn (Optional)
          <input
            type="url"
            name="connectionLinkedIn"
            className="border p-2 rounded w-full"
            value={job.connectionLinkedIn}
            onChange={handleChange}
          />
        </label>

        <label className="font-medium">
          Hiring Manager Name (Optional)
          <input
            type="text"
            name="hiringManager"
            className="border p-2 rounded w-full"
            value={job.hiringManager}
            onChange={handleChange}
          />
        </label>

        <label className="font-medium">
          Hiring Manager LinkedIn (Optional)
          <input
            type="url"
            name="hiringManagerLinkedIn"
            className="border p-2 rounded w-full"
            value={job.hiringManagerLinkedIn}
            onChange={handleChange}
          />
        </label>

        <label className="font-medium">
          Job Title
          <select
            name="jobTitle"
            className="border p-2 rounded w-full"
            value={job.jobTitle}
            onChange={handleChange}
            required
          >
            {ALLOWED_JOB_TITLES.map((title) => (
              <option key={title} value={title}>
                {title}
              </option>
            ))}
          </select>
        </label>

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Submit Job
        </button>
      </form>
    </div>
  );
}
