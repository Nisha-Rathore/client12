import React, { useState } from "react"
import Layout from "../../components/Layout";
const products = Array.from({ length: 20 }).map((_, i) => ({
  id: i + 1,
  name: `Whey Protein ${i + 1}`,
  price: 2499 + i * 100,
  image: `https://images.unsplash.com/photo-1585238342028-4bbc5a6c9a73?q=80&w=600&auto=format&fit=crop`,
  flavor: i % 2 === 0 ? "Chocolate" : "Vanilla",
  rating: (4 + Math.random()).toFixed(1),
}))

export default function ProteinProductsPage() {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("All")

  const filtered = products.filter(
    p =>
      p.name.toLowerCase().includes(search.toLowerCase()) &&
      (category === "All" || p.flavor === category)
  )

  return (
   <Layout>
     <div className="min-h-screen bg-gradient-to-b from-[#0b1120] via-[#10172a] to-[#0b1120] text-zinc-100 px-4 py-6 md:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          Protein Store
        </h1>
        <p className="text-zinc-400 mt-1">
          Explore our premium selection of protein powders for your fitness goals.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div className="flex gap-3 flex-1">
          <input
            type="text"
            placeholder="Search products..."
            className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <select
            className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            <option>All</option>
            <option>Chocolate</option>
            <option>Vanilla</option>
          </select>
        </div>

        <button className="bg-indigo-600 hover:bg-indigo-500 transition px-5 py-2 rounded-lg font-semibold">
          Add New Product
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map(product => (
          <div
            key={product.id}
            className="bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl border border-white/10 overflow-hidden shadow-lg hover:shadow-indigo-900/30 hover:scale-[1.02] transition transform"
          >
            <div className="aspect-square w-full overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-4 flex flex-col justify-between h-[160px]">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-lg truncate">{product.name}</h3>
                  <span className="text-sm text-amber-400">★ {product.rating}</span>
                </div>
                <p className="text-zinc-400 text-sm">{product.flavor}</p>
              </div>

              <div className="flex items-center justify-between mt-2">
                <div className="text-xl font-extrabold">₹{product.price}</div>
                <div className="flex gap-2">
                  <button className="bg-indigo-600 hover:bg-indigo-500 text-sm px-3 py-1 rounded-lg font-semibold transition">
                    Add
                  </button>
                  <button className="bg-zinc-800 hover:bg-zinc-700 text-sm px-3 py-1 rounded-lg transition">
                    View
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
   </Layout>
  )
}
