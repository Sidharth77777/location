import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { connectDB } from "./config/db";
import locationRoutes from "./routes/location";

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
  res.json({
    message: "Backend Running",
  });
});

app.use("/api/location", locationRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});