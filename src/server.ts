// import express from "express";
// import { connectDB } from "./config/db.config";
// import app from "./app";
// const PORT = process.env.PORT || 8000;

// app.use(express.json());

// connectDB();

// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });
// import express from "express";
// const app = express();
// const PORT = 5500;

// // Default route
// app.get("/", (req, res) => {
//   res.send("Hello! Your server is working 🚀");
// });

// app.listen(PORT, () => {
//   console.log(Server running on http://127.0.0.1:${PORT});
// });
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