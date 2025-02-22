import express from "express";
import cors from "cors";
import sheetsRoutes from "./routes/sheetsRoutes"; // Ensure the ".js" extension if using ES modules

const app = express();
app.use(cors());
app.use(express.json());
app.use("/sheets", sheetsRoutes);

// Choose a port, typically from an environment variable
const PORT = process.env.PORT || 3000;

// Start the Express server
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
