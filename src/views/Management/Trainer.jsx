import React, { useState } from "react";
import Layout from "../../components/Layout"

const Trainer = () => {
  const [trainers, setTrainers] = useState([
    { id: 1, name: "Rahul Mehta", specialty: "Strength Training", experience: "5 Years", status: "Active" },
    { id: 2, name: "Priya Sharma", specialty: "Yoga Instructor", experience: "3 Years", status: "Inactive" },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingTrainer, setEditingTrainer] = useState(null);
  const [formData, setFormData] = useState({ name: "", specialty: "", experience: "", status: "Active" });

  // Handle Input Change
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // Add or Update Trainer
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingTrainer) {
      setTrainers(trainers.map((t) => (t.id === editingTrainer.id ? { ...formData, id: t.id } : t)));
      setEditingTrainer(null);
    } else {
      setTrainers([...trainers, { ...formData, id: Date.now() }]);
    }
    setFormData({ name: "", specialty: "", experience: "", status: "Active" });
    setShowForm(false);
  };

  // Edit Trainer
  const handleEdit = (trainer) => {
    setEditingTrainer(trainer);
    setFormData(trainer);
    setShowForm(true);
  };

  // Delete Trainer
  const handleDelete = (id) => setTrainers(trainers.filter((t) => t.id !== id));

  return (
   <Layout>
     <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Trainer Management</h1>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
        >
          + Add Trainer
        </button>
      </div>

      {/* Trainer Table */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Specialty</th>
              <th className="px-6 py-3">Experience</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {trainers.map((trainer) => (
              <tr key={trainer.id} className="border-b hover:bg-gray-50 transition">
                <td className="px-6 py-4 font-medium">{trainer.name}</td>
                <td className="px-6 py-4">{trainer.specialty}</td>
                <td className="px-6 py-4">{trainer.experience}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      trainer.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    }`}
                  >
                    {trainer.status}
                  </span>
                </td>
                <td className="px-6 py-4 flex justify-center gap-3">
                  <button
                    onClick={() => handleEdit(trainer)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(trainer.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {trainers.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center text-gray-500 py-6">
                  No trainers found.
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
            <h2 className="text-lg font-bold mb-4">{editingTrainer ? "Edit Trainer" : "Add Trainer"}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Trainer Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md"
                required
              />
              <input
                type="text"
                name="specialty"
                placeholder="Specialty (e.g., Yoga, Strength)"
                value={formData.specialty}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md"
                required
              />
              <input
                type="text"
                name="experience"
                placeholder="Experience (e.g., 5 Years)"
                value={formData.experience}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md"
                required
              />
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md"
              >
                <option>Active</option>
                <option>Inactive</option>
              </select>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingTrainer(null);
                  }}
                  className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  {editingTrainer ? "Update" : "Add"}
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

export default Trainer;
