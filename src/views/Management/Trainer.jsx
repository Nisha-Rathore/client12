import { useState } from "react";
import  Layout  from "../../components/Layout";

export default function Trainer() {
  const [trainers, setTrainers] = useState([
    {
      id: 1,
      name: "John Carter",
      expertise: "Strength & Conditioning",
      experience: "5 Years",
      image:
        "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: 2,
      name: "Emily Smith",
      expertise: "Yoga & Flexibility",
      experience: "3 Years",
      image:
        "https://randomuser.me/api/portraits/women/45.jpg",
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    expertise: "",
    experience: "",
    image: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddTrainer = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.expertise) return;

    setTrainers([
      ...trainers,
      { id: Date.now(), ...formData },
    ]);
    setFormData({ name: "", expertise: "", experience: "", image: "" });
  };

  return (
    <Layout>
        <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Trainers Management
      </h1>

      {/* Trainer List */}
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6 mb-10">
        {trainers.map((trainer) => (
          <div
            key={trainer.id}
            className="bg-white shadow-lg rounded-2xl p-4 text-center hover:scale-105 transition"
          >
            <img
              src={trainer.image || "https://via.placeholder.com/150"}
              alt={trainer.name}
              className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
            />
            <h2 className="text-xl font-semibold">{trainer.name}</h2>
            <p className="text-gray-600">{trainer.expertise}</p>
            <p className="text-gray-500 text-sm">
              {trainer.experience || "N/A"} Experience
            </p>
          </div>
        ))}
      </div>

      {/* Add Trainer Form */}
      <div className="bg-white shadow-lg rounded-2xl p-6 max-w-lg mx-auto">
        <h2 className="text-2xl font-semibold mb-4 text-center">Add New Trainer</h2>
        <form onSubmit={handleAddTrainer} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Trainer Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
          <input
            type="text"
            name="expertise"
            placeholder="Expertise (e.g. Cardio, Yoga)"
            value={formData.expertise}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
          <input
            type="text"
            name="experience"
            placeholder="Experience (e.g. 4 Years)"
            value={formData.experience}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
          >
            Add Trainer
          </button>
        </form>
      </div>
    </div>
    </Layout>
    );
}