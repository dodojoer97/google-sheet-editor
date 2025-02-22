// functions/index.js
import * as functions from "firebase-functions";
import express from "express";
import cors from "cors";
import sheetsRoutes from "./routes/sheetsRoutes.js"; // ensure the ".js" if needed

const app = express();
app.use(cors());
app.use(express.json());
app.use("/sheets", sheetsRoutes);

// Export your function using ES Module syntax
export const api = functions.https.onRequest(app);
