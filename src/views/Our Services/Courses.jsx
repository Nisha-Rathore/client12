import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "../../components/Layout";
import {
  BookOpen,
  BadgeCheck,
  Users,
  Dumbbell,
  Download,
  Plus,
  Search,
  Filter,
  Star,
  Clock3,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis,
  BarChart,
  Bar,
} from "recharts";

// Courses page for a gym management site
// Plain React + Tailwind + shadcn/ui + framer-motion + recharts

const CATEGORIES = ["Strength", "Yoga", "Mobility", "Conditioning", "Nutrition"];

const MOCK_COURSES = [
  {
    id: "CR001",
    title: "8 Week Strength Foundation",
    category: "Strength",
    level: "Beginner",
    rating: 4.7,
    lessons: 28,
    duration: 12, // hours total
    coach: "Aarav",
    enrolled: 238,
    featured: true,
    cover: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "CR002",
    title: "Mobility Reset 30",
    category: "Mobility",
    level: "All Levels",
    rating: 4.5,
    lessons: 18,
    duration: 7,
    coach: "Ishita",
    enrolled: 167,
    featured: false,
    cover: "https://images.unsplash.com/photo-1526403226607-73aabc055c0b?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "CR003",
    title: "Power Yoga Flow",
    category: "Yoga",
    level: "Intermediate",
    rating: 4.8,
    lessons: 24,
    duration: 10,
    coach: "Zara",
    enrolled: 312,
    featured: true,
    cover: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "CR004",
    title: "Metcon Basics",
    category: "Conditioning",
    level: "Beginner",
    rating: 4.3,
    lessons: 14,
    duration: 5,
    coach: "Rohan",
    enrolled: 129,
    featured: false,
    cover: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "CR005",
    title: "Nutrition for Lifters",
    category: "Nutrition",
    level: "All Levels",
    rating: 4.6,
    lessons: 16,
    duration: 6,
    coach: "Neha",
    enrolled: 88,
    featured: false,
    cover: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1200&auto=format&fit=crop",
  },
];

const ENROLL_TREND = [
  { m: "Jan", value: 120 },
  { m: "Feb", value: 160 },
  { m: "Mar", value: 210 },
  { m: "Apr", value: 280 },
  { m: "May", value: 320 },
  { m: "Jun", value: 360 },
];

function Stat({ icon: Icon, label, value, hint }) {
  return (
    <Card className="border-0 bg-gradient-to-b from-zinc-900/60 to-zinc-950/80 ring-1 ring-zinc-800 text-white">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-zinc-400">{label}</CardTitle>
        <Icon className="h-5 w-5 text-zinc-400" />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-extrabold tracking-tight">{value}</div>
        {hint && <p className="text-xs text-zinc-400 mt-1">{hint}</p>}
      </CardContent>
    </Card>
  );
}

function Rating({ value }) {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  return (
    <div className="flex items-center gap-1 text-amber-400">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`h-4 w-4 ${i < full ? "fill-current" : half && i === full ? "fill-current opacity-50" : ""}`} />
      ))}
      <span className="ml-1 text-xs text-zinc-300">{value}</span>
    </div>
  );
}

function CourseCard({ c, onOpen }) {
  return (
    <motion.div layout initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="group overflow-hidden rounded-2xl ring-1 ring-zinc-800 bg-zinc-900/60">
      <div className="relative h-40 w-full">
        <img src={c.cover} alt={c.title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute left-3 top-3 flex items-center gap-2">
          {c.featured && <Badge className="bg-emerald-600 text-white"><Sparkles className="mr-1 h-3 w-3" />Featured</Badge>}
          <Badge className="bg-zinc-900/80 text-zinc-200">{c.category}</Badge>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-semibold text-white line-clamp-2">{c.title}</h3>
        </div>
        <div className="mt-1"><Rating value={c.rating} /></div>
        <div className="mt-3 grid grid-cols-3 gap-2 text-xs text-zinc-300">
          <div className="flex items-center gap-1"><Dumbbell className="h-4 w-4" />{c.level}</div>
          <div className="flex items-center gap-1"><BookOpen className="h-4 w-4" />{c.lessons} lessons</div>
          <div className="flex items-center gap-1"><Clock3 className="h-4 w-4" />{c.duration} hrs</div>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <div className="text-xs text-zinc-400">Coach {c.coach} • {c.enrolled} enrolled</div>
          <Button size="sm" className="bg-indigo-600 hover:bg-indigo-600/90" onClick={() => onOpen(c)}>View</Button>
        </div>
      </div>
    </motion.div>
  );
}

export default function Courses() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState();
  const [onlyFeatured, setOnlyFeatured] = useState(false);
  const [contrast, setContrast] = useState(true);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [sort, setSort] = useState("popular");

  const filtered = useMemo(() => {
    let list = MOCK_COURSES.filter((c) => {
      const match = [c.title, c.category, c.level, c.coach].some((v) => String(v).toLowerCase().includes(query.toLowerCase()));
      const cat = category ? c.category === category : true;
      const feat = onlyFeatured ? c.featured : true;
      return match && cat && feat;
    });
    if (sort === "popular") list = list.sort((a, b) => b.enrolled - a.enrolled);
    if (sort === "rating") list = list.sort((a, b) => b.rating - a.rating);
    if (sort === "new") list = list.sort((a, b) => a.id.localeCompare(b.id));
    return list;
  }, [query, category, onlyFeatured, sort]);

  function openCourse(c) { setSelected(c); setOpen(true); }

  return (
   <Layout>
     <div className={`min-h-screen w-full p-0 text-zinc-100 ${contrast ? "bg-gradient-to-br from-[#0B1020] via-[#0A1530] to-[#050A1A]" : "bg-zinc-950"}`}>
      <div className="flex">
        <main className="flex-1 p-6">
          <div className="mx-auto max-w-7xl space-y-6">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Courses</h1>
                <p className="text-zinc-400 mt-1">High quality programs your members will finish.</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <div className="hidden sm:flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm">
                  <span className="text-zinc-300">High contrast</span>
                  <Switch checked={contrast} onCheckedChange={setContrast} />
                </div>
                <Select value={sort} onValueChange={setSort}>
                  <SelectTrigger className="bg-zinc-900 border-zinc-800 text-white w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 text-white border-zinc-800">
                    <SelectItem value="popular">Most popular</SelectItem>
                    <SelectItem value="rating">Top rated</SelectItem>
                    <SelectItem value="new">Newest</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="bg-emerald-600 hover:bg-emerald-600/90"><Download className="mr-2 h-4 w-4" />Export</Button>
              </div>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Stat icon={Users} label="Enrollments" value="984" hint="active learners" />
              <Stat icon={BadgeCheck} label="Completion rate" value="78%" hint="last 30 days" />
              <Stat icon={BookOpen} label="Total courses" value={`${MOCK_COURSES.length}`} hint="published" />
              <Stat icon={Dumbbell} label="Avg rating" value="4.6" hint="weighted" />
            </div>

            {/* Trend + Filters */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
              <Card className="xl:col-span-2 border-zinc-800 bg-zinc-900/50">
                <CardHeader>
                  <CardTitle className="text-zinc-200">Enrollment trend</CardTitle>
                </CardHeader>
                <CardContent className="h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={ENROLL_TREND} barSize={24}>
                      <CartesianGrid vertical={false} stroke="#27272a" />
                      <XAxis dataKey="m" stroke="#a1a1aa" tickLine={false} axisLine={{ stroke: "#3f3f46" }} />
                      <YAxis stroke="#a1a1aa" tickLine={false} axisLine={{ stroke: "#3f3f46" }} />
                      <Tooltip contentStyle={{ background: "#09090b", border: "1px solid #27272a", borderRadius: 12 }} />
                      <Bar dataKey="value" radius={[6,6,0,0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="border-zinc-800 bg-zinc-900/50">
                <CardHeader>
                  <CardTitle className="text-zinc-200">Quick filters</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                    <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search title, coach, keyword" className="pl-9 bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-500" />
                  </div>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="bg-zinc-900 border-zinc-800 text-white">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-900 text-white border-zinc-800">
                      {CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2">
                    <div className="text-sm">
                      <div className="text-zinc-300">Only featured</div>
                      <div className="text-xs text-zinc-500">Show promoted courses</div>
                    </div>
                    <Switch checked={onlyFeatured} onCheckedChange={setOnlyFeatured} />
                  </div>
                  <div className="flex gap-2">
                    <Button className="flex-1 bg-indigo-600 hover:bg-indigo-600/90"><Filter className="mr-2 h-4 w-4" />Apply</Button>
                    <Button variant="secondary" className="flex-1 bg-zinc-800 text-white hover:bg-zinc-700"><Plus className="mr-2 h-4 w-4" />New course</Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Courses grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <AnimatePresence>
                {filtered.map((c) => (
                  <CourseCard key={c.id} c={c} onOpen={openCourse} />
                ))}
              </AnimatePresence>
              {filtered.length === 0 && (
                <Card className="border-zinc-800 bg-zinc-900/40 sm:col-span-2 lg:col-span-3">
                  <CardContent className="p-8 text-center text-zinc-400">No courses match your filters.</CardContent>
                </Card>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Course dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="border-zinc-800 bg-zinc-900 text-white sm:max-w-[560px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-lg font-bold">
              <BookOpen className="h-5 w-5" /> {selected?.title}
            </DialogTitle>
            <DialogDescription className="text-zinc-400">{selected?.category} • {selected?.level} • Coach {selected?.coach}</DialogDescription>
          </DialogHeader>
          {selected && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <Card className="bg-zinc-950 border-zinc-800"><CardHeader className="py-3"><CardTitle className="text-sm text-zinc-300">Lessons</CardTitle></CardHeader><CardContent className="pt-0 text-sm text-zinc-300">{selected.lessons}</CardContent></Card>
                <Card className="bg-zinc-950 border-zinc-800"><CardHeader className="py-3"><CardTitle className="text-sm text-zinc-300">Duration</CardTitle></CardHeader><CardContent className="pt-0 text-sm text-zinc-300">{selected.duration} hours</CardContent></Card>
                <Card className="bg-zinc-950 border-zinc-800"><CardHeader className="py-3"><CardTitle className="text-sm text-zinc-300">Enrolled</CardTitle></CardHeader><CardContent className="pt-0 text-sm text-zinc-300">{selected.enrolled}</CardContent></Card>
              </div>
              <div className="flex gap-2">
                <Button className="flex-1 bg-indigo-600 hover:bg-indigo-600/90">Edit course</Button>
                <Button variant="secondary" className="flex-1 bg-zinc-800 text-white hover:bg-zinc-700">Share</Button>
              </div>
              <DialogFooter>
                <Button variant="secondary" className="bg-zinc-800 text-white hover:bg-zinc-700">Close</Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
   </Layout>
  );
}
