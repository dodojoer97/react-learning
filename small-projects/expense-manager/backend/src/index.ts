// src/index.ts
import express from "express";
import bodyParser from "body-parser";
import userRoutes from "./routes/authRoutes";
import recordRoutes from "./routes/transactionRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import cors from "cors";

// CORS options
const corsOptions = {
	origin: "*", // Updated CORS origin
};

const app = express();

app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(userRoutes);
app.use(recordRoutes);
app.use(categoryRoutes);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
