// src/index.ts
import express from "express";
import bodyParser from "body-parser";
import userRoutes from "./routes/authRoutes";
import expenseRoutes from "./routes/expenseRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import cors from "cors";

// CORS options
const corsOptions = {
	origin: process.env.CORS_ORIGIN || "http://localhost:5173", // Updated CORS origin
};

const app = express();

app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(userRoutes);
app.use(expenseRoutes);
app.use(categoryRoutes);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
