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
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Users,
  Activity,
  DollarSign,
  CalendarRange,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Dumbbell,
  Clock,
  MapPin,
  Filter,
  Download,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

/**
 * Gym Analytics Report Page
 * React + Tailwind + shadcn/ui + Recharts + Framer Motion
 *
 * Sections
 * - Global filters: date range, location, trainer, class type
 * - KPI ribbon: MRR, Active Members, Check-ins, PT Revenue
 * - Charts: Revenue trend, Check-ins by hour, Membership funnel, Class fill rate
 * - Cohort heat table: 6-month retention by signup month
 * - Top performers: trainers and classes
 * - Export actions
 */

const gradientBg =
  "bg-gradient-to-br from-gray-50 to-white";

// Demo data
const months = ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"];
const revenue = months.map((m, i) => ({ month: m, mrr: 42000 + i * 3500, pt: 9000 + i * 1200 }));
const checkinsByHour = Array.from({ length: 14 }, (_, i) => {
  const hour = 6 + i; // 6 to 19
  const value = [6,7,8,9,17,18,19].includes(hour) ? 80 + Math.round(Math.random()*50) : 25 + Math.round(Math.random()*20);
  return { hour: `${hour}:00`, checkins: value };
});
const funnel = [
  { stage: "Site visits", value: 5400 },
  { stage: "Leads", value: 1100 },
  { stage: "Trials", value: 430 },
  { stage: "Members", value: 260 },
];
const fillRate = [
  { cls: "HIIT", rate: 92 },
  { cls: "Spin", rate: 88 },
  { cls: "Yoga", rate: 74 },
  { cls: "Strength", rate: 81 },
  { cls: "Pilates", rate: 69 },
];
const trainers = [
  { name: "Aarav S.", sessions: 146, rating: 4.9, revenue: 18600 },
  { name: "Maya K.", sessions: 132, rating: 4.8, revenue: 17120 },
  { name: "Rohit P.", sessions: 118, rating: 4.7, revenue: 15340 },
  { name: "Karan B.", sessions: 104, rating: 4.6, revenue: 13980 },
];

// Retention cohorts: rows are signup months, columns are months since signup
const cohortMonths = ["May", "Jun", "Jul", "Aug", "Sep", "Oct"];
const cohorts = cohortMonths.map((m, r) => ({
  cohort: m,
  values: Array.from({ length: 6 }, (_, c) => {
    const base = 100 - c * (14 + r * 1.5);
    return Math.max(0, Math.round(base));
  }),
}));

function Stat({ icon: Icon, title, value, delta, up = true }) {
  return (
    <Card className="relative overflow-hidden border border-gray-200 bg-white shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-slate-900">{title}</CardTitle>
        <div className="p-2 rounded-xl bg-gray-100">
          <Icon className="h-5 w-5 text-slate-700" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-end gap-2">
          <div className="text-3xl font-extrabold text-slate-900 tracking-tight">{value}</div>
          <div className={cn("text-xs flex items-center", up ? "text-emerald-600" : "text-rose-600") }>
            {up ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />} {delta}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function HeatCell({ v }) {
  // map 0-100 to 10-90% opacity on emerald
  const alpha = 0.1 + (v / 100) * 0.8;
  return (
    <div className="h-8 rounded-md text-center text-xs flex items-center justify-center"
         style={{ background: `rgba(16, 185, 129, ${alpha})` }}>
      <span className="text-slate-900 font-semibold">{v}%</span>
    </div>
  );
}

export default function AnalyticsReports() {
  const [range, setRange] = useState("Last 90 days");
  const [location, setLocation] = useState("All");
  const [trainer, setTrainer] = useState("All");
  const [classType, setClassType] = useState("All");
  const [contrast, setContrast] = useState(true);

  const totalMRR = useMemo(() => revenue[revenue.length - 1].mrr, []);
  const totalPT = useMemo(() => revenue[revenue.length - 1].pt, []);
  const activeMembers = 1328;
  const totalCheckins = checkinsByHour.reduce((a, b) => a + b.checkins, 0);

  return (
    <Layout>
        <div className={cn("min-h-screen bg-white text-slate-900", gradientBg)}>
      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Header + Filters */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Analytics & <span className="text-teal-500"> Reports </span>
            </motion.h1>
            <p className="text-slate-600 mt-2">One view for members, classes, revenue, and retention.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 w-full lg:w-auto">
            <div className="flex items-center gap-2 col-span-2 md:col-span-1">
              <Switch checked={contrast} onCheckedChange={setContrast} />
              <span className="text-xs text-slate-600">High contrast</span>
            </div>
            <Select value={range} onValueChange={setRange}>
              <SelectTrigger className="bg-gray-100 border-gray-300"><SelectValue placeholder="Date range" /></SelectTrigger>
              <SelectContent className="bg-white border-gray-200">
                {[
                  "Last 30 days",
                  "Last 90 days",
                  "Last 6 months",
                  "Year to date",
                ].map(v => <SelectItem key={v} value={v}>{v}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger className="bg-gray-100 border-gray-300"><SelectValue placeholder="Location" /></SelectTrigger>
              <SelectContent className="bg-white border-gray-200">
                {["All","Jubilee Hills","Gachibowli","Kondapur"].map(v => <SelectItem key={v} value={v}>{v}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={trainer} onValueChange={setTrainer}>
              <SelectTrigger className="bg-gray-100 border-gray-300"><SelectValue placeholder="Trainer" /></SelectTrigger>
              <SelectContent className="bg-white border-gray-200">
                {["All","Aarav S.","Maya K.","Rohit P.","Karan B."].map(v => <SelectItem key={v} value={v}>{v}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={classType} onValueChange={setClassType}>
              <SelectTrigger className="bg-gray-100 border-gray-300"><SelectValue placeholder="Class" /></SelectTrigger>
              <SelectContent className="bg-white border-gray-200">
                {["All","HIIT","Spin","Yoga","Strength","Pilates"].map(v => <SelectItem key={v} value={v}>{v}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* KPI Ribbon */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          <Stat icon={DollarSign} title="MRR" value={`₹${(totalMRR/1000).toFixed(1)}k`} delta="12.4%" up />
          <Stat icon={Users} title="Active members" value={`${activeMembers}`} delta="3.1%" up />
          <Stat icon={Activity} title="Check-ins" value={`${totalCheckins}`} delta="1.8%" up />
          <Stat icon={Dumbbell} title="PT revenue" value={`₹${(totalPT/1000).toFixed(1)}k`} delta="0.9%" up />
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-6 mt-8">
          {/* Revenue trend */}
          <Card className="lg:col-span-4 bg-white border border-gray-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Revenue trend</CardTitle>
              <CardDescription className="text-slate-500">MRR and PT over time</CardDescription>
            </CardHeader>
            <CardContent className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenue}>
                  <defs>
                    <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#34d399" stopOpacity={0.6}/>
                      <stop offset="95%" stopColor="#34d399" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.6}/>
                      <stop offset="95%" stopColor="#38bdf8" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#6b7280" tickLine={false} axisLine={false} />
                  <YAxis stroke="#6b7280" tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: "#ffffff", border: "1px solid #d1d5db" }} labelStyle={{ color: "#374151" }} />
                  <Area type="monotone" dataKey="mrr" stroke="#34d399" fill="url(#g1)" strokeWidth={2} />
                  <Area type="monotone" dataKey="pt" stroke="#38bdf8" fill="url(#g2)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Check-ins by hour */}
          <Card className="lg:col-span-3 bg-white border border-gray-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Peak hours</CardTitle>
              <CardDescription className="text-slate-500">Check-ins by hour</CardDescription>
            </CardHeader>
            <CardContent className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={checkinsByHour}>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="hour" stroke="#6b7280" tickLine={false} axisLine={false} />
                  <YAxis stroke="#6b7280" tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: "#ffffff", border: "1px solid #d1d5db" }} labelStyle={{ color: "#374151" }} />
                  <Bar dataKey="checkins" radius={[6,6,0,0]} fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-6 mt-8">
          {/* Funnel */}
          <Card className="lg:col-span-3 bg-white border border-gray-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Membership funnel</CardTitle>
              <CardDescription className="text-slate-500">From visit to paid</CardDescription>
            </CardHeader>
            <CardContent className="h-72 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={funnel} layout="vertical" margin={{ left: 40, right: 20 }}>
                  <CartesianGrid horizontal={false} strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis type="number" stroke="#6b7280" tickLine={false} axisLine={false} />
                  <YAxis type="category" dataKey="stage" stroke="#6b7280" tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: "#ffffff", border: "1px solid #d1d5db" }} labelStyle={{ color: "#374151" }} />
                  <Bar dataKey="value" radius={[0,8,8,0]} fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Class fill rate */}
          <Card className="lg:col-span-4 bg-white border border-gray-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Class fill rate</CardTitle>
              <CardDescription className="text-slate-500">Seats taken by class</CardDescription>
            </CardHeader>
            <CardContent className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={fillRate}>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="cls" stroke="#6b7280" tickLine={false} axisLine={false} />
                  <YAxis stroke="#6b7280" tickLine={false} axisLine={false} domain={[0,100]} />
                  <Tooltip contentStyle={{ background: "#ffffff", border: "1px solid #d1d5db" }} labelStyle={{ color: "#374151" }} />
                  <Bar dataKey="rate" radius={[8,8,0,0]} fill="#f59e0b" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Retention heat table */}
        <Card className="mt-8 bg-white border border-gray-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg">Cohort retention</CardTitle>
            <CardDescription className="text-slate-500">Percent of members active over months since signup</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr>
                    <th className="p-2 text-xs font-semibold text-slate-600">Cohort</th>
                    {Array.from({ length: 6 }, (_, i) => (
                      <th key={i} className="p-2 text-xs font-semibold text-slate-600 text-center">M{i+1}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {cohorts.map((row) => (
                    <tr key={row.cohort} className="align-middle">
                      <td className="p-2 text-sm text-slate-700 whitespace-nowrap">{row.cohort} {new Date().getFullYear()}</td>
                      {row.values.map((v, i) => (
                        <td key={i} className="p-1"><HeatCell v={v} /></td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Top performers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <Card className="bg-white border border-gray-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Top trainers</CardTitle>
              <CardDescription className="text-slate-500">By sessions and revenue</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="divide-y divide-gray-200">
                {trainers.map((t) => (
                  <div key={t.name} className="py-3 flex items-center justify-between">
                    <div>
                      <div className="font-semibold">{t.name}</div>
                      <div className="text-xs text-slate-500">{t.sessions} sessions • {t.rating}★</div>
                    </div>
                    <div className="text-sm">₹{t.revenue.toLocaleString()}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Top classes</CardTitle>
              <CardDescription className="text-slate-500">By attendance</CardDescription>
            </CardHeader>
            <CardContent className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie dataKey="rate" data={fillRate} nameKey="cls" cx="50%" cy="50%" outerRadius={90}>
                    {fillRate.map((_, i) => (
                      <Cell key={i} fill={i % 2 ? "#34d399" : "#38bdf8"} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ background: "#ffffff", border: "1px solid #d1d5db" }} labelStyle={{ color: "#374151" }} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Export bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-10">
          <div className="text-slate-600">Tip: segment by location and class to spot demand pockets.</div>
          <div className="flex gap-3">
            <Button className="bg-gradient-to-r from-emerald-500 to-sky-500 hover:opacity-90 shadow-lg">
              <Download className="h-4 w-4 mr-2" /> Export CSV
            </Button>
            <Button variant="outline" className="border-gray-300 bg-white hover:bg-gray-50 text-slate-900">
              <CalendarRange className="h-4 w-4 mr-2" /> Schedule report
            </Button>
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
}
