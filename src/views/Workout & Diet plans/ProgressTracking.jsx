import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Layout from "../../components/Layout"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
} from "recharts";
import { Flame, Dumbbell, Trophy, Activity, TrendingUp, Calendar, Target, Plus, Save } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

/**
 * Dynamic, bold progress tracking page for a gym management site
 * React + Tailwind + shadcn/ui + Recharts + Framer Motion
 *
 * Features
 * - Live goal editing with persistence
 * - Quick log for workouts and calories, updates charts in real time
 * - 7/30/90 day range filter
 * - Light/dark emphasis toggle
 * - LocalStorage hydration for demo persistence
 */

// Tailwind radial accents
const gradientBg =
  "bg-[radial-gradient(1200px_600px_at_70%_-10%,rgba(74,222,128,0.25),transparent),radial-gradient(800px_400px_at_10%_10%,rgba(59,130,246,0.25),transparent)]";

// Helpers
const ls = {
  get: (k, fallback) => {
    try {
      const v = localStorage.getItem(k);
      return v ? JSON.parse(v) : fallback;
    } catch {
      return fallback;
    }
  },
  set: (k, v) => localStorage.setItem(k, JSON.stringify(v)),
};

// Seed demo data
const seedByDay = () => [
  { day: "Mon", workouts: 1, calories: 520 },
  { day: "Tue", workouts: 0, calories: 0 },
  { day: "Wed", workouts: 2, calories: 940 },
  { day: "Thu", workouts: 1, calories: 610 },
  { day: "Fri", workouts: 0, calories: 0 },
  { day: "Sat", workouts: 1, calories: 580 },
  { day: "Sun", workouts: 1, calories: 640 },
];

const seedPRs = () => [
  { lift: "Squat", kg: 160 },
  { lift: "Bench", kg: 110 },
  { lift: "Deadlift", kg: 200 },
  { lift: "OHP", kg: 72 },
];

const defaultGoals = () => ([
  { key: "bodyFat", label: "Body Fat", value: 72, suffix: "%", target: 70 },
  { key: "steps", label: "Steps", value: 84, suffix: "%", target: 100 },
  { key: "protein", label: "Protein", value: 92, suffix: "%", target: 100 },
]);

function StatCard({ icon: Icon, title, value, sub, burst = false }) {
  return (
    <Card className={cn(
      "relative overflow-hidden border-0 bg-gray-50 shadow-xl ring-1 ring-gray-300",
      burst && "ring-2 ring-emerald-400/50"
    )}>
      <div className="absolute inset-0 opacity-50 bg-gradient-to-br from-gray-100 to-transparent" />
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
        <div className="p-2 rounded-xl bg-gray-100">
          <Icon className="h-5 w-5 text-gray-900" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-extrabold text-gray-900 tracking-tight">{value}</div>
        {sub && <p className="text-xs text-gray-500 mt-1">{sub}</p>}
      </CardContent>
    </Card>
  );
}

function ProgressBar({ value }) {
  return (
    <div className="w-full h-3 rounded-full bg-gray-200 overflow-hidden">
      <div
        className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-sky-500"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div className="space-y-1">
      <Label className="text-gray-600 text-xs">{label}</Label>
      {children}
    </div>
  );
}

function QuickLog({ onAdd }) {
  const [day, setDay] = useState("Mon");
  const [workouts, setWorkouts] = useState(1);
  const [calories, setCalories] = useState(450);

  return (
    <Card className="border-0 bg-gray-50 backdrop-blur-xl shadow-xl ring-1 ring-gray-300">
      <CardHeader>
        <CardTitle className="text-lg text-gray-900">Quick log</CardTitle>
        <CardDescription className="text-gray-700">Add a session and calories</CardDescription>
      </CardHeader>
      <CardContent className="grid sm:grid-cols-4 gap-3">
        <div>
          <Label className="text-gray-600 text-xs">Day</Label>
          <Select value={day} onValueChange={setDay}>
            <SelectTrigger className="w-full bg-gray-100 border-gray-300 mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-300">
              {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(d => (
                <SelectItem key={d} value={d}>{d}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Field label="Workouts">
          <Input type="number" min={0} value={workouts}
                 onChange={e => setWorkouts(parseInt(e.target.value || "0"))}
                 className="bg-gray-100 border-gray-300" />
        </Field>
        <Field label="Calories">
          <Input type="number" min={0} value={calories}
                 onChange={e => setCalories(parseInt(e.target.value || "0"))}
                 className="bg-gray-100 border-gray-300" />
        </Field>
        <div className="flex items-end">
          <Button onClick={() => onAdd({ day, workouts, calories })}
                  className="w-full border-gray-100 bg-teal-500 text-gray-100 font-semibold hover:bg-teal-200 hover:text-teal-600 hover:opacity-90 shadow-lg">
            <Plus className="h-4 w-4 mr-2" /> Add
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function GoalsEditor({ goals, setGoals }) {
  const update = (idx, field, val) => {
    const next = goals.map((g, i) => (i === idx ? { ...g, [field]: val } : g));
    setGoals(next);
    ls.set("gym.goals", next);
  };

  return (
    <Card className="border-0 bg-gray-50 backdrop-blur-xl shadow-xl ring-1 ring-gray-300">
      <CardHeader>
        <CardTitle className="text-lg text-gray-900">Goals</CardTitle>
        <CardDescription className="text-gray-700">Edit and track progress</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {goals.map((g, idx) => (
            <div key={g.key} className="grid grid-cols-5 items-center gap-3">
              <div className="col-span-2">
                <div className="text-sm text-gray-700">{g.label}</div>
                <div className="text-xs text-gray-600">Target {g.target}{g.suffix}</div>
              </div>
              <div className="col-span-3 space-y-2">
                <ProgressBar value={g.value} />
                <div className="grid grid-cols-2 gap-2">
                  <Input type="number" value={g.value}
                         onChange={e => update(idx, "value", parseInt(e.target.value || "0"))}
                         className="bg-gray-100 border-gray-300" />
                  <Input type="number" value={g.target}
                         onChange={e => update(idx, "target", parseInt(e.target.value || "0"))}
                         className="bg-gray-100 border-gray-300" />
                </div>
              </div>
            </div>
          ))}
        </div>
        <Button className="w-full mt-6  border-gray-100 bg-teal-500 text-gray-100 font-semibold hover:bg-teal-200 hover:text-teal-600">
          <Save className="h-4 w-4 mr-2" /> Save goals
        </Button>
      </CardContent>
    </Card>
  );
}

export default function ProgressTracking() {
  const [range, setRange] = useState("7d");
  const [emphasis, setEmphasis] = useState(true);

  const [byDay, setByDay] = useState(() => ls.get("gym.byDay", seedByDay()));
  const [prs, setPrs] = useState(() => ls.get("gym.prs", seedPRs()));
  const [goals, setGoals] = useState(() => ls.get("gym.goals", defaultGoals()));

  // Persist when data changes
  useEffect(() => ls.set("gym.byDay", byDay), [byDay]);
  useEffect(() => ls.set("gym.prs", prs), [prs]);

  const activeDays = useMemo(() => byDay.filter(d => d.workouts > 0).length, [byDay]);
  const volume = useMemo(() => byDay.reduce((a, b) => a + b.workouts, 0), [byDay]);
  const calories = useMemo(() => byDay.reduce((a, b) => a + b.calories, 0), [byDay]);

  const addEntry = (e) => {
    setByDay(prev => prev.map(d => d.day === e.day ? { ...d, workouts: d.workouts + e.workouts, calories: d.calories + e.calories } : d));
  };

  const headerVariants = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

  return (
   <Layout>
     <div className={cn("min-h-screen bg-white text-gray-900")}>
      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <motion.h1 initial="hidden" animate="show" variants={headerVariants} className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Progress <span className="text-teal-500"> tracker </span>
            </motion.h1>
            <p className="text-gray-600 mt-2">Live goals, real-time logs, clean visuals.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 pr-3 border-r border-gray-300">
              <Switch checked={emphasis} onCheckedChange={setEmphasis} />
              <span className="text-xs text-gray-600">High contrast</span>
            </div>
            <Select value={range} onValueChange={setRange}>
              <SelectTrigger className="w-[140px] bg-gray-50 border-gray-300">
                <SelectValue placeholder="Range" />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-300">
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
            <Button className=" border-gray-100 bg-teal-500 text-gray-100 font-semibold hover:bg-teal-200 hover:text-teal-600 shadow-lg">
              <Calendar className="h-4 w-4 mr-2" /> Export
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          <StatCard icon={Activity} title="Active days" value={`${activeDays}/7`} sub="This week" burst={emphasis && activeDays >= 5} />
          <StatCard icon={Flame} title="Calories burned" value={`${calories}`} sub="Estimated total" burst={emphasis && calories > 2500} />
          <StatCard icon={TrendingUp} title="Workouts" value={`${volume}`} sub="Sessions logged" burst={emphasis && volume >= 6} />
          <StatCard icon={Trophy} title="Personal bests" value={`${prs.length}`} sub="Major lifts" burst={emphasis && volume >= 4}/>
        </div>

        {/* Quick log + Goals */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          <div className="col-span-2 space-y-6">
            <Card className="border-0 bg-gray-50 backdrop-blur-xl shadow-xl ring-1 ring-gray-300">
              <CardHeader>
                <CardTitle className="text-lg text-gray-900">Weekly activity</CardTitle>
                <CardDescription className="text-gray-700">Sessions and calories</CardDescription>
              </CardHeader>
              <CardContent className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={byDay}>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#9ca3af" />
                    <XAxis dataKey="day" stroke="#4b5563" tickLine={false} axisLine={false} />
                    <YAxis yAxisId="left" stroke="#4b5563" tickLine={false} axisLine={false} />
                    <YAxis yAxisId="right" orientation="right" stroke="#4b5563" tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ background: "#f9fafb", border: "1px solid #d1d5db" }} labelStyle={{ color: "#374151" }} />
                    <Bar yAxisId="left" dataKey="workouts" radius={[6,6,0,0]} />
                    <Line yAxisId="right" type="monotone" dataKey="calories" strokeWidth={3} dot={false} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <QuickLog onAdd={addEntry} />
          </div>

          <GoalsEditor goals={goals} setGoals={setGoals} />
        </div>

        {/* PRs + Body metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          <Card className="col-span-2 border-0 bg-gray-50 backdrop-blur-xl shadow-xl ring-1 ring-gray-300">
            <CardHeader>
              <CardTitle className="text-lg text-gray-900 bg-teal-50 border-teal">Personal Records</CardTitle>
              <CardDescription className="text-gray-700">Tap to edit values</CardDescription>
            </CardHeader>
            <CardContent className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={prs} barSize={28}>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#9cadafff" />
                  <XAxis dataKey="lift" stroke="#4b5563" tickLine={false} axisLine={false} />
                  <YAxis stroke="#4b6263ff" tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: "#f9fafb", border: "1px solid #d1d5db" }} labelStyle={{ color: "#374151" }} />
                  <Bar dataKey="kg" radius={[8,8,0,0]} onClick={(d) => {
                    const name = d && d.activeLabel;
                    const idx = prs.findIndex(p => p.lift === name);
                    if (idx >= 0) {
                      const kg = prompt(`New ${name} PR (kg)`, String(prs[idx].kg));
                      if (kg) {
                        const next = prs.map((p, i) => i === idx ? { ...p, kg: parseFloat(kg) } : p);
                        setPrs(next);
                      }
                    }
                  }} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gray-50 backdrop-blur-xl shadow-xl ring-1 ring-gray-300">
            <CardHeader>
              <CardTitle className="text-lg text-gray-900">Body metrics</CardTitle>
              <CardDescription className="text-gray-700">Last 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-700">Weight</span>
                    <span className="text-sm font-semibold text-gray-900">74.6 kg</span>
                  </div>
                  <ProgressBar value={62} />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-700">Body fat</span>
                    <span className="text-sm font-semibold text-gray-900">19.8%</span>
                  </div>
                  <ProgressBar value={38} />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-700">Muscle mass</span>
                    <span className="text-sm font-semibold text-gray-900">61.2 kg</span>
                  </div>
                  <ProgressBar value={54} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Milestones */}
        <Card className="mt-8 border-0 bg-gray-50 backdrop-blur-xl shadow-xl ring-1 ring-gray-300">
          <CardHeader>
            <CardTitle className="text-lg text-gray-900">Milestones</CardTitle>
            <CardDescription className="text-gray-700">Wins worth noting</CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="relative border-s border-gray-300 ml-3">
              {[{ date: "Aug 10", title: "5K run", detail: "26:40 PB" }, { date: "Sep 02", title: "Bench 100 kg", detail: "New 1RM" }, { date: "Sep 28", title: "12-day streak", detail: "Consistency" }].map((m, idx) => (
                <li key={idx} className="mb-6 ml-6">
                  <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-sky-500 ring-2 ring-offset-2 ring-offset-white ring-gray-300" />
                  <div className="flex items-center gap-3 text-gray-700">
                    <span className="text-xs bg-gray-100 rounded px-2 py-1">{m.date}</span>
                    <span className="font-semibold">{m.title}</span>
                    <span className="text-gray-500 text-sm">{m.detail}</span>
                  </div>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-10">
          <div className="text-gray-700">
            Tip: log workouts right after you finish. Small habits compound.
          </div>
          <div className="flex gap-3">
            <Button className=" hover:opacity-90 shadow-lg  border-gray-100 bg-teal-500 text-gray-100 font-semibold hover:bg-teal-200 hover:text-teal-600">
              <Dumbbell className="h-4 w-4 mr-2" /> Log workout
            </Button>
            <Button variant="outline" className="  hover:opacity-90 shadow-lg border-gray-100 bg-teal-500 text-teal-500 font-semibold hover:bg-teal-200 hover:text-teal-600">
              <Trophy className="h-4 w-4 mr-2" /> Add PR
            </Button>
          </div>
        </div>
      </div>
    </div>
   </Layout>
  );
}
