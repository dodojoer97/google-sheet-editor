import { useState } from "react";

export default function JobForm() {
	const [job, setJob] = useState({
		title: "",
		company: "",
		jobLink: "",
		status: "Applied",
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		setJob({ ...job, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const response = await fetch("http://localhost:5000/jobs", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(job),
			});

			if (response.ok) {
				alert("Job added successfully!");
				setJob({ title: "", company: "", jobLink: "", status: "Applied" });
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
					name="title"
					placeholder="Job Title"
					className="border p-2 rounded"
					value={job.title}
					onChange={handleChange}
					required
				/>
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
				<select
					name="status"
					className="border p-2 rounded"
					value={job.status}
					onChange={handleChange}
				>
					<option value="Applied">Applied</option>
					<option value="Interview Scheduled">Interview Scheduled</option>
					<option value="Offer Received">Offer Received</option>
					<option value="Rejected">Rejected</option>
				</select>
				<button type="submit" className="bg-blue-500 text-white p-2 rounded">
					Submit Job
				</button>
			</form>
		</div>
	);
}
