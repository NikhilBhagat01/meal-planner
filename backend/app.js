const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());

// Body parser (optional, if you want to handle JSON requests)
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Hello World! Express + CORS setup successful.");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
