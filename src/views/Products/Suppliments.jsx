import React, { useMemo, useState } from "react";
import Layout from "../../components/Layout";

const CATEGORIES = ["All", "Pre", "Intra", "Post"];
const FLAVORS = ["Blue Raspberry", "Watermelon", "Lemon Lime", "Fruit Punch", "Cola", "Unflavoured"];

const baseImages = {
  Pre: "https://images.unsplash.com/photo-1599050751795-5b2281aef707?q=80&w=1200&auto=format&fit=crop",
  Intra: "https://images.unsplash.com/photo-1596357395104-5b99f04b1e8f?q=80&w=1200&auto=format&fit=crop",
  Post: "https://images.unsplash.com/photo-1585238342028-4bbc5a6c9a73?q=80&w=1200&auto=format&fit=crop",
};

const PRODUCTS = Array.from({ length: 40 }).map((_, i) => {
  const cat = ["Pre", "Intra", "Post"][i % 3];
  const name = `${cat} Workout Supplement ${i + 1}`;
  const price = 1499 + (i % 7) * 200;
  const rating = (4 + ((i * 13) % 10) / 10).toFixed(1);
  const flavor = FLAVORS[i % FLAVORS.length];
  const servings = 30 + (i % 3) * 10;
  const scoop = 12 + (i % 5) * 2;
  return {
    id: `prod-${i + 1}`,
    name,
    category: cat,
    price,
    mrp: price + 400,
    rating: Number(rating) > 5 ? 5 : Number(rating),
    reviews: 50 + (i * 7) % 250,
    flavor,
    servings,
    scoop,
    caffeine: cat === "Pre" ? 200 - (i % 3) * 50 : 0,
    bcaa: cat !== "Pre" ? 7 + (i % 4) : 0,
    protein: cat === "Post" ? 25 + (i % 3) * 2 : 0,
    image: baseImages[cat],
    tags: [
      cat === "Pre" ? "Energy" : cat === "Intra" ? "Hydration" : "Recovery",
      i % 2 === 0 ? "Sugar Free" : "Vegan Friendly",
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

export default function SupplementsPage() {
  const [tab, setTab] = useState("All");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [quickView, setQuickView] = useState(null);

  const filtered = useMemo(() => {
    let list = PRODUCTS.filter(
      (p) =>
        (tab === "All" || p.category === tab) &&
        p.name.toLowerCase().includes(search.toLowerCase())
    );
    if (sortBy === "priceLow") list = [...list].sort((a, b) => a.price - b.price);
    if (sortBy === "priceHigh") list = [...list].sort((a, b) => b.price - a.price);
    if (sortBy === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [tab, search, sortBy]);

  return (
   <Layout>
     <div className="min-h-screen bg-gradient-to-b from-[#0b1120] via-[#10172a] to-[#0b1120] text-zinc-100">
      <div className="mx-auto max-w-7xl px-4 md:px-8 py-6 md:py-10">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl md:text-5xl font-black tracking-tight">
            Workout Supplements
          </h1>
          <p className="text-zinc-400 mt-1">
            Pre, intra and post workout products with clean visuals and smart filters.
          </p>
        </div>

        {/* Tabs & Filters */}
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
          {filtered.map((p) => (
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
                    <h3 className="font-bold text-lg leading-tight">{p.name}</h3>
                    <div className="text-xs text-zinc-400">
                      {p.category} · {p.flavor}
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
                    <div className="text-zinc-300">Scoop</div>
                    <div className="font-semibold">{p.scoop} g</div>
                  </div>
                  <div className="rounded-lg bg-zinc-950/40 ring-1 ring-white/10 p-2">
                    <div className="text-zinc-300">
                      {p.category === "Pre"
                        ? "Caffeine"
                        : p.category === "Intra"
                        ? "BCAAs"
                        : "Protein"}
                    </div>
                    <div className="font-semibold">
                      {p.category === "Pre"
                        ? `${p.caffeine} mg`
                        : p.category === "Intra"
                        ? `${p.bcaa} g`
                        : `${p.protein} g`}
                    </div>
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
                      onClick={() => setQuickView(p)}
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
      <div
        className={`fixed inset-0 z-50 ${
          quickView ? "" : "pointer-events-none"
        }`}
      >
        <div
          onClick={() => setQuickView(null)}
          className={`absolute inset-0 bg-black/50 transition-opacity ${
            quickView ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`absolute right-0 top-0 h-full w-full sm:w-[32rem] bg-zinc-950 ring-1 ring-white/10 transition-transform ${
            quickView ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {quickView && (
            <div className="h-full flex flex-col">
              <div className="p-4 flex items-center justify-between border-b border-white/10">
                <div>
                  <div className="text-xs text-zinc-400">
                    {quickView.category} · {quickView.flavor}
                  </div>
                  <h3 className="text-xl font-bold">{quickView.name}</h3>
                </div>
                <button
                  onClick={() => setQuickView(null)}
                  className="px-3 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700"
                >
                  Close
                </button>
              </div>

              <div className="p-4 overflow-auto space-y-4">
                <img
                  src={quickView.image}
                  alt={quickView.name}
                  className="w-full h-56 object-cover rounded-xl ring-1 ring-white/10"
                />

                <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
                  <div className="rounded-lg bg-zinc-900 ring-1 ring-white/10 p-2">
                    <div className="text-zinc-300">Servings</div>
                    <div className="font-semibold">{quickView.servings}</div>
                  </div>
                  <div className="rounded-lg bg-zinc-900 ring-1 ring-white/10 p-2">
                    <div className="text-zinc-300">Scoop</div>
                    <div className="font-semibold">{quickView.scoop} g</div>
                  </div>
                  <div className="rounded-lg bg-zinc-900 ring-1 ring-white/10 p-2">
                    <div className="text-zinc-300">
                      {quickView.category === "Pre"
                        ? "Caffeine"
                        : quickView.category === "Intra"
                        ? "BCAAs"
                        : "Protein"}
                    </div>
                    <div className="font-semibold">
                      {quickView.category === "Pre"
                        ? `${quickView.caffeine} mg`
                        : quickView.category === "Intra"
                        ? `${quickView.bcaa} g`
                        : `${quickView.protein} g`}
                    </div>
                  </div>
                </div>

                <div className="rounded-xl bg-zinc-900 ring-1 ring-white/10 p-4">
                  <h4 className="font-semibold mb-2">Highlights</h4>
                  <ul className="text-sm text-zinc-300 list-disc list-inside space-y-1">
                    <li>Clean label and batch tested</li>
                    <li>Great mixability and taste</li>
                    <li>
                      Optimized for {quickView.category.toLowerCase()} phase
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-auto p-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-2xl font-extrabold">
                    ₹{quickView.price.toLocaleString()}
                  </div>
                  <div className="text-xs text-zinc-400 line-through">
                    ₹{quickView.mrp.toLocaleString()}
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
