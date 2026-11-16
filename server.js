import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

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

const courses = [
  { id: 1, title: "Web Programming", credits: 5 },
  { id: 2, title: "Database Systems", credits: 6 },
  { id: 3, title: "Operating Systems", credits: 6 }
];

app.get("/api/courses", (req, res) => {
  res.json(courses);
});

app.get("/api/status", (req, res) => {
  res.json({
    status: "OK",
    nodeVersion: process.version,
    uptimeSeconds: Math.floor(process.uptime())
  });
});

app.get("/api/headers", (req, res) => {
  res.json({
    userAgent: req.headers["user-agent"],
    accept: req.headers["accept"]
  });
});

app.post("/api/subscribe", (req, res) => {
  res.status(201).json({ subscribed: true });
});

app.get("/api/admin", (req, res) => {
  res.status(403).json({ error: "Forbidden" });
});

app.get("/api/stats", (req, res) => {
  res.json({ requestsServed: requestCount });
});

app.use((req, res) => {
  if (req.path.startsWith("/api")) {
    res.status(404).json({ error: "Not found" });
  } else {
    res.status(404).send("Page was not found");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});