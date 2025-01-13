import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import fs from "fs";
import pkg from "../package.json" assert { type: "json" };

// Initialize app
const app = express();

// Set base routes
app.get("/", (req, res) => {
  res.json({
    message: "Welcome greetings app",
    name: pkg.name,
    version: pkg.version,
    description: pkg.description,
    author: pkg.author,
  });
});

app.get("/read-docs", (req, res) => {
  const filePath = "./src/hello_world.txt";
  fs.readFile(filePath, { encoding: "utf-8" }, (err, data) => {
    if (err) {
      res.status(500).send("Error reading the file");
      return;
    }
    res.send(data);
  });
});

app.get("/greetings", (req, res) => {
  res.send("Hello world!");
});

// Middlewares
app.use(
  cors({
    // origin: "http://localhost:3000",
  })
);
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

export default app;
