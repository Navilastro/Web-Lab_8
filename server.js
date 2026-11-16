import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));

app.get("/hello", (req, res) => {
  res.send("Hello from Efe's server");
});

app.get("/robots.txt", (req, res) => {
  res.type("text/plain");
  res.send("User-agent: *\nDisallow: /api/");
});

app.get("/old-page", (req, res) => {
  res.redirect("/hello");
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

let requestCount = 0;

const requestLogger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
};

const requestCounter = (req, res, next) => {
  requestCount++;
  next();
};

app.use(requestLogger);
app.use(requestCounter);