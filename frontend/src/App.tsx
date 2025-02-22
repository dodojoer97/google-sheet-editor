import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GoogleAuthButton from "./components/GoogleAuthButton";
import EditFormPage from "./pages/EditFormPage";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<GoogleAuthButton />} />
				<Route element={<ProtectedRoute />}>
					<Route path="/edit" element={<EditFormPage />} />
				</Route>
			</Routes>
		</Router>
	);
}
