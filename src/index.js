import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { authMiddleware } from "./middleware/authMiddleware.js";
import { initSupabase } from "./utils/supabase.js";
import { pingRouter } from "./routes/pingRoute.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

initSupabase();

// Middleware
app.use(cors());
app.use(express.json());

// This is above the auth middleware so that it can be accessed without it
app.get("/ping", (_, res) => {
  res.json({ message: "pong" });
});

app.use(authMiddleware);

// add routers to the app
app.use(pingRouter);

// Error handler
app.use((err, _, res, __) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    error: err.message || "Internal Server Error",
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
