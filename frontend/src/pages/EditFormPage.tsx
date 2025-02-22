import JobForm from "../components/Form";

export default function EditFormPage() {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
			<h1 className="text-3xl font-semibold mb-6">Edit Job Application</h1>
			<JobForm />
		</div>
	);
}
