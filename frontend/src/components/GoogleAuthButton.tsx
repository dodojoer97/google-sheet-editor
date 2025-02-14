import { useState } from "react";
import FirebaseAuthService from "../services/FirebaseAuthService";
import { User } from "firebase/auth";

export default function GoogleAuthButton() {
	const [user, setUser] = useState<User | null>(null);

	const handleSignIn = async () => {
		const user = await FirebaseAuthService.signInWithGoogle();
		if (user) setUser(user);
	};

	const handleSignOut = async () => {
		await FirebaseAuthService.signOutUser();
		setUser(null);
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
