import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "../../components/Layout";
import {
  CalendarDays,
  Clock3,
  Users,
  Dumbbell,
  Download,
  Plus,
  ChevronLeft,
  ChevronRight,
  Filter,
  Building2,
  MonitorSmartphone,
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
} from "recharts";

// Classes & Schedules screen for a gym site (plain React + Tailwind)

const ROOMS = ["Main Studio", "Spin Studio", "Strength Zone", "Yoga Loft"];
const INSTRUCTORS = ["Aarav", "Neha", "Rohan", "Ishita", "Kabir", "Zara"];

const MOCK_CLASSES = [
  { id: "C001", title: "Power HIIT", type: "HIIT", day: 1, start: 6, end: 7, room: "Main Studio", instructor: "Aarav", cap: 24, booked: 22 },
  { id: "C002", title: "Vinyasa Flow", type: "Yoga", day: 1, start: 7, end: 8, room: "Yoga Loft", instructor: "Zara", cap: 18, booked: 14 },
  { id: "C003", title: "Spin Express", type: "Spin", day: 2, start: 18, end: 19, room: "Spin Studio", instructor: "Neha", cap: 20, booked: 20 },
  { id: "C004", title: "Strength Camp", type: "Strength", day: 3, start: 7, end: 8, room: "Strength Zone", instructor: "Rohan", cap: 16, booked: 9 },
  { id: "C005", title: "Mobility Reset", type: "Mobility", day: 4, start: 19, end: 20, room: "Main Studio", instructor: "Ishita", cap: 22, booked: 12 },
  { id: "C006", title: "Pilates Core", type: "Pilates", day: 5, start: 8, end: 9, room: "Main Studio", instructor: "Zara", cap: 18, booked: 17 },
  { id: "C007", title: "Beginner Strength", type: "Strength", day: 6, start: 10, end: 11, room: "Strength Zone", instructor: "Kabir", cap: 14, booked: 6 },
];

const ATTENDANCE = [
  { d: "Mon", a: 86 },
  { d: "Tue", a: 72 },
  { d: "Wed", a: 94 },
  { d: "Thu", a: 61 },
  { d: "Fri", a: 68 },
  { d: "Sat", a: 91 },
  { d: "Sun", a: 77 },
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

export default function ClassesSchedules() {
  const [query, setQuery] = useState("");
  const [room, setRoom] = useState();
  const [instructor, setInstructor] = useState();
  const [contrast, setContrast] = useState(true);
  const [view, setView] = useState("week");
  const [dayIndex, setDayIndex] = useState(1); // 1 Mon .. 7 Sun
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const classes = useMemo(() => {
    return MOCK_CLASSES.filter((c) => {
      const matches = [c.title, c.type, c.room, c.instructor].some((v) =>
        String(v).toLowerCase().includes(query.toLowerCase())
      );
      const r = room ? c.room === room : true;
      const i = instructor ? c.instructor === instructor : true;
      const byView = view === "day" ? c.day === dayIndex : true;
      return matches && r && i && byView;
    });
  }, [query, room, instructor, view, dayIndex]);

  const hours = Array.from({ length: 16 }, (_, i) => i + 6); // 6 to 21
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]; // 1..7

  function openClass(c) {
    setSelected(c);
    setOpen(true);
  }

  return (
    <Layout>
        <div
      className={`min-h-screen w-full p-0 text-zinc-100 ${
        contrast
          ? "bg-gradient-to-br from-[#0B1020] via-[#0A1530] to-[#050A1A]"
          : "bg-zinc-950"
      }`}
    >
      <div className="flex">

        {/* Main */}
        <main className="flex-1 p-6">
          <div className="mx-auto max-w-7xl space-y-6">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Classes and schedules</h1>
                <p className="text-zinc-400 mt-1">Plan sessions, track fill rates, move fast.</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm">
                  <MonitorSmartphone className="h-4 w-4 text-zinc-400" />
                  <span className="text-zinc-300">High contrast</span>
                  <Switch checked={contrast} onCheckedChange={setContrast} />
                </div>
                <Select defaultValue="week" onValueChange={(v) => setView(v)}>
                  <SelectTrigger className="bg-zinc-900 border-zinc-800 text-white w-[120px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 text-white border-zinc-800">
                    <SelectItem value="week">Week</SelectItem>
                    <SelectItem value="day">Day</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="bg-emerald-600 hover:bg-emerald-600/90">
                  <Download className="mr-2 h-4 w-4" />Export
                </Button>
              </div>
            </div>

            {/* KPI row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Stat icon={Users} label="Avg fill rate" value="82%" hint="past 7 days" />
              <Stat icon={Dumbbell} label="Active classes" value="36" hint="scheduled this week" />
              <Stat icon={Clock3} label="Hours scheduled" value="54" hint="across all rooms" />
              <Stat icon={CalendarDays} label="Cancellations" value="2" hint="this week" />
            </div>

            {/* Trend + Filters */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
              <Card className="xl:col-span-2 border-zinc-800 bg-zinc-900/50">
                <CardHeader>
                  <CardTitle className="text-zinc-200">Attendance trend</CardTitle>
                </CardHeader>
                <CardContent className="h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={ATTENDANCE}>
                      <CartesianGrid vertical={false} stroke="#27272a" />
                      <XAxis dataKey="d" stroke="#a1a1aa" tickLine={false} axisLine={{ stroke: "#3f3f46" }} />
                      <YAxis stroke="#a1a1aa" tickLine={false} axisLine={{ stroke: "#3f3f46" }} />
                      <Tooltip contentStyle={{ background: "#09090b", border: "1px solid #27272a", borderRadius: 12 }} />
                      <Line type="monotone" dataKey="a" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="border-zinc-800 bg-zinc-900/50">
                <CardHeader>
                  <CardTitle className="text-zinc-200">Quick filters</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search title, instructor, room"
                    className="bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-500"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <Select value={room} onValueChange={setRoom}>
                      <SelectTrigger className="bg-zinc-900 border-zinc-800 text-white">
                        <SelectValue placeholder="Room" />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-900 text-white border-zinc-800">
                        {ROOMS.map((r) => (
                          <SelectItem key={r} value={r}>
                            {r}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select value={instructor} onValueChange={setInstructor}>
                      <SelectTrigger className="bg-zinc-900 border-zinc-800 text-white">
                        <SelectValue placeholder="Instructor" />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-900 text-white border-zinc-800">
                        {INSTRUCTORS.map((i) => (
                          <SelectItem key={i} value={i}>
                            {i}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-2">
                    <Button className="flex-1 bg-indigo-600 hover:bg-indigo-600/90">
                      <Filter className="mr-2 h-4 w-4" />Apply
                    </Button>
                    <Button variant="secondary" className="flex-1 bg-zinc-800 text-white hover:bg-zinc-700">
                      <Plus className="mr-2 h-4 w-4" />New class
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Scheduler grid */}
            <Card className="border-zinc-800 bg-zinc-900/50">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-zinc-200">Schedule</CardTitle>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-zinc-300 hover:bg-zinc-800"
                      onClick={() => setDayIndex((d) => ((d - 2 + 7) % 7) + 1)}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-zinc-300 hover:bg-zinc-800"
                      onClick={() => setDayIndex((d) => (d % 7) + 1)}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                    <Badge className="bg-zinc-800 text-zinc-200">{days[dayIndex - 1]}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-8 gap-2">
                  {/* time column */}
                  <div className="text-xs text-zinc-500 space-y-6 pt-10">
                    {hours.map((h) => (
                      <div key={h}>{h}:00</div>
                    ))}
                  </div>

                  {/* day columns */}
                  {days.map((d, idx) => (
                    <div key={d} className="col-span-1">
                      <div className="sticky top-0 z-10 mb-2 flex items-center justify-between rounded-xl bg-zinc-900 px-3 py-2 text-sm text-zinc-300 ring-1 ring-zinc-800">
                        <span className="font-medium">{d}</span>
                        <Building2 className="h-4 w-4 text-zinc-500" />
                      </div>
                      <div className="relative h-[720px] rounded-xl bg-zinc-950/60 ring-1 ring-zinc-800">
                        {/* hour grid */}
                        <div className="absolute inset-0 grid grid-rows-[repeat(16,1fr)]">
                          {hours.map((h) => (
                            <div key={h} className="border-t border-zinc-800/60" />
                          ))}
                        </div>
                        {/* class blocks */}
                        <AnimatePresence>
                          {classes
                            .filter((c) => c.day === idx + 1)
                            .map((c) => {
                              const top = (c.start - 6) * (100 / 16);
                              const height = (c.end - c.start) * (100 / 16);
                              const full = c.booked >= c.cap;
                              return (
                                <motion.div
                                  key={c.id}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -10 }}
                                  style={{ top: `${top}%`, height: `${height}%` }}
                                  className={`absolute left-2 right-2 overflow-hidden rounded-xl p-2 ring-1 ${
                                    full
                                      ? "bg-red-600/20 ring-red-700/60"
                                      : "bg-indigo-600/20 ring-indigo-700/60"
                                  }`}
                                  onClick={() => openClass(c)}
                                >
                                  <div className="text-xs font-semibold text-white truncate">{c.title}</div>
                                  <div className="mt-0.5 flex items-center justify-between text-[11px] text-zinc-300">
                                    <span>
                                      {c.start}:00 to {c.end}:00
                                    </span>
                                    <span>
                                      {c.booked}/{c.cap}
                                    </span>
                                  </div>
                                  <div className="text-[10px] text-zinc-400">{c.room} • {c.instructor}</div>
                                </motion.div>
                              );
                            })}
                        </AnimatePresence>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      {/* Class dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="border-zinc-800 bg-zinc-900 text-white sm:max-w-[520px]">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">{selected?.title}</DialogTitle>
            <DialogDescription className="text-zinc-400">{selected?.type} • {selected?.room}</DialogDescription>
          </DialogHeader>
          {selected && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <Card className="bg-zinc-950 border-zinc-800">
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm text-zinc-300">Time</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 text-sm text-zinc-300">
                    {selected.start}:00 to {selected.end}:00
                  </CardContent>
                </Card>
                <Card className="bg-zinc-950 border-zinc-800">
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm text-zinc-300">Capacity</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 text-sm text-zinc-300">
                    {selected.booked}/{selected.cap} booked
                  </CardContent>
                </Card>
              </div>
              <div className="flex gap-2">
                <Button className="flex-1 bg-indigo-600 hover:bg-indigo-600/90">Edit class</Button>
                <Button variant="secondary" className="flex-1 bg-zinc-800 text-white hover:bg-zinc-700">Message attendees</Button>
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
