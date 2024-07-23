// src/index.ts
import express from "express";
import bodyParser from "body-parser";
import userRoutes from "./routes/userRoutes";
import expenseRoutes from "./routes/expenseRoutes";
import categoryRoutes from "./routes/categoryRoutes";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(userRoutes);
app.use(expenseRoutes);
app.use(categoryRoutes);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
