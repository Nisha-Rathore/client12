import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "../components/Layout";
import {
  LogOut,
  UserRound,
  TimerReset,
  ShieldCheck,
  Activity,
  TrendingUp,
  Moon,
  Sun,
  Download,
  X,
  Sparkles,
} from "lucide-react";

// If your app uses shadcn/ui, these imports will work out of the box.
// If not, replace them with your own components.
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";

// Utilities
const cn = (...classes) => classes.filter(Boolean).join(" ");

const NeonRing = ({ className }) => (
  <div
    className={cn(
      "pointer-events-none absolute inset-0 rounded-3xl",
      "[mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]",
      className
    )}
    style={{
      background:
        "conic-gradient(from 180deg at 50% 50%, rgba(59,130,246,.2), rgba(45,212,191,.2), rgba(168,85,247,.2), rgba(59,130,246,.2))",
      filter: "blur(24px)",
    }}
  />
);

const SparkBar = ({ value = 62, max = 100, height = 56 }) => {
  const bars = 24;
  const data = useMemo(() => {
    const arr = new Array(bars).fill(0).map((_, i) => {
      const t = i / bars;
      const base = Math.sin(t * Math.PI * 2) * 0.4 + 0.6; // 0.2..1.0
      const jitter = 0.15 * Math.sin(i * 1.7 + value * 0.05);
      return Math.max(0.08, Math.min(1, base + jitter));
    });
    return arr;
  }, [value]);
  return (
    <div className="flex items-end gap-1 w-full" aria-hidden>
      {data.map((v, i) => (
        <div
          key={i}
          className="flex-1 rounded-sm bg-gradient-to-b from-cyan-300/70 to-indigo-400/70"
          style={{ height: `${v * height}px` }}
        />
      ))}
    </div>
  );
};

const Stat = ({ icon: Icon, label, value, hint }) => (
  <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
    <div className="flex items-center gap-3">
      <div className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-cyan-400/20 to-fuchsia-400/20">
        <Icon className="size-5 text-cyan-200" />
      </div>
      <div>
        <p className="text-sm text-slate-300">{label}</p>
        <p className="text-xl font-semibold tracking-tight text-white">{value}</p>
      </div>
    </div>
    {hint ? <p className="mt-2 text-xs text-slate-400">{hint}</p> : null}
  </div>
);

export default function LogoutScreen() {
  const [confirm, setConfirm] = useState(false);
  const [dark, setDark] = useState(true);
  const [exportData, setExportData] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [countdown, setCountdown] = useState(6);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef(null);

  // Dark mode toggle for demo
  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [dark]);

  // Fancy progress for the session ring
  useEffect(() => {
    const anim = setInterval(() => {
      setProgress((p) => (p >= 100 ? 0 : p + 2));
    }, 60);
    return () => clearInterval(anim);
  }, []);

  const startCountdown = () => {
    setConfirm(true);
    if (timerRef.current) clearInterval(timerRef.current);
    setCountdown(6);
    timerRef.current = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(timerRef.current);
          // Place your actual logout handler here
          console.info("Logged out");
        }
        return c - 1;
      });
    }, 1000);
  };

  // Keyboard shortcut: L to logout
  useEffect(() => {
    const handler = (e) => {
      if (e.key.toLowerCase() === "l") startCountdown();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
   <Layout>
     <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-[#0b1120] via-[#10172a] to-[#0b1120] text-zinc-100">
      {/* gradient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-96 w-[70rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-cyan-500/20 via-indigo-500/20 to-fuchsia-500/20 blur-3xl" />
        <div className="absolute -bottom-40 left-0 h-96 w-[60rem] rounded-full bg-gradient-to-r from-fuchsia-500/10 via-cyan-500/10 to-indigo-500/10 blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 p-6 md:grid-cols-12">
        {/* Sidebar preview */}
        <aside className="hidden md:col-span-3 md:block">
          <Card className="rounded-3xl border-white/10 bg-white/5">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-base text-slate-200">
                StoreAdmin <span className="text-xs text-slate-400">v1.0</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                "Dashboard",
                "Management",
                "Workout & Diet Plans",
                "Our Services",
                "Authentication",
                "Products",
                "Notification & Communication",
                "Gym Blog",
                "Support Tickets",
                "Settings",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between rounded-xl px-3 py-2 text-sm text-slate-300 hover:bg-white/5"
                >
                  <span>{item}</span>
                  <span className="text-xs text-slate-500">›</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </aside>

        {/* Main */}
        <main className="relative md:col-span-9">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight">Ready to log out?</h1>
              <p className="mt-1 text-slate-300">
                Save your progress, export your data, and leave with a win.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                onClick={() => setDark((d) => !d)}
                className="rounded-full border border-white/10 bg-white/5"
              >
                {dark ? <Sun className="mr-2 size-4" /> : <Moon className="mr-2 size-4" />}Theme
              </Button>
              <Button variant="secondary" className="rounded-full bg-emerald-500/20 text-emerald-200 hover:bg-emerald-500/30">
                <Download className="mr-2 size-4" /> Export
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            {/* Left column */}
            <section className="lg:col-span-8 space-y-6">
              {/* Profile and quick summary */}
              <Card className="relative overflow-hidden rounded-3xl border-white/10 bg-white/5">
                <NeonRing />
                <CardContent className="p-6 md:p-8">
                  <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <motion.div
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="grid size-16 place-items-center rounded-2xl bg-gradient-to-br from-indigo-500/40 to-fuchsia-500/40"
                        >
                          <UserRound className="size-7 text-white" />
                        </motion.div>
                        <span className="absolute -bottom-1 -right-1 grid size-6 place-items-center rounded-full bg-emerald-500 text-xs font-bold text-white">
                          6
                        </span>
                      </div>
                      <div>
                        <p className="text-sm text-slate-300">Signed in as</p>
                        <p className="text-lg font-semibold">alex@ironforge.fit</p>
                        <p className="text-xs text-slate-400">Last sync 3m ago</p>
                      </div>
                    </div>
                    <div className="flex w-full items-center gap-4 md:w-auto">
                      <div className="w-40">
                        <Progress value={progress} className="h-2 bg-white/10" />
                        <p className="mt-1 text-xs text-slate-400">Weekly target</p>
                      </div>
                      <div className="hidden w-44 md:block">
                        <SparkBar value={progress} />
                        <p className="mt-1 text-xs text-slate-400">Activity pulse</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <Card className="rounded-3xl border-white/10 bg-white/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LogOut className="size-5 text-cyan-300" />
                    Choose what to do
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <button
                    onClick={startCountdown}
                    className="group rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-left transition hover:scale-[1.01] hover:bg-emerald-500/20"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold">Log out</span>
                      <TimerReset className="size-5 opacity-70" />
                    </div>
                    <p className="mt-1 text-sm text-emerald-200/80">Shortcut L</p>
                  </button>

                  <button className="group rounded-2xl border border-white/10 bg-white/5 p-4 text-left transition hover:scale-[1.01] hover:bg-white/10">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold">Switch account</span>
                      <Sparkles className="size-5 opacity-70" />
                    </div>
                    <p className="mt-1 text-sm text-slate-300">Use another email</p>
                  </button>

                  <button className="group rounded-2xl border border-white/10 bg-white/5 p-4 text-left transition hover:scale-[1.01] hover:bg-white/10">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold">Go back</span>
                      <X className="size-5 opacity-70" />
                    </div>
                    <p className="mt-1 text-sm text-slate-300">Return to dashboard</p>
                  </button>

                  <div className="col-span-1 md:col-span-3 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div>
                        <p className="font-medium">Export workout history</p>
                        <p className="text-xs text-slate-400">CSV will download on logout</p>
                      </div>
                      <Switch checked={exportData} onCheckedChange={setExportData} />
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p className="mb-2 text-sm text-slate-300">Leave a note</p>
                      <Textarea
                        rows={2}
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        placeholder="Any quick feedback before you leave?"
                        className="resize-none bg-transparent"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Stats */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <Stat icon={Activity} label="Active days" value="5/7" hint="This week" />
                <Stat icon={TrendingUp} label="Calories burned" value="3290" hint="Estimated total" />
                <Stat icon={ShieldCheck} label="Personal bests" value="4" hint="Major lifts" />
              </div>
            </section>

            {/* Right column: goals */}
            <section className="lg:col-span-4">
              <Card className="relative overflow-hidden rounded-3xl border-white/10 bg-white/5">
                <NeonRing />
                <CardHeader>
                  <CardTitle>Session safety</CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div>
                    <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
                      <span>Remember this device</span>
                      <Switch defaultChecked />
                    </div>
                    <p className="text-xs text-slate-400">Skips OTP for the next 30 days</p>
                  </div>
                  <div>
                    <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
                      <span>Close background sessions</span>
                      <Switch defaultChecked />
                    </div>
                    <p className="text-xs text-slate-400">Keeps your account protected</p>
                  </div>
                  <div>
                    <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
                      <span>Email me activity report</span>
                      <Switch />
                    </div>
                    <p className="text-xs text-slate-400">Weekly summary at 9 AM</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-6 rounded-3xl border-white/10 bg-gradient-to-br from-indigo-950/60 to-slate-900/60">
                <CardContent className="p-6">
                  <p className="text-sm text-slate-300">Pro tip</p>
                  <p className="mt-1 text-lg font-semibold">Press L to log out in one tap</p>
                  <p className="mt-1 text-sm text-slate-400">Works anywhere inside the app</p>
                </CardContent>
              </Card>
            </section>
          </div>

          {/* Confirm layer */}
          <AnimatePresence>
            {confirm && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4"
              >
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-[#0e1528] p-6 shadow-2xl"
                >
                  <NeonRing />
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <LogOut className="size-5 text-emerald-300" />
                      <h2 className="text-xl font-bold">Signing you out</h2>
                    </div>
                    <button onClick={() => setConfirm(false)} className="rounded-full bg-white/5 p-2 hover:bg-white/10">
                      <X className="size-4" />
                    </button>
                  </div>

                  <p className="text-slate-300">
                    We’ll close active sessions and secure your account. {exportData ? "Your CSV export will start automatically." : ""}
                  </p>

                  <div className="mt-4">
                    <Progress value={((6 - countdown) / 6) * 100} className="h-2 bg-white/10" />
                    <p className="mt-2 text-sm text-slate-400">Logging out in {countdown}s</p>
                  </div>

                  <div className="mt-6 flex items-center justify-end gap-3">
                    <Button variant="ghost" onClick={() => setConfirm(false)} className="border border-white/10 bg-white/5">
                      Cancel
                    </Button>
                    <Button className="bg-emerald-500 text-white hover:bg-emerald-600">
                      Log out now
                    </Button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
   </Layout>
  );
}
