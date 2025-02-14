import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import FirebaseAuthService from "./services/FirebaseAuthService";
import { User, onAuthStateChanged } from "firebase/auth";
import GoogleAuthButton from "./components/GoogleAuthButton";
import EditFormPage from "./pages/EditFormPage"; // Create this component

export default function App() {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		// Listen for authentication state changes
		const unsubscribe = onAuthStateChanged(
			FirebaseAuthService.getAuthInstance(),
			(authUser) => {
				setUser(authUser);
			}
		);
		return () => unsubscribe();
	}, []);

	return (
		<Router>
			<Routes>
				<Route path="/" element={<GoogleAuthButton />} />
				<Route path="/edit" element={user ? <EditFormPage /> : <Navigate to="/" />} />
			</Routes>
		</Router>
	);
}
