import React, { useState } from "react";
import Layout from "../../components/Layout"

const DietPlan = () => {
  const [plans, setPlans] = useState([
    { id: 1, name: "Weight Loss Basic", calories: "1800 kcal", goal: "Weight Loss", duration: "4 Weeks" },
    { id: 2, name: "Muscle Gain Advanced", calories: "2800 kcal", goal: "Muscle Gain", duration: "6 Weeks" },
    { id: 3, name: "Maintenance Plan", calories: "2200 kcal", goal: "Maintenance", duration: "8 Weeks" },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [formData, setFormData] = useState({
    name: "", calories: "", goal: "Weight Loss", duration: ""
  });

  // Input change handler
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // Add / Update Plan
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingPlan) {
      setPlans(plans.map((p) => (p.id === editingPlan.id ? { ...formData, id: p.id } : p)));
      setEditingPlan(null);
    } else {
      setPlans([...plans, { ...formData, id: Date.now() }]);
    }
    setFormData({ name: "", calories: "", goal: "Weight Loss", duration: "" });
    setShowForm(false);
  };

  // Edit Plan
  const handleEdit = (plan) => {
    setEditingPlan(plan);
    setFormData(plan);
    setShowForm(true);
  };

  // Delete Plan
  const handleDelete = (id) => setPlans(plans.filter((p) => p.id !== id));

  // Badge styling by goal
  const getGoalBadge = (goal) => {
    switch (goal) {
      case "Weight Loss": return "bg-blue-100 text-blue-700";
      case "Muscle Gain": return "bg-green-100 text-green-700";
      case "Maintenance": return "bg-yellow-100 text-yellow-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
   <Layout>
     <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Custom Diet Plans</h1>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition"
        >
          + Add Diet Plan
        </button>
      </div>

      {/* Diet Plans Table */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="px-6 py-3">Plan Name</th>
              <th className="px-6 py-3">Calories</th>
              <th className="px-6 py-3">Goal</th>
              <th className="px-6 py-3">Duration</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {plans.map((plan) => (
              <tr key={plan.id} className="border-b hover:bg-gray-50 transition">
                <td className="px-6 py-4 font-medium">{plan.name}</td>
                <td className="px-6 py-4">{plan.calories}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getGoalBadge(plan.goal)}`}>
                    {plan.goal}
                  </span>
                </td>
                <td className="px-6 py-4">{plan.duration}</td>
                <td className="px-6 py-4 flex justify-center gap-3">
                  <button
                    onClick={() => handleEdit(plan)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(plan.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {plans.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center text-gray-500 py-6">
                  No diet plans found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">
              {editingPlan ? "Edit Diet Plan" : "Add Diet Plan"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Plan Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md"
                required
              />
              <input
                type="text"
                name="calories"
                placeholder="Calories (e.g., 2200 kcal)"
                value={formData.calories}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md"
                required
              />
              <select
                name="goal"
                value={formData.goal}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md"
              >
                <option>Weight Loss</option>
                <option>Muscle Gain</option>
                <option>Maintenance</option>
              </select>
              <input
                type="text"
                name="duration"
                placeholder="Duration (e.g., 6 Weeks)"
                value={formData.duration}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md"
                required
              />
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingPlan(null);
                  }}
                  className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  {editingPlan ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
   </Layout>
  );
};

export default DietPlan;
