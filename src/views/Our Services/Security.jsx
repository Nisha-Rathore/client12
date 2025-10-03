import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Layout from "../../components/Layout";
import {
  Shield,
  Camera,
  KeyRound,
  Bell,
  Activity,
  Lock,
  Server,
  Wifi,
  AlertTriangle,
  CheckCircle2,
  Download,
  Calendar,
  Building2,
} from "lucide-react";

const fmt = (v) => new Intl.NumberFormat().format(v);

const seed = {
  kpis: {
    doors: 126,
    cameras: 84,
    incidents: 6,
    uptime: 99.96,
  },
  week: [
    { d: "Mon", i: 2, r: 620 },
    { d: "Tue", i: 0, r: 400 },
    { d: "Wed", i: 3, r: 910 },
    { d: "Thu", i: 1, r: 520 },
    { d: "Fri", i: 0, r: 460 },
    { d: "Sat", i: 4, r: 990 },
    { d: "Sun", i: 2, r: 770 },
  ],
  goals: {
    response: { current: 3.8, target: 3 },
    coverage: { current: 92, target: 100 },
    mfa: { current: 87, target: 95 },
  },
  alerts: [
    { level: "high", text: "Tailgating attempt blocked at Entry A2", time: "2m ago" },
    { level: "med", text: "Camera offline at Studio 3. Reconnecting", time: "12m ago" },
    { level: "low", text: "New device trusted: iPad Front Desk", time: "27m ago" },
  ],
  devices: [
    { name: "North Gate Controller", status: "online" },
    { name: "Locker Room Camera C12", status: "degraded" },
    { name: "Server Rack UPS", status: "online" },
    { name: "WiFi Mesh Node GYM-4", status: "offline" },
    { name: "Turnstile Reader TS-7", status: "online" },
    { name: "Reception Camera C01", status: "online" },
  ],
};

function Stat({ icon: Icon, title, value, hint }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="relative rounded-2xl bg-gradient-to-b from-slate-800/60 to-slate-900/60 p-5 ring-1 ring-white/10 shadow-xl"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-300 text-sm">{title}</p>
          <p className="mt-1 text-3xl font-bold tracking-tight text-white">{value}</p>
        </div>
        <div className="grid h-12 w-12 place-items-center rounded-xl bg-white/5 ring-1 ring-white/10">
          <Icon className="h-6 w-6 text-teal-300" />
        </div>
      </div>
      {hint && <p className="mt-3 text-xs text-slate-400">{hint}</p>}
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-teal-400/10" />
    </motion.div>
  );
}

function Progress({ label, current, target, suffix = "" }) {
  const pct = Math.min(100, Math.round((current / target) * 100));
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-xs">
        <span className="flex items-center gap-2 text-slate-300"><Activity className="h-4 w-4" /> {label}</span>
        <span className="text-slate-400">{current}{suffix} / {target}{suffix}</span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-700/60">
        <div className="h-full rounded-full bg-gradient-to-r from-teal-400 to-cyan-300" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function Bars({ data }) {
  const max = useMemo(() => Math.max(...data.map((d) => d.i), 1), [data]);
  return (
    <div className="flex h-28 items-end gap-2">
      {data.map((d) => (
        <div key={d.d} className="flex flex-col items-center gap-2">
          <div className="w-6 rounded-md bg-slate-600/60" style={{ height: `${(d.i / max) * 80 + 20}px` }} title={`${d.i} incidents`} />
          <span className="text-[10px] tracking-wide text-slate-400">{d.d}</span>
        </div>
      ))}
    </div>
  );
}

function Line({ data }) {
  const max = Math.max(...data.map((d) => d.r));
  const pts = data.map((d, i) => `${(i / (data.length - 1)) * 280},${100 - (d.r / max) * 100}`).join(" ");
  return (
    <svg viewBox="0 0 280 100" className="h-24 w-full">
      <polyline fill="none" stroke="currentColor" strokeWidth="2" points={pts} className="text-cyan-300" />
    </svg>
  );
}

function Device({ d }) {
  const map = {
    online: { icon: CheckCircle2, cls: "text-emerald-300", chip: "bg-emerald-400/15 ring-emerald-300/30 text-emerald-200" },
    degraded: { icon: Wifi, cls: "text-yellow-300", chip: "bg-yellow-400/15 ring-yellow-300/30 text-yellow-200" },
    offline: { icon: AlertTriangle, cls: "text-rose-300", chip: "bg-rose-400/15 ring-rose-300/30 text-rose-200" },
  };
  const conf = map[d.status];
  const Icon = conf.icon;
  return (
    <div className="flex items-center justify-between rounded-xl bg-white/5 p-3 ring-1 ring-white/10">
      <div className="flex items-center gap-3">
        <Server className="h-5 w-5 text-slate-300" />
        <p className="text-sm text-white">{d.name}</p>
      </div>
      <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs ring-1 ${conf.chip}`}>
        <Icon className={`h-3.5 w-3.5 ${conf.cls}`} /> {d.status}
      </span>
    </div>
  );
}

export default function Security() {
  const [range, setRange] = useState("Last 7 days");
  const [contrast, setContrast] = useState(true);

  return (
   <Layout>
     <div className={`${contrast ? "bg-[radial-gradient(1200px_600px_at_30%_-10%,#0f172a_20%,#020617_60%)]" : "bg-slate-950"} min-h-screen w-full`}>
      <div className="mx-auto max-w-7xl px-4 pb-20 pt-10">
        {/* Header */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white">Security</h1>
            <p className="mt-1 text-sm text-slate-300">Control doors, watch cameras, and act on alerts. Built for multi-location gyms.</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setContrast((v) => !v)} className={`rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ring-white/10 ${contrast ? "bg-white/10 text-teal-200" : "bg-slate-800 text-slate-200"}`}>High contrast</button>
            <select value={range} onChange={(e) => setRange(e.target.value)} className="rounded-xl bg-slate-800/80 px-3 py-2 text-sm text-slate-200 ring-1 ring-white/10 focus:outline-none">
              {["Today", "Last 7 days", "Last 30 days", "This quarter"].map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
            <button className="inline-flex items-center gap-2 rounded-xl bg-emerald-400/10 px-3 py-2 text-sm font-semibold text-emerald-200 ring-1 ring-emerald-300/30 hover:bg-emerald-400/20"><Download className="h-4 w-4" /> Export</button>
          </div>
        </div>

        {/* KPI */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Stat icon={Lock} title="Doors secured" value={fmt(seed.kpis.doors)} hint="All access points under control" />
          <Stat icon={Camera} title="Active cameras" value={fmt(seed.kpis.cameras)} hint="Streaming with motion detection" />
          <Stat icon={Bell} title="Incidents" value={fmt(seed.kpis.incidents)} hint="Last 24 hours" />
          <Stat icon={Shield} title="Uptime" value={`${seed.kpis.uptime}%`} hint="Platform availability" />
        </div>

        {/* Activity + Goals */}
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl bg-slate-900/50 p-5 ring-1 ring-white/10 shadow-xl lg:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-300">Weekly security activity</p>
                <p className="text-xs text-slate-400">Incidents and response score</p>
              </div>
              <Calendar className="h-5 w-5 text-slate-400" />
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <Bars data={seed.week} />
              <Line data={seed.week} />
            </div>
          </div>

          <div className="rounded-2xl bg-slate-900/50 p-5 ring-1 ring-white/10 shadow-xl">
            <p className="text-sm text-slate-300">Goals</p>
            <p className="text-xs text-slate-400">Track and improve</p>
            <div className="mt-4 space-y-5">
              <Progress label="Average response time (min)" current={seed.goals.response.current} target={seed.goals.response.target} />
              <Progress label="Camera coverage (%)" current={seed.goals.coverage.current} target={seed.goals.coverage.target} suffix="%" />
              <Progress label="MFA adoption (%)" current={seed.goals.mfa.current} target={seed.goals.mfa.target} suffix="%" />
            </div>
            <button className="mt-5 w-full rounded-xl bg-white/10 py-2 text-sm font-semibold text-white ring-1 ring-white/10 hover:bg-white/15">Save goals</button>
          </div>
        </div>

        {/* Live alerts + Devices */}
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl bg-slate-900/50 p-5 ring-1 ring-white/10 shadow-xl lg:col-span-2">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-rose-300" />
                <p className="text-sm text-slate-200">Live alerts</p>
              </div>
              <button className="text-xs text-teal-200">Clear all</button>
            </div>
            <div className="space-y-3">
              {seed.alerts.map((a, i) => (
                <div key={i} className="flex items-start justify-between rounded-xl bg-white/5 p-3 ring-1 ring-white/10">
                  <div className="flex items-start gap-3">
                    {a.level === "high" ? (
                      <AlertTriangle className="mt-0.5 h-5 w-5 text-rose-300" />
                    ) : a.level === "med" ? (
                      <Activity className="mt-0.5 h-5 w-5 text-yellow-300" />
                    ) : (
                      <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-300" />
                    )}
                    <div>
                      <p className="text-sm text-white">{a.text}</p>
                      <p className="text-xs text-slate-400">{a.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="rounded-lg bg-white/5 px-2 py-1 text-xs text-slate-200 ring-1 ring-white/10">View</button>
                    <button className="rounded-lg bg-emerald-400/15 px-2 py-1 text-xs text-emerald-200 ring-1 ring-emerald-300/30">Resolve</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-slate-900/50 p-5 ring-1 ring-white/10 shadow-xl">
            <div className="mb-3 flex items-center gap-2">
              <Server className="h-5 w-5 text-slate-300" />
              <p className="text-sm text-slate-200">Device health</p>
            </div>
            <div className="space-y-3">
              {seed.devices.map((d) => (
                <Device key={d.name} d={d} />
              ))}
            </div>
          </div>
        </div>

        {/* Access controls */}
        <div className="mt-8 rounded-2xl bg-slate-900/50 p-6 ring-1 ring-white/10 shadow-xl">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <KeyRound className="h-5 w-5 text-slate-300" />
              <h2 className="text-lg font-semibold text-white">Access policies</h2>
            </div>
            <button className="rounded-xl bg-gradient-to-r from-teal-400 to-cyan-300 px-4 py-2 text-sm font-semibold text-slate-900">Create rule</button>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {[{
              name: "Staff 24x7",
              desc: "Unrestricted access with MFA",
            },{
              name: "Members",
              desc: "6 am to 11 pm, valid membership required",
            },{
              name: "Guests",
              desc: "Day pass with host approval",
            }].map((r)=> (
              <div key={r.name} className="rounded-xl bg-white/5 p-4 ring-1 ring-white/10">
                <p className="text-sm font-semibold text-white">{r.name}</p>
                <p className="mt-1 text-xs text-slate-300">{r.desc}</p>
                <div className="mt-3 flex gap-2">
                  <button className="rounded-lg bg-white/5 px-2 py-1 text-xs text-slate-200 ring-1 ring-white/10">Edit</button>
                  <button className="rounded-lg bg-rose-400/15 px-2 py-1 text-xs text-rose-200 ring-1 ring-rose-300/30">Disable</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl bg-slate-900/50 p-5 ring-1 ring-white/10 shadow-xl lg:col-span-2">
            <p className="text-sm text-slate-300">Quick actions</p>
            <p className="text-xs text-slate-400">Grant access, revoke, or test lockdown</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <input placeholder="User or member email" className="rounded-xl bg-slate-800/80 px-3 py-2 text-sm text-white ring-1 ring-white/10 placeholder:text-slate-400" />
              <select className="rounded-xl bg-slate-800/80 px-3 py-2 text-sm text-slate-200 ring-1 ring-white/10">
                <option>Role</option>
                <option>Member</option>
                <option>Coach</option>
                <option>Admin</option>
              </select>
              <select className="rounded-xl bg-slate-800/80 px-3 py-2 text-sm text-slate-200 ring-1 ring-white/10">
                <option>Site</option>
                <option>Downtown</option>
                <option>Hyderabad</option>
                <option>Indiranagar</option>
              </select>
              <button className="rounded-xl bg-gradient-to-r from-teal-400 to-cyan-300 px-4 py-2 text-sm font-semibold text-slate-900">Grant access</button>
            </div>
          </div>

          <div className="rounded-2xl bg-slate-900/50 p-5 ring-1 ring-white/10 shadow-xl">
            <p className="text-sm text-slate-300">Threat level</p>
            <div className="mt-3 h-28 w-full overflow-hidden rounded-xl bg-gradient-to-r from-emerald-400/20 via-yellow-400/20 to-rose-400/20 ring-1 ring-white/10">
              <div className="h-full w-3/5 bg-emerald-400/30" />
            </div>
            <p className="mt-2 text-xs text-slate-400">Normal. No action needed.</p>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="mt-12 rounded-2xl bg-gradient-to-r from-teal-500/10 to-cyan-500/10 p-6 ring-1 ring-teal-400/20">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <p className="text-xl font-bold text-white">Lock down your franchise security</p>
              <p className="text-sm text-teal-200">SSO, MFA, camera feeds, and door control in one place.</p>
            </div>
            <div className="flex gap-3">
              <button className="rounded-xl bg-white px-5 py-2 font-semibold text-slate-900">Book a demo</button>
              <button className="rounded-xl bg-slate-900 px-5 py-2 font-semibold text-white ring-1 ring-white/10">Talk to security team</button>
            </div>
          </div>
        </div>
      </div>
    </div>
   </Layout>
  );
}