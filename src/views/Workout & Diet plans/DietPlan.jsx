import React, { useState } from "react";
import Layout from "../../components/Layout";

const dietPlans = {
  weightLoss: [
    { meal: "Breakfast", items: "Oats, Almonds, Green Tea" },
    { meal: "Lunch", items: "Grilled Chicken, Brown Rice, Salad" },
    { meal: "Snack", items: "Fruits, Greek Yogurt" },
    { meal: "Dinner", items: "Vegetable Soup, Whole Wheat Roti" },
  ],
  muscleGain: [
    { meal: "Breakfast", items: "Eggs, Peanut Butter Toast, Milk" },
    { meal: "Lunch", items: "Chicken Breast, Quinoa, Vegetables" },
    { meal: "Snack", items: "Protein Shake, Nuts" },
    { meal: "Dinner", items: "Salmon, Sweet Potato, Broccoli" },
  ],
  maintenance: [
    { meal: "Breakfast", items: "Smoothie, Whole Grain Toast" },
    { meal: "Lunch", items: "Grilled Fish, Couscous, Salad" },
    { meal: "Snack", items: "Hummus, Carrots" },
    { meal: "Dinner", items: "Paneer/Chicken, Vegetables" },
  ],
};

export default function DietPlan() {
  const [goal, setGoal] = useState("weightLoss");

  return (
    <Layout>
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Custom Diet Plans 🍽️
      </h1>

      {/* Dropdown to select goal */}
      <div className="mb-6">
        <select
          className="p-3 rounded-lg border border-gray-400 shadow-md focus:outline-none"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
        >
          <option value="weightLoss">Weight Loss</option>
          <option value="muscleGain">Muscle Gain</option>
          <option value="maintenance">Maintenance</option>
        </select>
      </div>

      {/* Diet Plan Display */}
      <div className="grid md:grid-cols-2 gap-6 w-full max-w-3xl">
        {dietPlans[goal].map((plan, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg p-5 hover:shadow-xl transition"
          >
            <h2 className="text-xl font-semibold text-indigo-600">
              {plan.meal}
            </h2>
            <p className="text-gray-700 mt-2">{plan.items}</p>
          </div>
        ))}
      </div>
    </div>
    </Layout>
  );
}