import { Request, Response, NextFunction } from "express";
import FirebaseAuthService from "../services/FirebaseAuthService";

export const authenticateUser = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const token = req.headers.authorization?.split("Bearer ")[1];

		if (!token) {
			res.status(401).json({ error: "Unauthorized" });
			return;
		}

		const decodedToken = await FirebaseAuthService.verifyToken(token);
		if (!decodedToken) {
			res.status(403).json({ error: "Invalid token" });
			return;
		}

		// @ts-ignore
		req.user = decodedToken; // Attach user info to the request object
		next();
	} catch (error) {
		console.error("Auth Middleware Error:", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
};
