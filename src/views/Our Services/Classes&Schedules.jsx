import React from "react";
import Layout from "../../components/Layout";

const ClassesSchedule = () => {
  const classes = [
    {
      id: 1,
      name: "Yoga & Stretching",
      instructor: "Aarav Sharma",
      time: "6:00 AM - 7:00 AM",
      days: "Mon, Wed, Fri",
      image:
        "https://images.unsplash.com/photo-1554284126-aa88f22d8b74?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      name: "Strength Training",
      instructor: "Priya Mehta",
      time: "7:30 AM - 8:30 AM",
      days: "Tue, Thu, Sat",
      image:
        "https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE4fHx8ZW58MHx8fHx8",
    },
    {
      id: 3,
      name: "Zumba Dance",
      instructor: "Rohit Verma",
      time: "6:00 PM - 7:00 PM",
      days: "Mon – Sat",
      image:
        "https://www.verywellfit.com/thmb/5g7mfKihpixyGsPXHh8AojylmWs=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/4688722-GettyImages-950806258-06e1e050ab184f3694fd96017c9a42ee.jpg",
    },
    {
      id: 4,
      name: "CrossFit Bootcamp",
      instructor: "Simran Kaur",
      time: "7:00 PM - 8:00 PM",
      days: "Mon – Fri",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFDugC8-drshjE11fxq2N8GsqzQhKDPDHdjSn90zp25eGP44psHzc1_SXk8UanfAcJNi0&usqp=CAU",
    },
  ];

  const schedule = [
    { day: "Monday", classes: ["Yoga", "Zumba", "CrossFit"] },
    { day: "Tuesday", classes: ["Strength", "CrossFit"] },
    { day: "Wednesday", classes: ["Yoga", "Zumba"] },
    { day: "Thursday", classes: ["Strength", "CrossFit"] },
    { day: "Friday", classes: ["Yoga", "Zumba", "CrossFit"] },
    { day: "Saturday", classes: ["Strength", "Zumba"] },
    { day: "Sunday", classes: ["Rest Day 💤"] },
  ];

  return (
    <Layout>
      <section className="bg-gray-50 py-12 px-6 md:px-16">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-3">
          Gym Classes & Schedules
        </h2>
        <p className="text-gray-600">
          Choose your favorite class and stay fit with our professional trainers.
        </p>
      </div>

      {/* Classes Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {classes.map((gymClass) => (
          <div
            key={gymClass.id}
            className="bg-white shadow-lg rounded-2xl overflow-hidden hover:scale-[1.02] transition-transform duration-300"
          >
            <img
              src={gymClass.image}
              alt={gymClass.name}
              className="h-48 w-full object-cover"
            />
            <div className="p-5">
              <h3 className="text-2xl font-bold text-gray-800 mb-1">
                {gymClass.name}
              </h3>
              <p className="text-gray-500 mb-2">
                Instructor: <span className="font-medium">{gymClass.instructor}</span>
              </p>
              <p className="text-gray-600">
                🕒 {gymClass.time} <br /> 📅 {gymClass.days}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Schedule Table */}
      <div className="mt-16 bg-white rounded-2xl shadow-lg overflow-hidden">
        <h3 className="text-3xl font-semibold text-center bg-indigo-600 text-white py-4">
          Weekly Schedule
        </h3>
        <table className="w-full text-left text-gray-700">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4">Day</th>
              <th className="p-4">Classes</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((row, index) => (
              <tr
                key={index}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="p-4 font-semibold">{row.day}</td>
                <td className="p-4">{row.classes.join(", ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
    </Layout>
  );
};

export default ClassesSchedule;