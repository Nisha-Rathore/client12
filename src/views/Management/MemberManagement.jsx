import React, { useState } from "react";
import Layout from "../../components/Layout";


export default function Member() {
  const [members, setMembers] = useState([
    { id: 1, name: "Aadi Singh", email: "aadi@example.com", plan: "Gold" },
    { id: 2, name: "Rohit Sharma", email: "rohit@example.com", plan: "Silver" },
  ]);
  const [newMember, setNewMember] = useState({ name: "", email: "", plan: "Basic" });
  const [search, setSearch] = useState("");

  const addMember = () => {
    if (!newMember.name || !newMember.email) return;
    setMembers([
      ...members,
      { ...newMember, id: Date.now() }
    ]);
    setNewMember({ name: "", email: "", plan: "Basic" });
  };

  const deleteMember = (id) => {
    setMembers(members.filter((m) => m.id !== id));
  };

  const filteredMembers = members.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
        <div className="p-6">
      {/* Title */}
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Member Management</h1>

      {/* Add Member Form */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-6">
        <h2 className="text-lg font-semibold mb-3">Add New Member</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <input
            type="text"
            placeholder="Full Name"
            value={newMember.name}
            onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
            className="p-2 border rounded-lg"
          />
          <input
            type="email"
            placeholder="Email"
            value={newMember.email}
            onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
            className="p-2 border rounded-lg"
          />
          <select
            value={newMember.plan}
            onChange={(e) => setNewMember({ ...newMember, plan: e.target.value })}
            className="p-2 border rounded-lg"
          >
            <option>Basic</option>
            <option>Silver</option>
            <option>Gold</option>
          </select>
          <button
            onClick={addMember}
            className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700"
          >
            Add
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="flex justify-between items-center mb-3">
        <input
          type="text"
          placeholder="Search members..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded-lg w-full md:w-1/3"
        />
      </div>

      {/* Members Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Plan</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers.length > 0 ? (
              filteredMembers.map((member) => (
                <tr key={member.id} className="border-t">
                  <td className="px-4 py-2">{member.name}</td>
                  <td className="px-4 py-2">{member.email}</td>
                  <td className="px-4 py-2">{member.plan}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => deleteMember(member.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-4 py-3 text-center text-gray-500">
                  No members found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    </Layout>
  );
}