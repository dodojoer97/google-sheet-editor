import { useState } from "react";
import FirebaseAuthService from "../services/FirebaseAuthService";
import { Job, jobSchema, ALLOWED_STATUS } from "@shared"; // ✅ Import from shared

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

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		setJob({ ...job, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			const user = FirebaseAuthService.getAuthInstance().currentUser;
			if (!user) {
				alert("You must be signed in to submit a job.");
				return;
			}

			// Validate before sending to backend
			const validationResult = jobSchema.safeParse(job);
			if (!validationResult.success) {
				alert("Validation failed: " + JSON.stringify(validationResult.error.format()));
				return;
			}

			// Get Firebase Auth Token
			const token = await user.getIdToken();

			const response = await fetch("http://localhost:5000/sheets/add-job", {
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
			} else {
				alert("Error submitting the job");
			}
		} catch (error) {
			console.error("Error:", error);
			alert("Server is not responding.");
		}
	};

	return (
		<div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
			<h2 className="text-2xl font-semibold text-center mb-4">Job Tracker</h2>
			<form onSubmit={handleSubmit} className="flex flex-col gap-4">
				<input
					type="text"
					name="company"
					placeholder="Company Name"
					className="border p-2 rounded"
					value={job.company}
					onChange={handleChange}
					required
				/>
				<input
					type="url"
					name="jobLink"
					placeholder="Job Link"
					className="border p-2 rounded"
					value={job.jobLink}
					onChange={handleChange}
					required
				/>
				<input
					type="date"
					name="jobPostDate"
					placeholder="Job Post Date"
					className="border p-2 rounded"
					value={job.jobPostDate}
					onChange={handleChange}
					required
				/>
				<input
					type="date"
					name="jobFoundDate"
					placeholder="Job Found Date"
					className="border p-2 rounded"
					value={job.jobFoundDate}
					onChange={handleChange}
					required
				/>
				<input
					type="date"
					name="applicationDate"
					placeholder="Application Date"
					className="border p-2 rounded"
					value={job.applicationDate}
					onChange={handleChange}
					required
				/>
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
				<button type="submit" className="bg-blue-500 text-white p-2 rounded">
					Submit Job
				</button>
			</form>
		</div>
	);
}
