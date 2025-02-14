import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import FirebaseAuthService from "../services/FirebaseAuthService";
import { User, onAuthStateChanged } from "firebase/auth";

export default function ProtectedRoute() {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(
			FirebaseAuthService.getAuthInstance(),
			(authUser) => {
				setUser(authUser);
				setLoading(false);
			}
		);
		return () => unsubscribe();
	}, []);

	if (loading) {
		return <div className="text-center mt-10 text-xl">Loading...</div>;
	}

	return user ? <Outlet /> : <Navigate to="/" />;
}
