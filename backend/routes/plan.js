const express = require("express");
const router = express.Router();
const { generateWeekPlan } = require("../controllers/planController");

// GET /api/plan/week
router.get("/week", generateWeekPlan);

module.exports = router;
