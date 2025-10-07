import { useState } from "react";
import Layout from "../../components/Layout";

const Finance = () => {
  const [transactions, setTransactions] = useState([
    { id: 1, date: "2025-10-01", type: "Income", amount: 5000, description: "Membership Fees" },
    { id: 2, date: "2025-10-02", type: "Expense", amount: 2000, description: "Equipment Maintenance" },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [formData, setFormData] = useState({ date: "", type: "Income", amount: "", description: "" });

  // Handlers
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingTransaction) {
      setTransactions(
        transactions.map((t) => (t.id === editingTransaction.id ? { ...formData, id: t.id, amount: Number(formData.amount) } : t))
      );
      setEditingTransaction(null);
    } else {
      setTransactions([...transactions, { ...formData, id: Date.now(), amount: Number(formData.amount) }]);
    }
    setFormData({ date: "", type: "Income", amount: "", description: "" });
    setShowForm(false);
  };
  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    setFormData(transaction);
    setShowForm(true);
  };
  const handleDelete = (id) => setTransactions(transactions.filter((t) => t.id !== id));

  // Summary
  const totalIncome = transactions.filter((t) => t.type === "Income").reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpense = transactions.filter((t) => t.type === "Expense").reduce((acc, curr) => acc + curr.amount, 0);
  const balance = totalIncome - totalExpense;

  return (
    <Layout>
      <div className="min-h-screen bg-white text-teal-500 py-10 px-4">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-10">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">Finance<span className="text-teal-500"> management</span></h1>
              <p className="text-gray-600 text-base">Track and manage financial transactions</p>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="px-5 py-2.5 rounded-xl border border-gray-100 bg-teal-500 text-gray-100 font-semibold hover:bg-teal-200 hover:text-teal-600 shadow transition"
            >
              + Add Transaction
            </button>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="rounded-2xl bg-teal-50 border border-teal-200 shadow-lg p-6">
              <h2 className="text-base font-semibold text-gray-900">Total Income</h2>
              <p className="text-3xl font-bold text-gray-900 mt-2">₹{totalIncome}</p>
            </div>
            <div className="rounded-2xl bg-teal-50 border border-teal-200 shadow-lg p-6">
              <h2 className="text-base font-semibold text-gray-900">Total Expense</h2>
              <p className="text-3xl font-bold text-gray-900 mt-2">₹{totalExpense}</p>
            </div>
            <div className="rounded-2xl bg-teal-50 border border-teal-200 shadow-lg p-6">
              <h2 className="text-base font-semibold text-gray-900">Balance</h2>
              <p className="text-3xl font-bold text-gray-900 mt-2">₹{balance}</p>
            </div>
          </div>

          {/* Finance Table */}
          <div className="overflow-x-auto">
            <table className="w-full rounded-2xl overflow-hidden shadow-lg bg-white border border-gray-300 text-gray-900">
              <thead className="bg-teal-500">
                <tr>
                  <th className="px-5 py-3 text-left text-gray-50 font-semibold">Date</th>
                  <th className="px-5 py-3 text-left text-gray-50 font-semibold">Type</th>
                  <th className="px-5 py-3 text-left text-gray-50 font-semibold">Amount</th>
                  <th className="px-5 py-3 text-left text-gray-50 font-semibold">Description</th>
                  <th className="px-5 py-3 text-center text-gray-50 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((t) => (
                  <tr key={t.id} className="border-t border-gray-200 hover:bg-green-100 transition">
                    <td className="px-5 py-3">{t.date}</td>
                    <td className="px-5 py-3">
                      <span
                        className={`py-1 px-3 rounded-full text-xs font-semibold
                          ${t.type === "Income" ? "bg-green-200 text-green-800 border border-green-300" :
                          "bg-red-200 text-red-800 border border-red-300"}`}
                      >
                        {t.type}
                      </span>
                    </td>
                    <td className="px-5 py-3 font-semibold">₹{t.amount}</td>
                    <td className="px-5 py-3">{t.description}</td>
                    <td className="px-5 py-3 flex justify-center gap-2">
                      <button
                        onClick={() => handleEdit(t)}
                        className="px-4 py-2 bg-yellow-200 text-yellow-800 rounded-xl hover:bg-yellow-300 font-semibold transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(t.id)}
                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold transition "
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {transactions.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center text-gray-500 py-8">
                      No transactions found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Modal Form */}
          {showForm && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
              <div className="rounded-2xl bg-white border border-gray-300 shadow-2xl w-96 p-6">
                <h2 className="text-lg font-bold mb-4 text-gray-900">
                  {editingTransaction ? "Edit Transaction" : "Add Transaction"}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-green-500 focus:outline-none"
                    required
                  />
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2 text-gray-900 focus:ring-2 focus:ring-green-500 focus:outline-none"
                  >
                    <option>Income</option>
                    <option>Expense</option>
                  </select>
                  <input
                    type="number"
                    name="amount"
                    placeholder="Amount"
                    value={formData.amount}
                    onChange={handleChange}
                    className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-green-500 focus:outline-none"
                    required
                  />
                  <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-green-500 focus:outline-none"
                    required
                  />
                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setShowForm(false);
                        setEditingTransaction(null);
                      }}
                      className="px-4 py-2 bg-gray-300 rounded-xl text-gray-900 hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600"
                    >
                      {editingTransaction ? "Update" : "Add"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Finance;
