import express from "express";

/**
 * @type {import('express').Router}
 */
export const pingRouter = express.Router();

// Optionally pass in the authMiddleware to protect this route, but this
// can just be done through index.js (which it already is)
// pingRouter.get("/ping-authenticated", authMiddleware, (req, res) => {
pingRouter.get("/ping-authenticated", (req, res) => {
  // req.user is available from the middleware
  res.json({
    message: "authenticated pong",
    user: req.user, // User gets added to the req object in the authMiddleware
  });
});
