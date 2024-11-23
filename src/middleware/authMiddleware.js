import { supabase } from "../utils/supabase.js";
import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
  const JWT_SECRET = process.env.SUPABASE_JWT_SECRET;

  try {
    // Extract token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    // Verify JWT using jsonwebtoken
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      if (!decoded) {
        return res.status(401).json({ message: "Invalid token" });
      }
    } catch (error) {
      console.error("JWT verification error:", error.message);
      return res.status(401).json({ message: "Invalid token" });
    }

    // Get user from Supabase (optional, based on your needs)
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);
    console.log("user", user);

    if (error || !user) {
      return res
        .status(401)
        .json({ message: "User not found or token invalid" });
    }

    // Attach user to request object for downstream handlers
    req.user = user;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired, please refresh" });
    }
    res.status(401).json({ message: err.message || "Unauthorized" });
  }
};
