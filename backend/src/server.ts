import express from "express";
import cors from "cors";
import sheetsRoutes from "./routes/sheetsRoutes";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/sheets", sheetsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
