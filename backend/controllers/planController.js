const fs = require("fs");
const path = require("path");

const generateWeekPlan = async (req, res) => {
  try {
    // Load recipes.json
    const recipesPath = path.join(__dirname, "../data/recipes.json");
    const allRecipes = JSON.parse(fs.readFileSync(recipesPath, "utf-8"));

    // Categorize recipes
    const categorized = {
      veg: { normal: [], special: [] },
      "non-veg": { normal: [], special: [] },
    };

    allRecipes.forEach((r) => {
      categorized[r.category][r.type].push(r);
    });

    // Tracking usage
    const usageCount = {}; // { recipeId: count }

    const weekDays = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    const mealPlan = {};

    // Helper function to pick a random recipe
    const pickRecipe = (category, types) => {
      let pool = [];

      types.forEach((type) => {
        pool = pool.concat(categorized[category][type]);
      });

      pool = pool.filter((r) => (usageCount[r.id] || 0) < 2);

      if (pool.length === 0) return null;

      const randomIndex = Math.floor(Math.random() * pool.length);
      const chosen = pool[randomIndex];

      usageCount[chosen.id] = (usageCount[chosen.id] || 0) + 1;

      return chosen;
    };

    // Plan generation logic
    for (let day of weekDays) {
      mealPlan[day] = { lunch: null, dinner: null };

      let category = "veg";
      let types = ["normal", "special"];

      if (day === "Wednesday" || day === "Friday") {
        category = "non-veg";
        types = ["normal"];
      } else if (day === "Sunday") {
        category = "non-veg";
        types = ["special"];
      } else if (day === "Thursday") {
        category = "veg"; // assumed
        types = ["normal"];
      }

      mealPlan[day].lunch = pickRecipe(category, types);
      mealPlan[day].dinner = pickRecipe(category, types);
    }

    res.json(mealPlan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { generateWeekPlan };
