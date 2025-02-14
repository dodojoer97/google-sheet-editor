import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FirebaseAuthService from "../services/FirebaseAuthService";
import { User, onAuthStateChanged } from "firebase/auth";

export default function GoogleAuthButton() {
	const [user, setUser] = useState<User | null>(null);
	const navigate = useNavigate();

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(
			FirebaseAuthService.getAuthInstance(),
			(authUser) => {
				setUser(authUser);
				if (authUser) navigate("/edit");
			}
		);
		return () => unsubscribe();
	}, [navigate]);

	const handleSignIn = async () => {
		const signedInUser = await FirebaseAuthService.signInWithGoogle();
		if (signedInUser) {
			setUser(signedInUser);
			navigate("/edit");
		}
	};

	const handleSignOut = async () => {
		await FirebaseAuthService.signOutUser();
		setUser(null);
		navigate("/");
	};

	return (
		<div className="flex flex-col items-center gap-4">
			{user ? (
				<div>
					<img
						src={user.photoURL || ""}
						alt="Profile"
						className="w-10 h-10 rounded-full"
					/>
					<p>Welcome, {user.displayName}!</p>
					<button
						onClick={handleSignOut}
						className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
					>
						Sign Out
					</button>
				</div>
			) : (
				<button
					onClick={handleSignIn}
					className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
				>
					Sign in with Google
				</button>
			)}
		</div>
	);
}
