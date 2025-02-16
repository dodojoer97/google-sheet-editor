import { useState } from "react";
import FirebaseAuthService from "../services/FirebaseAuthService";
import { Job, jobSchema, ALLOWED_STATUS, ALLOWED_JOB_TITLES } from "@shared"; // ✅ Import from shared

// Config
import config from "../config/endpoints"

export default function JobForm() {
  const [job, setJob] = useState<Partial<Job>>({
    company: "",
    jobLink: "",
    jobPostDate: "",
    jobFoundDate: "",
    applicationDate: "",
    status: "",
    connectionName: "",
    connectionLinkedIn: "",
    hiringManager: "",
    hiringManagerLinkedIn: "",
    jobTitle: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({}); // Reset errors

    // Validate before submitting
    const validationResult = jobSchema.safeParse(job);
    if (!validationResult.success) {
      // Format errors
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

      // Get Firebase Auth Token
      const token = await user.getIdToken();

      const response = await fetch(config.API_BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(job),
      });

      if (response.ok) {
        alert("Job added successfully!");
        setJob({
          company: "",
          jobLink: "",
          jobPostDate: "",
          jobFoundDate: "",
          applicationDate: "",
          status: "Applied",
          connectionName: "",
          connectionLinkedIn: "",
          hiringManager: "",
          hiringManagerLinkedIn: "",
          jobTitle: "",
        });
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

        <input
          type="text"
          name="company"
          placeholder="Company Name"
          className="border p-2 rounded"
          value={job.company}
          onChange={handleChange}
          required
        />
        {errors.company && <p className="text-red-500 text-sm">{errors.company}</p>}

        <input
          type="url"
          name="jobLink"
          placeholder="Job Link"
          className="border p-2 rounded"
          value={job.jobLink}
          onChange={handleChange}
          required
        />
        {errors.jobLink && <p className="text-red-500 text-sm">{errors.jobLink}</p>}

        <input
          type="date"
          name="jobPostDate"
          placeholder="Job Post Date"
          className="border p-2 rounded"
          value={job.jobPostDate}
          onChange={handleChange}
          required
        />
        {errors.jobPostDate && <p className="text-red-500 text-sm">{errors.jobPostDate}</p>}

        <input
          type="date"
          name="jobFoundDate"
          placeholder="Job Found Date"
          className="border p-2 rounded"
          value={job.jobFoundDate}
          onChange={handleChange}
          required
        />
        {errors.jobFoundDate && <p className="text-red-500 text-sm">{errors.jobFoundDate}</p>}

        <input
          type="date"
          name="applicationDate"
          placeholder="Application Date"
          className="border p-2 rounded"
          value={job.applicationDate}
          onChange={handleChange}
          required
        />
        {errors.applicationDate && <p className="text-red-500 text-sm">{errors.applicationDate}</p>}

        <select
          name="status"
          className="border p-2 rounded"
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
        {errors.status && <p className="text-red-500 text-sm">{errors.status}</p>}

        <input
          type="text"
          name="connectionName"
          placeholder="Connection Name"
          className="border p-2 rounded"
          value={job.connectionName}
          onChange={handleChange}
          required
        />
        {errors.connectionName && <p className="text-red-500 text-sm">{errors.connectionName}</p>}

        <input
          type="url"
          name="connectionLinkedIn"
          placeholder="Connection LinkedIn (Optional)"
          className="border p-2 rounded"
          value={job.connectionLinkedIn}
          onChange={handleChange}
        />
        {errors.connectionLinkedIn && <p className="text-red-500 text-sm">{errors.connectionLinkedIn}</p>}

        <input
          type="text"
          name="hiringManager"
          placeholder="Hiring Manager Name"
          className="border p-2 rounded"
          value={job.hiringManager}
          onChange={handleChange}
          required
        />
        {errors.hiringManager && <p className="text-red-500 text-sm">{errors.hiringManager}</p>}

        <input
          type="url"
          name="hiringManagerLinkedIn"
          placeholder="Hiring Manager LinkedIn (Optional)"
          className="border p-2 rounded"
          value={job.hiringManagerLinkedIn}
          onChange={handleChange}
        />
        {errors.hiringManagerLinkedIn && <p className="text-red-500 text-sm">{errors.hiringManagerLinkedIn}</p>}

        <select
          name="jobTitle"
          className="border p-2 rounded"
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
        {errors.jobTitle && <p className="text-red-500 text-sm">{errors.jobTitle}</p>}

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Submit Job
        </button>
      </form>
    </div>
  );
}
