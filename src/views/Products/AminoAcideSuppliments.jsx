import React, { useMemo, useState } from "react"
import Layout from "../../components/Layout";

// Amino Acid Supplements Catalog - React + Tailwind, no TypeScript
// Light dashboard-style catalog like your screenshot
// Drop this component into your app and route to it. Tailwind must be configured.

const CATEGORIES = ["All", "BCAA", "EAA", "Glutamine", "Citrulline", "Arginine"]
const FLAVORS = ["Blue Raspberry", "Watermelon", "Lemon Lime", "Mango", "Grape", "Unflavoured"]




// 20 explicit products with unique images
const PRODUCTS = [
  {
    id: "aa-1",
    name: "BCAA Surge 2:1:1",
    category: "BCAA",
    flavor: "Blue Raspberry",
    grams: 300,
    servings: 60,
    activeLabel: "BCAAs",
    activeValue: 7,
    rating: 4.6,
    reviews: 128,
    price: 1199,
    mrp: 1499,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTabhw5EnGYgT7n58svRnYKqDF43baD-TWlrA&s",
    tags: ["Sugar Free", "Value Pack"]
  },
  {
    id: "aa-2",
    name: "EAA Matrix 9",
    category: "EAA",
    flavor: "Watermelon",
    grams: 250,
    servings: 50,
    activeLabel: "EAAs",
    activeValue: 10,
    rating: 4.5,
    reviews: 102,
    price: 1299,
    mrp: 1599,
    image: "https://m.media-amazon.com/images/I/61ujdXsg-BL._UF350,350_QL80_.jpg",
    tags: ["Vegan Friendly"]
  },
  {
    id: "aa-3",
    name: "Glutamine Micronized",
    category: "Glutamine",
    flavor: "Unflavoured",
    grams: 300,
    servings: 60,
    activeLabel: "Glutamine",
    activeValue: 5,
    rating: 4.4,
    reviews: 76,
    price: 999,
    mrp: 1299,
    image: "https://m.media-amazon.com/images/I/61+oB5KMMUL._UF1000,1000_QL80_.jpg",
    tags: ["Sugar Free"]
  },
  {
    id: "aa-4",
    name: "Citrulline Malate 2:1",
    category: "Citrulline",
    flavor: "Lemon Lime",
    grams: 250,
    servings: 50,
    activeLabel: "Citrulline",
    activeValue: 6,
    rating: 4.7,
    reviews: 141,
    price: 1099,
    mrp: 1399,
    image: "https://i5.walmartimages.com/seo/CON-CRET-Patented-Creatine-HCl-Lemon-Lime-Powder-Workout-Supplement-48-Servings_b29572d9-ec3e-420f-baa8-cae2f93fe261.4d6a31efe84d66d91dc5fdd86a0a44d3.png?odnHeight=320&odnWidth=320&odnBg=FFFFFF",
    tags: ["Vegan Friendly"]
  },
  {
    id: "aa-5",
    name: "Arginine AKG Pump",
    category: "Arginine",
    flavor: "Grape",
    grams: 250,
    servings: 50,
    activeLabel: "Arginine",
    activeValue: 5,
    rating: 4.2,
    reviews: 64,
    price: 899,
    mrp: 1199,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAQJU4CEbCuB6fG4Eu3RIl3w7D5zje0kKItA&s",
    tags: ["Sugar Free"]
  },
  {
    id: "aa-6",
    name: "BCAA + Electrolytes",
    category: "BCAA",
    flavor: "Mango",
    grams: 350,
    servings: 70,
    activeLabel: "BCAAs",
    activeValue: 8,
    rating: 4.3,
    reviews: 95,
    price: 1399,
    mrp: 1699,
    image: "https://m.media-amazon.com/images/I/71oNq0vFStL._UF350,350_QL80_.jpg",
    tags: ["Value Pack"]
  },
  {
    id: "aa-7",
    name: "EAA Zero Sugar",
    category: "EAA",
    flavor: "Blue Raspberry",
    grams: 300,
    servings: 60,
    activeLabel: "EAAs",
    activeValue: 9,
    rating: 4.5,
    reviews: 110,
    price: 1349,
    mrp: 1649,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-f5u1XsTyiuZjuWEKYAwndckEJBf1vylacvOCVepKpTulQTdkvfLuFpVeenCXtLSh_aY&usqp=CAU",
    tags: ["Sugar Free"]
  },
  {
    id: "aa-8",
    name: "Glutamine + Vitamin C",
    category: "Glutamine",
    flavor: "Lemon Lime",
    grams: 350,
    servings: 70,
    activeLabel: "Glutamine",
    activeValue: 5,
    rating: 4.3,
    reviews: 67,
    price: 1099,
    mrp: 1399,
    image: "https://www.nutritionwarehouse.co.nz/cdn/shop/files/ehp-labs-oxyshred-hardcore-lemon-sherbet_500x500.png?v=1750979745",
    tags: ["Value Pack"]
  },
  {
    id: "aa-9",
    name: "Citrulline Ultra",
    category: "Citrulline",
    flavor: "Watermelon",
    grams: 300,
    servings: 60,
    activeLabel: "Citrulline",
    activeValue: 8,
    rating: 4.6,
    reviews: 122,
    price: 1249,
    mrp: 1549,
    image: "https://m.media-amazon.com/images/I/61hsR6y9X+L._UF1000,1000_QL80_.jpg",
    tags: ["Sugar Free"]
  },
  {
    id: "aa-10",
    name: "Arginine Pure",
    category: "Arginine",
    flavor: "Unflavoured",
    grams: 300,
    servings: 60,
    activeLabel: "Arginine",
    activeValue: 6,
    rating: 4.1,
    reviews: 58,
    price: 949,
    mrp: 1249,
    image: "https://m.media-amazon.com/images/I/61q3FRFGX3L.jpg_BO30,255,255,255_UF800,800_SR1910,1000,0,C_PIRIOTHREEANDHALF-medium,TopLeft,30,880_ZJPHNwYW4gZm9yZWdyb3VuZD0iIzU2NTk1OSIgZm9udD0iQW1hem9uRW1iZXIgNTAiID42NTwvc3Bhbj4=,500,883,420,420,0,0_PIin-overlay-frame,TopLeft,0,0_QL100_.jpg",
    tags: ["Vegan Friendly"]
  },
  {
    id: "aa-11",
    name: "BCAA Fermented 4:1:1",
    category: "BCAA",
    flavor: "Grape",
    grams: 250,
    servings: 50,
    activeLabel: "BCAAs",
    activeValue: 8,
    rating: 4.4,
    reviews: 84,
    price: 1199,
    mrp: 1499,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3lsPfR5ciLmVcjgymLdd2DP-Ff6EaOV_xQJCr2YqztbNQmd7JdNtBEV23cTCskmxGAdk&usqp=CAU",
    tags: ["Vegan Friendly"]
  },
  {
    id: "aa-12",
    name: "EAA Hydrate Advanced",
    category: "EAA",
    flavor: "Mango",
    grams: 300,
    servings: 60,
    activeLabel: "EAAs",
    activeValue: 10,
    rating: 4.5,
    reviews: 133,
    price: 1399,
    mrp: 1699,
    image: "https://m.media-amazon.com/images/I/71zYaDycUFL._UF894,1000_QL80_.jpg",
    tags: ["Sugar Free"]
  },
  {
    id: "aa-13",
    name: "Glutamine Recovery",
    category: "Glutamine",
    flavor: "Unflavoured",
    grams: 250,
    servings: 50,
    activeLabel: "Glutamine",
    activeValue: 5,
    rating: 4.2,
    reviews: 60,
    price: 899,
    mrp: 1199,
    image: "https://m.media-amazon.com/images/I/71HrvA+Eh+L._UF1000,1000_QL80_.jpg",
    tags: ["Sugar Free"]
  },
  {
    id: "aa-14",
    name: "Citrulline Max Endurance",
    category: "Citrulline",
    flavor: "Grape",
    grams: 350,
    servings: 70,
    activeLabel: "Citrulline",
    activeValue: 7,
    rating: 4.6,
    reviews: 97,
    price: 1299,
    mrp: 1599,
    image: "https://www.gosupps.com/media/catalog/product/6/1/610TRWOKMzL.jpg",
    tags: ["Value Pack"]
  },
  {
    id: "aa-15",
    name: "Arginine AKG Pro",
    category: "Arginine",
    flavor: "Lemon Lime",
    grams: 250,
    servings: 50,
    activeLabel: "Arginine",
    activeValue: 5,
    rating: 4.0,
    reviews: 52,
    price: 899,
    mrp: 1199,
    image: "https://www.nutrabliss.in/cdn/shop/products/L-Arginine_LemonLime_Front.jpg?v=1716808820&width=1946",
    tags: ["Vegan Friendly"]
  },
  {
    id: "aa-16",
    name: "BCAA Energy",
    category: "BCAA",
    flavor: "Watermelon",
    grams: 300,
    servings: 60,
    activeLabel: "BCAAs",
    activeValue: 7,
    rating: 4.3,
    reviews: 71,
    price: 1149,
    mrp: 1449,
    image: "https://d2crvu6tosum4d.cloudfront.net/media/listing/Prime-BCAA/gxn-prime-bcaa-60-servings-watermelon-1.jpg",
    tags: ["Sugar Free"]
  },
  {
    id: "aa-17",
    name: "EAA + Electrolytes",
    category: "EAA",
    flavor: "Blue Raspberry",
    grams: 350,
    servings: 70,
    activeLabel: "EAAs",
    activeValue: 9,
    rating: 4.5,
    reviews: 120,
    price: 1449,
    mrp: 1749,
    image: "https://m.media-amazon.com/images/I/61OSADCK9NL._UF350,350_QL80_.jpg",
    tags: ["Value Pack"]
  },
  {
    id: "aa-18",
    name: "Glutamine Clean",
    category: "Glutamine",
    flavor: "Unflavoured",
    grams: 300,
    servings: 60,
    activeLabel: "Glutamine",
    activeValue: 5,
    rating: 4.3,
    reviews: 66,
    price: 1049,
    mrp: 1349,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGG5m8m5wn6UTtlzGU_5h_4owl0jv1gDgfyA&s",
    tags: ["Sugar Free"]
  },
  {
    id: "aa-19",
    name: "Citrulline Pump",
    category: "Citrulline",
    flavor: "Mango",
    grams: 250,
    servings: 50,
    activeLabel: "Citrulline",
    activeValue: 6,
    rating: 4.4,
    reviews: 81,
    price: 1099,
    mrp: 1399,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz2rWnZQRh9QHMfaClWecCsDSzs_EHaFoPig&s",
    tags: ["Vegan Friendly"]
  },
  {
    id: "aa-20",
    name: "Arginine Performance",
    category: "Arginine",
    flavor: "Grape",
    grams: 350,
    servings: 70,
    activeLabel: "Arginine",
    activeValue: 6,
    rating: 4.1,
    reviews: 59,
    price: 999,
    mrp: 1299,
    image: "https://m.media-amazon.com/images/I/71oLLgANBAL._UF350,350_QL80_.jpg",
    tags: ["Value Pack"]
  }
];


function Badge({ children }) {
  return <span className="px-2 py-1 rounded-lg text-[10px] font-semibold bg-gray-100 ring-1 ring-gray-300">{children}</span>
}

function Rating({ value }) {
  const full = Math.floor(value)
  const half = value - full >= 0.5
  const stars = new Array(5).fill(0).map((_, i) => {
    if (i < full) return "★"
    if (i === full && half) return "⯪"
    return "☆"
  })
  return <span className="text-amber-400">{stars.join(" ")}</span>
}

export default function AminoAcidSupplements() {
  const [tab, setTab] = useState("All")
  const [search, setSearch] = useState("")
  const [sortBy, setSortBy] = useState("popular")
  const [quick, setQuick] = useState(null)

  const list = useMemo(() => {
    let l = PRODUCTS.filter(p => (tab === "All" || p.category === tab) && p.name.toLowerCase().includes(search.toLowerCase()))
    if (sortBy === "priceLow") l = [...l].sort((a, b) => a.price - b.price)
    if (sortBy === "priceHigh") l = [...l].sort((a, b) => b.price - a.price)
    if (sortBy === "rating") l = [...l].sort((a, b) => b.rating - a.rating)
    return l
  }, [tab, search, sortBy])

  return (
  <Layout>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white text-gray-900">

      <div className="mx-auto max-w-7xl px-4 md:px-8 py-6 md:py-10">
        <header className="mb-6">
          <h1 className="text-3xl md:text-5xl font-black tracking-tight">Amino Acid Supplements</h1>
          <p className="text-gray-600 mt-1">Bold cards. Smooth filters. Clean visuals like your dashboard.</p>
        </header>

        {/* controls */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
          <div className="flex gap-2 bg-gray-100 p-1 rounded-xl ring-1 ring-gray-300 w-fit">
            {CATEGORIES.map(c => (
              <button key={c} onClick={() => setTab(c)} className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${tab === c ? "bg-emerald-500" : "hover:bg-gray-200"}`}>{c}</button>
            ))}
          </div>
          <div className="md:ml-auto grid grid-cols-1 sm:grid-cols-3 gap-3 w-full md:w-auto">
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products" className="bg-gray-100 ring-1 ring-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
            <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="bg-gray-100 ring-1 ring-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500">
              <option value="popular">Sort by popular</option>
              <option value="priceLow">Price: Low to High</option>
              <option value="priceHigh">Price: High to Low</option>
              <option value="rating">Top rated</option>
            </select>
            <button className="bg-gray-100 ring-1 ring-gray-300 rounded-lg px-4 py-2 text-sm hover:bg-gray-200">Export list</button>
          </div>
        </div>

        {/* grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {list.map(p => (
            <div key={p.id} className="group rounded-2xl overflow-hidden bg-white ring-1 ring-gray-200 hover:ring-emerald-500/60 transition shadow-lg hover:shadow-emerald-500/30">
              <div className="relative aspect-square overflow-hidden">
                <img src={p.image} alt={p.name} className="h-full w-full object-cover group-hover:scale-[1.03] transition" />
                <div className="absolute left-3 top-3 flex gap-2">{p.tags.map(t => <Badge key={t}>{t}</Badge>)}</div>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-lg leading-tight text-gray-900">{p.name}</h3>
                    <div className="text-xs text-gray-600">{p.category} · {p.flavor}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm"><Rating value={p.rating} /></div>
                    <div className="text-[11px] text-gray-600">{p.reviews} reviews</div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
                  <div className="rounded-lg bg-gray-100 ring-1 ring-gray-300 p-2"><div className="text-gray-700">Net wt</div><div className="font-semibold text-gray-900">{p.grams} g</div></div>
                  <div className="rounded-lg bg-gray-100 ring-1 ring-gray-300 p-2"><div className="text-gray-700">Servings</div><div className="font-semibold text-gray-900">{p.servings}</div></div>
                  <div className="rounded-lg bg-gray-100 ring-1 ring-gray-300 p-2"><div className="text-gray-700">{p.activeLabel}</div><div className="font-semibold text-gray-900">{p.activeValue} g</div></div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-extrabold text-gray-900">₹{p.price.toLocaleString()}</div>
                    <div className="text-xs text-gray-600 line-through">₹{p.mrp.toLocaleString()}</div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setQuick(p)} className="px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm text-gray-900">View</button>
                    <button className="px-3 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 font-semibold text-sm text-white">Add</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick view */}
      <div className={`fixed inset-0 z-50 ${quick ? "" : "pointer-events-none"}`}>
        <div onClick={() => setQuick(null)} className={`absolute inset-0 bg-black/50 transition-opacity ${quick ? "opacity-100" : "opacity-0"}`} />
        <div className={`absolute right-0 top-0 h-full w-full sm:w-[32rem] bg-white ring-1 ring-gray-200 transition-transform ${quick ? "translate-x-0" : "translate-x-full"}`}>
          {quick && (
            <div className="h-full flex flex-col">
              <div className="p-4 flex items-center justify-between border-b border-gray-200">
                <div>
                  <div className="text-xs text-gray-600">{quick.category} · {quick.flavor}</div>
                  <h3 className="text-xl font-bold text-gray-900">{quick.name}</h3>
                </div>
                <button onClick={() => setQuick(null)} className="px-3 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-900">Close</button>
              </div>

              <div className="p-4 overflow-auto space-y-4">
                <img src={quick.image} alt={quick.name} className="w-full h-56 object-cover rounded-xl ring-1 ring-gray-200" />

                <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
                  <div className="rounded-lg bg-gray-100 ring-1 ring-gray-300 p-2"><div className="text-gray-700">Net wt</div><div className="font-semibold text-gray-900">{quick.grams} g</div></div>
                  <div className="rounded-lg bg-gray-100 ring-1 ring-gray-300 p-2"><div className="text-gray-700">Servings</div><div className="font-semibold text-gray-900">{quick.servings}</div></div>
                  <div className="rounded-lg bg-gray-100 ring-1 ring-gray-300 p-2"><div className="text-gray-700">{quick.activeLabel}</div><div className="font-semibold text-gray-900">{quick.activeValue} g</div></div>
                </div>

                <div className="rounded-xl bg-gray-100 ring-1 ring-gray-300 p-4">
                  <h4 className="font-semibold mb-2 text-gray-900">Highlights</h4>
                  <ul className="text-sm text-gray-700 list-disc list-inside space-y-1">
                    <li>Batch tested and clean label</li>
                    <li>Great mixability and taste</li>
                    <li>Designed for performance and recovery</li>
                  </ul>
                </div>
              </div>

              <div className="mt-auto p-4 border-t border-gray-200 flex items-center justify-between">
                <div>
                  <div className="text-2xl font-extrabold text-gray-900">₹{quick.price.toLocaleString()}</div>
                  <div className="text-xs text-gray-600 line-through">₹{quick.mrp.toLocaleString()}</div>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-900">Add to wishlist</button>
                  <button className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 font-semibold text-white">Add to cart</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  </Layout>
  )
}