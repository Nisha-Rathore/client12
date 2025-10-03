import React, { useState } from "react";
import Layout from "../../components/Layout"

const WorkoutRoutine = () => {
  const [routines, setRoutines] = useState([
    { id: 1, name: "Full Body Strength", type: "Strength", duration: "45 min", difficulty: "Intermediate" },
    { id: 2, name: "HIIT Cardio", type: "Cardio", duration: "30 min", difficulty: "Advanced" },
    { id: 3, name: "Yoga Flow", type: "Wellness", duration: "60 min", difficulty: "Beginner" },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingRoutine, setEditingRoutine] = useState(null);
  const [formData, setFormData] = useState({
    name: "", type: "", duration: "", difficulty: "Beginner"
  });

  // Input change handler
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // Add / Update Routine
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingRoutine) {
      setRoutines(
        routines.map((r) => (r.id === editingRoutine.id ? { ...formData, id: r.id } : r))
      );
      setEditingRoutine(null);
    } else {
      setRoutines([...routines, { ...formData, id: Date.now() }]);
    }
    setFormData({ name: "", type: "", duration: "", difficulty: "Beginner" });
    setShowForm(false);
  };

  // Edit Routine
  const handleEdit = (routine) => {
    setEditingRoutine(routine);
    setFormData(routine);
    setShowForm(true);
  };

  // Delete Routine
  const handleDelete = (id) => setRoutines(routines.filter((r) => r.id !== id));

  // Badge styling by difficulty
  const getDifficultyBadge = (level) => {
    switch (level) {
      case "Beginner": return "bg-green-100 text-green-700";
      case "Intermediate": return "bg-yellow-100 text-yellow-700";
      case "Advanced": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
   <Layout>
     <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Workout Routine Management</h1>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
        >
          + Add Routine
        </button>
      </div>

      {/* Routines Table */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="px-6 py-3">Routine Name</th>
              <th className="px-6 py-3">Type</th>
              <th className="px-6 py-3">Duration</th>
              <th className="px-6 py-3">Difficulty</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {routines.map((routine) => (
              <tr key={routine.id} className="border-b hover:bg-gray-50 transition">
                <td className="px-6 py-4 font-medium">{routine.name}</td>
                <td className="px-6 py-4">{routine.type}</td>
                <td className="px-6 py-4">{routine.duration}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyBadge(routine.difficulty)}`}>
                    {routine.difficulty}
                  </span>
                </td>
                <td className="px-6 py-4 flex justify-center gap-3">
                  <button
                    onClick={() => handleEdit(routine)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(routine.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {routines.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center text-gray-500 py-6">
                  No workout routines found.
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
              {editingRoutine ? "Edit Routine" : "Add Routine"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Routine Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md"
                required
              />
              <input
                type="text"
                name="type"
                placeholder="Routine Type (e.g., Strength, Cardio, Wellness)"
                value={formData.type}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md"
                required
              />
              <input
                type="text"
                name="duration"
                placeholder="Duration (e.g., 30 min, 1 hr)"
                value={formData.duration}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md"
                required
              />
              <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md"
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingRoutine(null);
                  }}
                  className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  {editingRoutine ? "Update" : "Add"}
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

export default WorkoutRoutine;
