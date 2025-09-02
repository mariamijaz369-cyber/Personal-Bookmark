
import express from "express";
import { connectDB } from "./config/db.config";
import app from "./app"
const PORT=8000;
// app.use(express.json());

connectDB().then(() => {
  const server = app.listen(PORT, "0.0.0.0", () => {
    console.log(`:rocket: Server running at http://localhost:${PORT}`);
  });
  server.on("error", (err) => {
    console.error(":x: Server failed to start:", err);
  });
});