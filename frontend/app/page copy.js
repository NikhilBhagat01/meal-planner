"use client";

import { useEffect, useState } from "react";
import DayMealCard from "./components/DayMealCard";

export default function Home() {
  const [meals, setMeals] = useState([]);

  const fetchData = async () => {
    const response = await fetch(
      "https://meal-planner-f0hh.onrender.com/api/plan/week"
    );
    const data = await response.json();

    const formattedData = Object.entries(data).map(([day, meal]) => ({
      day,
      lunch: meal.lunch,
      lunchEn: meal.lunch.english_name,
      lunchMr: meal.lunch.marathi_name,
      dinnerEn: meal.dinner.english_name,
      dinnerMr: meal.dinner.marathi_name,
    }));

    localStorage.setItem("meals", JSON.stringify(formattedData));
    setMeals(formattedData);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedMeals = localStorage.getItem("meals");
      if (storedMeals) {
        setMeals(JSON.parse(storedMeals));
      } else {
        fetchData();
      }
    }
  }, []);

  const resetMeals = () => {
    localStorage.removeItem("meals");
    fetchData();
  };

  // console.log(meals);
  // console.log(formatData);

  return (
    <div className="min-h-screen bg-pink-50 py-8 px-4">
      <h1 className="text-3xl font-bold text-center text-pink-700 mb-4">
        Weekly Meal Plan
      </h1>

      <div className="text-center mb-6">
        <button
          onClick={resetMeals}
          className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition"
        >
          🔄 Reset Meals
        </button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {meals.length > 0 ? (
          meals?.map((meal, index) => (
            <DayMealCard
              key={index}
              day={meal.day}
              lunchEn={meal.lunchEn}
              lunchMr={meal.lunchMr}
              dinnerEn={meal.dinnerEn}
              dinnerMr={meal.dinnerMr}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-pink-600">
            Loading meals...
          </p>
        )}
      </div>
    </div>
  );
}
