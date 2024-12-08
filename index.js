import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import todoRoutes from "./routes/todos.js";
import cors from "cors";

dotenv.config();
connectDB();

const app = express();

app.use(cors({ origin: "*" }));
// Middleware
app.use(express.json());

// Routes
app.use("/api/todos", todoRoutes);

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
