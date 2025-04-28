const express = require("express");
const cors = require("cors");
const planRoutes = require("./routes/plan");

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/plan", planRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Meal Planner API is running!");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
