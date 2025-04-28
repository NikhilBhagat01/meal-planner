const fs = require("fs");
const path = require("path");

// Path to recipes.json
const recipesPath = path.join(__dirname, "../data/recipes.json");

// Utility to read recipes from file
const loadRecipes = () => {
  return JSON.parse(fs.readFileSync(recipesPath, "utf-8"));
};

// Utility to save recipes to file
const saveRecipes = (recipes) => {
  fs.writeFileSync(recipesPath, JSON.stringify(recipes, null, 2), "utf-8");
};

// ------------------ Existing Week Planner -------------------

const generateWeekPlan = async (req, res) => {
  try {
    const allRecipes = loadRecipes();
    const categorized = {
      veg: { normal: [], special: [] },
      "non-veg": { normal: [], special: [] },
    };

    allRecipes.forEach((r) => {
      categorized[r.category][r.type].push(r);
    });

    const usageHistory = {}; // Tracks when a recipe was last used (by id)
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

    // Helper function to pick a random recipe, ensuring no duplicates and respecting the 2-day rule
    const pickRecipe = (category, types, usedToday) => {
      let pool = [];

      // Combine all normal and special recipes from the selected category
      types.forEach((type) => {
        pool = pool.concat(categorized[category][type]);
      });

      // Filter out recipes already used today or within the last 2 days
      pool = pool.filter((r) => {
        const lastUsed = usageHistory[r.id] || 0;
        return (
          !usedToday.has(r.id) &&
          Date.now() - lastUsed > 2 * 24 * 60 * 60 * 1000
        ); // More than 2 days ago
      });

      if (pool.length === 0) return null; // No available recipe to pick

      // Randomly pick a recipe from the pool
      const randomIndex = Math.floor(Math.random() * pool.length);
      const chosen = pool[randomIndex];

      return chosen;
    };

    // Plan generation logic
    for (let day of weekDays) {
      mealPlan[day] = { lunch: null, dinner: null };
      const usedToday = new Set(); // Keep track of recipes already selected for lunch or dinner

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

      // Pick lunch and dinner for the day, ensuring no duplicates and respecting the 2-day rule
      let lunch = pickRecipe(category, types, usedToday);
      if (!lunch) {
        console.log(`No available recipe for lunch on ${day}`);
        continue; // Skip this day or handle it differently
      }
      usedToday.add(lunch.id);

      let dinner = pickRecipe(category, types, usedToday);
      if (!dinner) {
        console.log(`No available recipe for dinner on ${day}`);
        continue; // Skip this day or handle it differently
      }
      usedToday.add(dinner.id);

      // Update the usage history for the recipes selected
      usageHistory[lunch.id] = Date.now();
      usageHistory[dinner.id] = Date.now();

      mealPlan[day].lunch = lunch;
      mealPlan[day].dinner = dinner;
    }

    res.json(mealPlan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  generateWeekPlan,
};
