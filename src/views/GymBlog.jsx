import React, { useMemo, useState } from "react";
import Layout from "../components/Layout";

// Gym Blog page for a gym management website
// Dark, bold, dynamic UI inspired by the provided dashboard style
// Tailwind only, no TypeScript

export default function GymBlog() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [range, setRange] = useState("7");
  const [highContrast, setHighContrast] = useState(false);
  const [tagFilter, setTagFilter] = useState("all");
  const [page, setPage] = useState(1);

  const categories = [
    { key: "all", label: "All" },
    { key: "training", label: "Training" },
    { key: "nutrition", label: "Nutrition" },
    { key: "recovery", label: "Recovery" },
    { key: "mindset", label: "Mindset" },
    { key: "news", label: "Club news" },
  ];

  const tags = ["hiit", "strength", "flexibility", "fatloss", "protein", "mobility", "recipe", "supplements", "coachTips", "beginners"];

  const posts = [
    {
      id: 1,
      title: "The 30 minute strength stack",
      excerpt: "Three compound moves. Smart rest. Real gains.",
      category: "training",
      tags: ["strength", "beginners"],
      author: "Coach Maya",
      time: "6 min read",
      cover: "https://images.unsplash.com/photo-1517341723568-d8e2f8d78ccf?q=80&w=1200&auto=format&fit=crop",
      stat: { views: 3100, likes: 420, comments: 32 },
      featured: true,
      date: "2025-10-02",
    },
    {
      id: 2,
      title: "Protein made simple",
      excerpt: "How much, when, and from where.",
      category: "nutrition",
      tags: ["protein"],
      author: "Ritika",
      time: "4 min read",
      cover: "https://images.unsplash.com/photo-1542691457-cbe4df041eb2?q=80&w=1200&auto=format&fit=crop",
      stat: { views: 2100, likes: 310, comments: 18 },
      featured: false,
      date: "2025-10-01",
    },
    {
      id: 3,
      title: "Mobility reset after leg day",
      excerpt: "Bring back range without losing strength.",
      category: "recovery",
      tags: ["mobility", "flexibility"],
      author: "Anish",
      time: "5 min read",
      cover: "https://images.unsplash.com/photo-1546484959-f3abce5f7d23?q=80&w=1200&auto=format&fit=crop",
      stat: { views: 1800, likes: 220, comments: 14 },
      featured: false,
      date: "2025-09-29",
    },
    {
      id: 4,
      title: "HIIT that respects your joints",
      excerpt: "Power sessions without the pain.",
      category: "training",
      tags: ["hiit", "fatloss"],
      author: "Coach Vikram",
      time: "7 min read",
      cover: "https://images.unsplash.com/photo-1607968565040-6161c88d6d55?q=80&w=1200&auto=format&fit=crop",
      stat: { views: 3900, likes: 560, comments: 41 },
      featured: true,
      date: "2025-09-28",
    },
    {
      id: 5,
      title: "Sleep like an athlete",
      excerpt: "Recovery rules that actually stick.",
      category: "recovery",
      tags: ["mindset"],
      author: "Nisha",
      time: "5 min read",
      cover: "https://images.unsplash.com/photo-1511295742362-92c96b7d3e83?q=80&w=1200&auto=format&fit=crop",
      stat: { views: 1250, likes: 140, comments: 9 },
      featured: false,
      date: "2025-09-25",
    },
    {
      id: 6,
      title: "New class timetable for October",
      excerpt: "More early morning slots and a fresh spin format.",
      category: "news",
      tags: ["club"],
      author: "Team IronBase",
      time: "2 min read",
      cover: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop",
      stat: { views: 960, likes: 88, comments: 6 },
      featured: false,
      date: "2025-09-23",
    },
    {
      id: 7,
      title: "Prehab for desk athletes",
      excerpt: "Undo eight hours of sitting with ten minutes of smart work.",
      category: "mindset",
      tags: ["mobility", "coachTips"],
      author: "Coach Aisha",
      time: "6 min read",
      cover: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1200&auto=format&fit=crop",
      stat: { views: 1780, likes: 210, comments: 12 },
      featured: false,
      date: "2025-09-20",
    },
  ];

  const pageSize = 6;

  const filtered = useMemo(() => {
    return posts
      .filter(p => (category === "all" ? true : p.category === category))
      .filter(p => (tagFilter === "all" ? true : p.tags.includes(tagFilter)))
      .filter(p => `${p.title} ${p.excerpt} ${p.tags.join(" ")}`.toLowerCase().includes(query.toLowerCase()))
      .sort((a, b) => (b.featured === a.featured ? new Date(b.date) - new Date(a.date) : b.featured - a.featured));
  }, [category, tagFilter, query]);

  const paged = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));

  const gradient = highContrast ? "from-teal-200 via-teal-300 to-teal-200" : "from-teal-50 via-teal-100 to-teal-50";

  return (
   <Layout>
     <div className={`min-h-screen w-full bg-gray-50 text-gray-900`}>
      <div className="mx-auto max-w-7xl px-4 py-6">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Gym Blog</h1>
            <p className="mt-1 text-sm text-gray-600">Fresh workouts, real nutrition, sharp recovery tips. Clean visuals. Quick reads.</p>
          </div>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-xs text-gray-700">
              <span>High contrast</span>
              <input type="checkbox" checked={highContrast} onChange={e=>setHighContrast(e.target.checked)} />
            </label>
            <select value={range} onChange={e=>setRange(e.target.value)} className="rounded-xl bg-white px-3 py-2 text-xs border border-gray-300 focus:outline-none">
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
            </select>
            <button className="rounded-xl bg-teal-500 px-4 py-2 text-sm font-semibold text-teal-50 shadow-lg shadow-teal-500/30 hover:brightness-110">Export</button>
          </div>
        </div>

        {/* Top row: Featured + Subscribe */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {posts.filter(p=>p.featured).slice(0,2).map(p => (
              <article key={p.id} className="group relative overflow-hidden rounded-2xl border border-teal-200/50 bg-white hover:border-teal-300 shadow-sm">
                <div className="aspect-[16/9] w-full overflow-hidden">
                  <img src={p.cover} alt="cover" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                </div>
                <div className="p-4">
                  <div className="mb-1 flex items-center gap-2 text-xs">
                    <span className="rounded bg-teal-500/20 px-2 py-1 text-teal-700">Featured</span>
                    <span className="rounded bg-gray-100 px-2 py-1 text-gray-700">{p.category}</span>
                    <span className="text-gray-500">{p.time}</span>
                  </div>
                  <h3 className="text-lg font-semibold leading-tight">{p.title}</h3>
                  <p className="mt-1 line-clamp-2 text-sm text-gray-600">{p.excerpt}</p>
                  <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                    <span>By {p.author}</span>
                    <div className="flex items-center gap-3">
                      <span>👁 {p.stat.views}</span>
                      <span>❤ {p.stat.likes}</span>
                      <span>💬 {p.stat.comments}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="rounded-2xl border border-gray-300 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold">Subscribe</h3>
            <p className="mt-1 text-sm text-gray-600">One weekly email. New workouts, real food ideas, and member stories.</p>
            <div className="mt-3 flex gap-2">
              <input placeholder="Your email" className="w-full rounded-xl bg-gray-100 px-3 py-2 text-sm border border-gray-300 focus:outline-none" />
              <button className="rounded-xl bg-teal-500 px-4 py-2 text-sm font-semibold text-teal-50 hover:brightness-110">Join</button>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3 text-center text-xs">
              <div className="rounded-xl border border-gray-300 bg-gray-100 p-3">
                <div className="text-2xl font-bold">48%</div>
                <div className="text-gray-600">Open rate</div>
              </div>
              <div className="rounded-xl border border-gray-300 bg-gray-100 p-3">
                <div className="text-2xl font-bold">5.7k</div>
                <div className="text-gray-600">Clicks</div>
              </div>
              <div className="rounded-xl border border-gray-300 bg-gray-100 p-3">
                <div className="text-2xl font-bold">0.3%</div>
                <div className="text-gray-600">Unsubs</div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mt-6 rounded-2xl border border-gray-300 bg-white p-4 shadow-sm">
          <div className="grid items-center gap-3 md:grid-cols-3">
            <div className="flex flex-wrap gap-2">
              {categories.map(c => (
                <button key={c.key} onClick={()=>{ setCategory(c.key); setPage(1); }} className={`rounded-xl px-3 py-2 text-sm ring-1 ring-gray-300 ${category===c.key?"bg-teal-500 text-teal-50 font-semibold shadow-lg shadow-teal-500/30":"bg-gray-100 text-gray-700"}`}>{c.label}</button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              <button onClick={()=>{ setTagFilter("all"); setPage(1); }} className={`rounded-xl px-3 py-2 text-xs ring-1 ring-gray-300 ${tagFilter==="all"?"bg-teal-500 text-teal-50 font-semibold":"bg-gray-100 text-gray-700"}`}>All tags</button>
              <div className="flex gap-2 overflow-auto">
                {tags.map(t => (
                  <button key={t} onClick={()=>{ setTagFilter(t); setPage(1); }} className={`whitespace-nowrap rounded-xl px-3 py-2 text-xs ring-1 ring-gray-300 ${tagFilter===t?"bg-teal-500 text-teal-50 font-semibold":"bg-gray-100 text-gray-700"}`}>#{t}</button>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-end gap-2">
              <input value={query} onChange={e=>{ setQuery(e.target.value); setPage(1); }} placeholder="Search posts" className="w-full rounded-xl bg-gray-100 px-3 py-2 text-sm border border-gray-300 focus:outline-none md:w-64" />
              <button className="rounded-xl bg-gray-200 px-4 py-2 text-sm text-gray-700">Clear</button>
            </div>
          </div>
        </div>

        {/* Posts grid */}
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {paged.map(p => (
            <article key={p.id} className="group relative overflow-hidden rounded-2xl border border-teal-200/50 bg-white hover:border-teal-300 shadow-sm">
              <div className="aspect-[16/9] w-full overflow-hidden">
                <img src={p.cover} alt="cover" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
              </div>
              <div className="p-4">
                <div className="mb-1 flex items-center gap-2 text-xs">
                  <span className="rounded bg-gray-100 px-2 py-1 text-gray-700">{p.category}</span>
                  <span className="text-gray-500">{p.time}</span>
                </div>
                <h3 className="text-lg font-semibold leading-tight">{p.title}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-gray-600">{p.excerpt}</p>
                <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                  <span>By {p.author}</span>
                  <div className="flex items-center gap-3">
                    <span>👁 {p.stat.views}</span>
                    <span>❤ {p.stat.likes}</span>
                    <span>💬 {p.stat.comments}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-gray-600">Showing {(page-1)*pageSize+1}-{Math.min(page*pageSize, filtered.length)} of {filtered.length}</div>
          <div className="flex items-center gap-2">
            <button onClick={()=>setPage(p=>Math.max(1, p-1))} className="rounded-xl bg-gray-200 px-3 py-2 text-sm text-gray-700 disabled:opacity-50" disabled={page===1}>Prev</button>
            <div className="rounded-xl bg-gray-100 px-3 py-2 text-sm text-gray-700">Page {page} of {totalPages}</div>
            <button onClick={()=>setPage(p=>Math.min(totalPages, p+1))} className="rounded-xl bg-gray-200 px-3 py-2 text-sm text-gray-700 disabled:opacity-50" disabled={page===totalPages}>Next</button>
          </div>
        </div>

        {/* Sidebar strip: editors pick scroller */}
        <div className="mt-8 rounded-2xl border border-gray-300 bg-white p-4 shadow-sm">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-lg font-semibold">Editor picks</h3>
            <a href="#" className="text-sm text-teal-500 hover:underline">View all</a>
          </div>
          <div className="no-scrollbar flex gap-4 overflow-x-auto">
            {posts.slice(0,6).map(p => (
              <div key={p.id} className="min-w-[260px] overflow-hidden rounded-2xl border border-gray-300 bg-gray-100">
                <div className="h-28 w-full overflow-hidden">
                  <img src={p.cover} alt="cover" className="h-full w-full object-cover" />
                </div>
                <div className="p-3">
                  <p className="line-clamp-2 text-sm font-semibold">{p.title}</p>
                  <p className="mt-1 line-clamp-2 text-xs text-gray-600">{p.excerpt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Write a post CTA */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-gray-300 bg-white p-6 lg:col-span-2 shadow-sm">
            <h3 className="text-xl font-semibold">Got a tip or a story</h3>
            <p className="mt-1 text-sm text-gray-600">Share your routine, a quick recipe, or your first PR. We review every post.</p>
            <div className="mt-3 flex gap-2">
              <input placeholder="Title" className="w-full rounded-xl bg-gray-100 px-3 py-2 text-sm border border-gray-300 focus:outline-none" />
              <button className="rounded-xl bg-teal-500 px-4 py-2 text-sm font-semibold text-teal-50 hover:brightness-110">Start draft</button>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-300 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold">House rules</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-600">
              <li>Real results. Real names. No spam.</li>
              <li>Be clear. Be kind. Cite sources when you can.</li>
              <li>Opt out any time. Privacy first.</li>
            </ul>
          </div>
        </div>

        <footer className="mt-10 border-t border-gray-300 py-6 text-center text-xs text-gray-600">© {new Date().getFullYear()} IronBase Gym. All rights reserved.</footer>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
   </Layout>
  );
}
