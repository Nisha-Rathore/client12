import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "../../components/Layout";
import {
  Store,
  MapPin,
  Users,
  DollarSign,
  TrendingUp,
  Download,
  Filter,
  Plus,
  Search,
  CheckCircle2,
  AlertTriangle,
  Building2,
  CalendarDays,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
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

// Franchise & Membership dashboard screen (no sidebar, no TS)
// Tailwind + shadcn/ui + framer-motion + recharts

const REGIONS = ["North", "South", "East", "West"];
const STATUSES = ["Active", "Paused", "Risk"];

const FRANCHISES = [
  { id: "F001", name: "Hyderabad Central", region: "South", city: "Hyderabad", status: "Active", revenue: 18.6, members: 842 },
  { id: "F002", name: "Bengaluru North", region: "South", city: "Bengaluru", status: "Active", revenue: 22.1, members: 1012 },
  { id: "F003", name: "Mumbai West", region: "West", city: "Mumbai", status: "Risk", revenue: 9.3, members: 418 },
  { id: "F004", name: "Delhi Midtown", region: "North", city: "New Delhi", status: "Paused", revenue: 6.8, members: 295 },
  { id: "F005", name: "Pune East", region: "West", city: "Pune", status: "Active", revenue: 12.4, members: 566 },
  { id: "F006", name: "Kolkata Park St", region: "East", city: "Kolkata", status: "Active", revenue: 10.9, members: 503 },
];

const REV_TREND = [
  { m: "Jan", revenue: 48 },
  { m: "Feb", revenue: 55 },
  { m: "Mar", revenue: 61 },
  { m: "Apr", revenue: 64 },
  { m: "May", revenue: 70 },
  { m: "Jun", revenue: 79 },
];

const SIGNUPS_TREND = [
  { m: "Jan", count: 320 },
  { m: "Feb", count: 380 },
  { m: "Mar", count: 410 },
  { m: "Apr", count: 460 },
  { m: "May", count: 520 },
  { m: "Jun", count: 610 },
];

const MEMBERSHIP_PLANS = [
  { plan: "Monthly", value: 46 },
  { plan: "Quarterly", value: 22 },
  { plan: "Annual", value: 32 },
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

function FranchiseRow({ f, onOpen }) {
  const statusBadge = f.status === "Active"
    ? <Badge className="bg-emerald-600 text-white"><CheckCircle2 className="mr-1 h-3 w-3" />Active</Badge>
    : f.status === "Paused"
      ? <Badge className="bg-zinc-700 text-white">Paused</Badge>
      : <Badge className="bg-red-600 text-white"><AlertTriangle className="mr-1 h-3 w-3" />Risk</Badge>;

  return (
    <motion.div layout initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-12 items-center gap-4 rounded-2xl ring-1 ring-zinc-800 bg-zinc-900/60 p-4 hover:bg-zinc-900">
      <div className="col-span-4">
        <div className="font-semibold text-white">{f.name}</div>
        <div className="text-xs text-zinc-400 flex items-center gap-2"><MapPin className="h-3 w-3" />{f.city} • {f.region}</div>
      </div>
      <div className="col-span-2">{statusBadge}</div>
      <div className="col-span-2 text-zinc-300 text-sm">₹{(f.revenue).toFixed(1)}L</div>
      <div className="col-span-2 text-zinc-300 text-sm">{f.members}</div>
      <div className="col-span-2 text-right">
        <Button size="sm" variant="secondary" className="bg-zinc-800 text-white hover:bg-zinc-700" onClick={() => onOpen(f)}>View</Button>
      </div>
    </motion.div>
  );
}

export default function FranchiseMembership() {
  const [contrast, setContrast] = useState(true);
  const [qFr, setQFr] = useState("");
  const [region, setRegion] = useState();
  const [status, setStatus] = useState();
  const [openFr, setOpenFr] = useState(false);
  const [selectedFr, setSelectedFr] = useState(null);

  const [qMember, setQMember] = useState("");
  const [planFilter, setPlanFilter] = useState();

  const filteredFr = useMemo(() => {
    return FRANCHISES.filter((f) => {
      const qm = [f.name, f.city, f.region, f.status].some((v) => String(v).toLowerCase().includes(qFr.toLowerCase()));
      const r = region ? f.region === region : true;
      const s = status ? f.status === status : true;
      return qm && r && s;
    });
  }, [qFr, region, status]);

  function openFranchise(f) { setSelectedFr(f); setOpenFr(true); }

  // Mock membership data derived from plans
  const MEMBERS = [
    { id: "M1001", name: "Aarav Mehta", plan: "Monthly", joined: "2025-07-21" },
    { id: "M1002", name: "Neha Sharma", plan: "Annual", joined: "2025-08-03" },
    { id: "M1003", name: "Rohan Gupta", plan: "Quarterly", joined: "2025-08-22" },
    { id: "M1004", name: "Ishita Rao", plan: "Monthly", joined: "2025-09-02" },
    { id: "M1005", name: "Kabir Singh", plan: "Annual", joined: "2025-09-19" },
  ];

  const filteredMembers = useMemo(() => {
    return MEMBERS.filter((m) => {
      const qm = [m.name, m.id, m.plan].some((v) => String(v).toLowerCase().includes(qMember.toLowerCase()));
      const p = planFilter ? m.plan === planFilter : true;
      return qm && p;
    });
  }, [qMember, planFilter]);

  return (
   <Layout>
     <div className={`min-h-screen w-full p-6 text-zinc-100 ${contrast ? "bg-gradient-to-br from-[#0B1020] via-[#0A1530] to-[#050A1A]" : "bg-zinc-950"}`}>
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Franchise and Membership</h1>
            <p className="text-zinc-400 mt-1">Track growth, revenue, and member health at a glance.</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm">
              <span className="text-zinc-300">High contrast</span>
              <Switch checked={contrast} onCheckedChange={setContrast} />
            </div>
            <Button className="bg-emerald-600 hover:bg-emerald-600/90"><Download className="mr-2 h-4 w-4" />Export</Button>
          </div>
        </div>

        {/* KPI Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Stat icon={Store} label="Franchises" value={`${FRANCHISES.length}`} hint="active locations" />
          <Stat icon={Users} label="Total members" value="3,636" hint="across network" />
          <Stat icon={DollarSign} label="Network MRR" value="₹79L" hint="last 30 days" />
          <Stat icon={TrendingUp} label="New signups" value="610" hint="this month" />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <Card className="border-zinc-800 bg-zinc-900/50">
            <CardHeader>
              <CardTitle className="text-zinc-200">Revenue trend</CardTitle>
            </CardHeader>
            <CardContent className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={REV_TREND}>
                  <CartesianGrid vertical={false} stroke="#27272a" />
                  <XAxis dataKey="m" stroke="#a1a1aa" tickLine={false} axisLine={{ stroke: "#3f3f46" }} />
                  <YAxis stroke="#a1a1aa" tickLine={false} axisLine={{ stroke: "#3f3f46" }} />
                  <Tooltip contentStyle={{ background: "#09090b", border: "1px solid #27272a", borderRadius: 12 }} />
                  <Line type="monotone" dataKey="revenue" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-zinc-800 bg-zinc-900/50">
            <CardHeader>
              <CardTitle className="text-zinc-200">New memberships</CardTitle>
            </CardHeader>
            <CardContent className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={SIGNUPS_TREND} barSize={24}>
                  <CartesianGrid vertical={false} stroke="#27272a" />
                  <XAxis dataKey="m" stroke="#a1a1aa" tickLine={false} axisLine={{ stroke: "#3f3f46" }} />
                  <YAxis stroke="#a1a1aa" tickLine={false} axisLine={{ stroke: "#3f3f46" }} />
                  <Tooltip contentStyle={{ background: "#09090b", border: "1px solid #27272a", borderRadius: 12 }} />
                  <Bar dataKey="count" radius={[6,6,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Franchise section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Card className="lg:col-span-2 border-zinc-800 bg-zinc-900/50">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-zinc-200">Franchise performance</CardTitle>
                <div className="flex items-center gap-2">
                  <div className="relative hidden md:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                    <Input value={qFr} onChange={(e) => setQFr(e.target.value)} placeholder="Search name, city, region" className="pl-9 bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-500 w-64" />
                  </div>
                  <Select value={region} onValueChange={setRegion}>
                    <SelectTrigger className="bg-zinc-900 border-zinc-800 text-white w-[120px]">
                      <SelectValue placeholder="Region" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-900 text-white border-zinc-800">
                      {REGIONS.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger className="bg-zinc-900 border-zinc-800 text-white w-[120px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-900 text-white border-zinc-800">
                      {STATUSES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <Button className="bg-indigo-600 hover:bg-indigo-600/90"><Filter className="mr-2 h-4 w-4" />Apply</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-12 text-xs uppercase tracking-wide text-zinc-500 px-2">
                <div className="col-span-4">Franchise</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-2">MRR</div>
                <div className="col-span-2">Members</div>
                <div className="col-span-2 text-right">Actions</div>
              </div>
              <AnimatePresence>
                {filteredFr.map((f) => (
                  <FranchiseRow key={f.id} f={f} onOpen={openFranchise} />
                ))}
              </AnimatePresence>
              {filteredFr.length === 0 && (
                <Card className="border-zinc-800 bg-zinc-900/40">
                  <CardContent className="p-8 text-center text-zinc-400">No franchises match your filters.</CardContent>
                </Card>
              )}
            </CardContent>
          </Card>

          <Card className="border-zinc-800 bg-zinc-900/50">
            <CardHeader>
              <CardTitle className="text-zinc-200">Plan breakdown</CardTitle>
            </CardHeader>
            <CardContent className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={MEMBERSHIP_PLANS} barSize={24}>
                  <CartesianGrid vertical={false} stroke="#27272a" />
                  <XAxis dataKey="plan" stroke="#a1a1aa" tickLine={false} axisLine={{ stroke: "#3f3f46" }} />
                  <YAxis stroke="#a1a1aa" tickLine={false} axisLine={{ stroke: "#3f3f46" }} />
                  <Tooltip contentStyle={{ background: "#09090b", border: "1px solid #27272a", borderRadius: 12 }} />
                  <Bar dataKey="value" radius={[6,6,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Membership section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Card className="lg:col-span-2 border-zinc-800 bg-zinc-900/50">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-zinc-200">Recent memberships</CardTitle>
                <div className="flex items-center gap-2">
                  <div className="relative hidden md:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                    <Input value={qMember} onChange={(e) => setQMember(e.target.value)} placeholder="Search name, ID" className="pl-9 bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-500 w-56" />
                  </div>
                  <Select value={planFilter} onValueChange={setPlanFilter}>
                    <SelectTrigger className="bg-zinc-900 border-zinc-800 text-white w-[140px]">
                      <SelectValue placeholder="Plan" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-900 text-white border-zinc-800">
                      {MEMBERSHIP_PLANS.map((p) => <SelectItem key={p.plan} value={p.plan}>{p.plan}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-12 text-xs uppercase tracking-wide text-zinc-500 px-2">
                <div className="col-span-4">Member</div>
                <div className="col-span-3">Plan</div>
                <div className="col-span-3">Joined</div>
                <div className="col-span-2 text-right">Action</div>
              </div>
              <AnimatePresence>
                {filteredMembers.map((m) => (
                  <motion.div key={m.id} layout initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-12 items-center gap-4 rounded-2xl ring-1 ring-zinc-800 bg-zinc-900/60 p-4">
                    <div className="col-span-4">
                      <div className="font-semibold text-white">{m.name}</div>
                      <div className="text-xs text-zinc-400">ID {m.id}</div>
                    </div>
                    <div className="col-span-3"><Badge className="bg-zinc-800 text-zinc-200">{m.plan}</Badge></div>
                    <div className="col-span-3 text-zinc-300 text-sm">{m.joined}</div>
                    <div className="col-span-2 text-right">
                      <Button size="sm" variant="secondary" className="bg-zinc-800 text-white hover:bg-zinc-700">View</Button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {filteredMembers.length === 0 && (
                <Card className="border-zinc-800 bg-zinc-900/40">
                  <CardContent className="p-8 text-center text-zinc-400">No memberships match your filters.</CardContent>
                </Card>
              )}
            </CardContent>
          </Card>

          <Card className="border-zinc-800 bg-zinc-900/50">
            <CardHeader>
              <CardTitle className="text-zinc-200">Next renewals</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {["2025-10-05","2025-10-08","2025-10-12","2025-10-14"].map((d, i) => (
                <div key={i} className="flex items-center justify-between rounded-xl bg-zinc-950/60 p-3 ring-1 ring-zinc-800">
                  <div className="flex items-center gap-3">
                    <CalendarDays className="h-4 w-4 text-zinc-400" />
                    <div>
                      <div className="text-sm text-zinc-200">Renewal batch</div>
                      <div className="text-xs text-zinc-500">{d}</div>
                    </div>
                  </div>
                  <Button size="sm" className="bg-indigo-600 hover:bg-indigo-600/90">Notify</Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Franchise details dialog */}
      <Dialog open={openFr} onOpenChange={setOpenFr}>
        <DialogContent className="border-zinc-800 bg-zinc-900 text-white sm:max-w-[560px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-lg font-bold">
              <Building2 className="h-5 w-5" /> {selectedFr?.name}
            </DialogTitle>
            <DialogDescription className="text-zinc-400">{selectedFr?.city} • {selectedFr?.region} • {selectedFr?.status}</DialogDescription>
          </DialogHeader>
          {selectedFr && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <Card className="bg-zinc-950 border-zinc-800"><CardHeader className="py-3"><CardTitle className="text-sm text-zinc-300">MRR</CardTitle></CardHeader><CardContent className="pt-0 text-sm text-zinc-300">₹{selectedFr.revenue.toFixed(1)}L</CardContent></Card>
                <Card className="bg-zinc-950 border-zinc-800"><CardHeader className="py-3"><CardTitle className="text-sm text-zinc-300">Members</CardTitle></CardHeader><CardContent className="pt-0 text-sm text-zinc-300">{selectedFr.members}</CardContent></Card>
                <Card className="bg-zinc-950 border-zinc-800"><CardHeader className="py-3"><CardTitle className="text-sm text-zinc-300">Status</CardTitle></CardHeader><CardContent className="pt-0 text-sm text-zinc-300">{selectedFr.status}</CardContent></Card>
              </div>
              <div className="flex gap-2">
                <Button className="flex-1 bg-indigo-600 hover:bg-indigo-600/90">Edit franchise</Button>
                <Button variant="secondary" className="flex-1 bg-zinc-800 text-white hover:bg-zinc-700">Message owner</Button>
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
