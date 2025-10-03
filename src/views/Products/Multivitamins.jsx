import React, { useMemo, useState } from "react";
import Layout from "../../components/Layout";

const CATEGORIES = ["All", "Men", "Women", "Unisex", "Immunity", "Performance"];
const FORMS = ["Tablets", "Capsules", "Gummies", "Powder"];
const IMG = {
  Men: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200&auto=format&fit=crop",
  Women: "https://images.unsplash.com/photo-1588776814546-ec7f4f6e91b0?q=80&w=1200&auto=format&fit=crop",
  Unisex: "https://images.unsplash.com/photo-1582719478146-e7f85c64b7c6?q=80&w=1200&auto=format&fit=crop",
  Immunity: "https://images.unsplash.com/photo-1584362917165-526a968579e8?q=80&w=1200&auto=format&fit=crop",
  Performance: "https://images.unsplash.com/photo-1620912189868-86b32a0ffb68?q=80&w=1200&auto=format&fit=crop",
};

const PRODUCTS = Array.from({ length: 20 }).map((_, i) => {
  const cat = CATEGORIES.slice(1)[i % (CATEGORIES.length - 1)];
  const form = FORMS[i % FORMS.length];
  const name = `${cat} Multivitamin ${i + 1}`;
  const price = 499 + (i % 5) * 100;
  const rating = (4 + (i % 6) * 0.2).toFixed(1);
  const servings = 30 + (i % 3) * 15;
  const nutrients = 24 + (i % 5) * 2;

  return {
    id: `mv-${i + 1}`,
    name,
    category: cat,
    form,
    servings,
    nutrients,
    rating: Math.min(5, Number(rating)),
    reviews: 30 + (i * 11) % 180,
    price,
    mrp: price + 250,
    image: IMG[cat],
    tags: [
      i % 2 === 0 ? "Sugar Free" : "Natural Extracts",
      nutrients > 25 ? "Complete Formula" : "Daily Use",
    ],
  };
});

function Badge({ children }) {
  return (
    <span className="px-2 py-1 rounded-lg text-[10px] font-semibold bg-white/10 ring-1 ring-white/10">
      {children}
    </span>
  );
}

function Rating({ value }) {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  const stars = new Array(5).fill(0).map((_, i) => {
    if (i < full) return "★";
    if (i === full && half) return "⯪";
    return "☆";
  });
  return <span className="text-amber-400">{stars.join(" ")}</span>;
}

export default function MultivitaminsPage() {
  const [tab, setTab] = useState("All");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [quick, setQuick] = useState(null);

  const list = useMemo(() => {
    let l = PRODUCTS.filter(
      (p) =>
        (tab === "All" || p.category === tab) &&
        p.name.toLowerCase().includes(search.toLowerCase())
    );
    if (sortBy === "priceLow") l = [...l].sort((a, b) => a.price - b.price);
    if (sortBy === "priceHigh") l = [...l].sort((a, b) => b.price - a.price);
    if (sortBy === "rating") l = [...l].sort((a, b) => b.rating - a.rating);
    return l;
  }, [tab, search, sortBy]);

  return (
   <Layout>
     <div className="min-h-screen bg-gradient-to-b from-[#0b1120] via-[#10172a] to-[#0b1120] text-zinc-100">
      <div className="mx-auto max-w-7xl px-4 md:px-8 py-6 md:py-10">
        {/* Header */}
        <header className="mb-6">
          <h1 className="text-3xl md:text-5xl font-black tracking-tight">
            Multivitamins & Minerals
          </h1>
          <p className="text-zinc-400 mt-1">
            Explore essential nutrients for performance, immunity, and recovery.
          </p>
        </header>

        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
          <div className="flex gap-2 bg-zinc-900 p-1 rounded-xl ring-1 ring-white/10 w-fit">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setTab(c)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                  tab === c ? "bg-indigo-600" : "hover:bg-zinc-800"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="md:ml-auto grid grid-cols-1 sm:grid-cols-3 gap-3 w-full md:w-auto">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products"
              className="bg-zinc-900 ring-1 ring-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-zinc-900 ring-1 ring-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="popular">Sort by popular</option>
              <option value="priceLow">Price: Low to High</option>
              <option value="priceHigh">Price: High to Low</option>
              <option value="rating">Top rated</option>
            </select>
            <button className="bg-zinc-900 ring-1 ring-white/10 rounded-lg px-4 py-2 text-sm hover:bg-zinc-800">
              Export list
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {list.map((p) => (
            <div
              key={p.id}
              className="group rounded-2xl overflow-hidden bg-gradient-to-br from-zinc-800 to-zinc-900 ring-1 ring-white/10 hover:ring-indigo-500/60 transition shadow-lg hover:shadow-indigo-900/30"
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={p.image}
                  alt={p.name}
                  className="h-full w-full object-cover group-hover:scale-[1.03] transition"
                />
                <div className="absolute left-3 top-3 flex gap-2">
                  {p.tags.map((t) => (
                    <Badge key={t}>{t}</Badge>
                  ))}
                </div>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-lg leading-tight">
                      {p.name}
                    </h3>
                    <div className="text-xs text-zinc-400">
                      {p.category} · {p.form}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm">
                      <Rating value={p.rating} />
                    </div>
                    <div className="text-[11px] text-zinc-400">
                      {p.reviews} reviews
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
                  <div className="rounded-lg bg-zinc-950/40 ring-1 ring-white/10 p-2">
                    <div className="text-zinc-300">Servings</div>
                    <div className="font-semibold">{p.servings}</div>
                  </div>
                  <div className="rounded-lg bg-zinc-950/40 ring-1 ring-white/10 p-2">
                    <div className="text-zinc-300">Nutrients</div>
                    <div className="font-semibold">{p.nutrients}</div>
                  </div>
                  <div className="rounded-lg bg-zinc-950/40 ring-1 ring-white/10 p-2">
                    <div className="text-zinc-300">Form</div>
                    <div className="font-semibold">{p.form}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-extrabold">
                      ₹{p.price.toLocaleString()}
                    </div>
                    <div className="text-xs text-zinc-400 line-through">
                      ₹{p.mrp.toLocaleString()}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setQuick(p)}
                      className="px-3 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-sm"
                    >
                      View
                    </button>
                    <button className="px-3 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 font-semibold text-sm">
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick View Drawer */}
      <div className={`fixed inset-0 z-50 ${quick ? "" : "pointer-events-none"}`}>
        <div
          onClick={() => setQuick(null)}
          className={`absolute inset-0 bg-black/50 transition-opacity ${
            quick ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`absolute right-0 top-0 h-full w-full sm:w-[32rem] bg-zinc-950 ring-1 ring-white/10 transition-transform ${
            quick ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {quick && (
            <div className="h-full flex flex-col">
              <div className="p-4 flex items-center justify-between border-b border-white/10">
                <div>
                  <div className="text-xs text-zinc-400">
                    {quick.category} · {quick.form}
                  </div>
                  <h3 className="text-xl font-bold">{quick.name}</h3>
                </div>
                <button
                  onClick={() => setQuick(null)}
                  className="px-3 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700"
                >
                  Close
                </button>
              </div>

              <div className="p-4 overflow-auto space-y-4">
                <img
                  src={quick.image}
                  alt={quick.name}
                  className="w-full h-56 object-cover rounded-xl ring-1 ring-white/10"
                />

                <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
                  <div className="rounded-lg bg-zinc-900 ring-1 ring-white/10 p-2">
                    <div className="text-zinc-300">Servings</div>
                    <div className="font-semibold">{quick.servings}</div>
                  </div>
                  <div className="rounded-lg bg-zinc-900 ring-1 ring-white/10 p-2">
                    <div className="text-zinc-300">Nutrients</div>
                    <div className="font-semibold">{quick.nutrients}</div>
                  </div>
                  <div className="rounded-lg bg-zinc-900 ring-1 ring-white/10 p-2">
                    <div className="text-zinc-300">Form</div>
                    <div className="font-semibold">{quick.form}</div>
                  </div>
                </div>

                <div className="rounded-xl bg-zinc-900 ring-1 ring-white/10 p-4">
                  <h4 className="font-semibold mb-2">Highlights</h4>
                  <ul className="text-sm text-zinc-300 list-disc list-inside space-y-1">
                    <li>Essential daily micronutrients</li>
                    <li>Boosts immunity and recovery</li>
                    <li>Batch tested and clean label</li>
                  </ul>
                </div>
              </div>

              <div className="mt-auto p-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-2xl font-extrabold">
                    ₹{quick.price.toLocaleString()}
                  </div>
                  <div className="text-xs text-zinc-400 line-through">
                    ₹{quick.mrp.toLocaleString()}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700">
                    Add to wishlist
                  </button>
                  <button className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 font-semibold">
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
   </Layout>
  );
}
