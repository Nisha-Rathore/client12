import React, { useState } from "react";
import { motion } from "framer-motion";
import { Dumbbell, Mail, Lock, Eye, EyeOff, ShieldCheck, ArrowRight } from "lucide-react";


export default function SignInGym() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Enter your email and password");
      return;
    }
    setLoading(true);
    // plug in your auth API here
    setTimeout(() => {
      setLoading(false);
      // demo: simple check
      if (email.includes("@") && password.length >= 6) {
        alert("Signed in. Replace alert with router navigation.");
      } else {
        setError("Invalid credentials");
      }
    }, 900);
  };

  return (
  
      <div className="min-h-screen w-full bg-[radial-gradient(1200px_600px_at_30%_-10%,#0f172a_20%,#020617_60%)]">
      {/* Top bar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-white/10 ring-1 ring-white/10">
            <Dumbbell className="h-5 w-5 text-teal-300" />
          </div>
          <span className="text-lg font-bold tracking-tight text-white">GymOS</span>
        </div>
        <a href="#pricing" className="rounded-lg bg-white/10 px-3 py-1.5 text-sm text-white ring-1 ring-white/10 hover:bg-white/15">Pricing</a>
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 pt-6 md:grid-cols-2">
        {/* Hero copy */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <p className="inline-flex items-center gap-2 rounded-full bg-teal-400/10 px-3 py-1 text-xs font-semibold text-teal-200 ring-1 ring-teal-300/30">
            <ShieldCheck className="h-3.5 w-3.5" /> SSO ready • MFA supported
          </p>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-white md:text-5xl">
            Sign in and run your gym with confidence
          </h1>
          <p className="mt-3 max-w-xl text-sm text-slate-300">
            One login for classes, members, billing, and door access. Fast. Secure. Always on.
          </p>
          <ul className="mt-6 grid max-w-md gap-2 text-sm text-slate-200">
            {[
              "Role-based access for staff and coaches",
              "Automatic session logs and attendance",
              "Realtime alerts on payments and entries",
            ].map((t) => (
              <li key={t} className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-teal-300" /> {t}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Auth card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.05 }} className="relative">
          <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-teal-500/40 to-cyan-500/40 blur-xl" />
          <div className="relative rounded-3xl bg-slate-900/70 p-6 ring-1 ring-white/10 shadow-2xl">
            <div className="mb-5 flex items-center gap-2">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 ring-1 ring-white/10">
                <Lock className="h-5 w-5 text-teal-300" />
              </div>
              <div>
                <p className="text-sm text-slate-300">Welcome back</p>
                <p className="text-lg font-semibold text-white">Sign in to your account</p>
              </div>
            </div>

            <form onSubmit={submit} className="space-y-4">
              <div>
                <label className="text-xs text-slate-300">Email</label>
                <div className="mt-1 flex items-center gap-2 rounded-xl bg-slate-800/80 px-3 ring-1 ring-white/10 focus-within:ring-teal-300/40">
                  <Mail className="h-4 w-4 text-slate-400" />
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="you@gyms.com"
                    className="w-full bg-transparent py-2 text-sm text-white placeholder:text-slate-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-300">Password</label>
                <div className="mt-1 flex items-center gap-2 rounded-xl bg-slate-800/80 px-3 ring-1 ring-white/10 focus-within:ring-teal-300/40">
                  <Lock className="h-4 w-4 text-slate-400" />
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={show ? "text" : "password"}
                    placeholder="Enter your password"
                    className="w-full bg-transparent py-2 text-sm text-white placeholder:text-slate-400 focus:outline-none"
                  />
                  <button type="button" onClick={() => setShow(!show)} className="p-1 text-slate-400 hover:text-slate-200">
                    {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="rounded-lg bg-rose-400/10 p-2 text-xs text-rose-200 ring-1 ring-rose-300/30">
                  {error}
                </div>
              )}

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-xs text-slate-300">
                  <input type="checkbox" className="h-3.5 w-3.5 rounded border-slate-600 bg-slate-800 focus:ring-0" />
                  Remember me
                </label>
                <a href="#forgot" className="text-xs font-semibold text-teal-200">Forgot password?</a>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="group mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-400 to-cyan-300 px-4 py-2.5 text-sm font-semibold text-slate-900 transition hover:opacity-95 disabled:cursor-not-allowed"
              >
                {loading ? "Signing in..." : "Sign in"}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>

              <div className="relative py-3 text-center text-xs text-slate-400">
                <span className="relative z-10 bg-slate-900/70 px-3">or continue with</span>
                <div className="absolute left-0 right-0 top-1/2 -z-0 h-px -translate-y-1/2 bg-white/10" />
              </div>

              <div className="grid grid-cols-3 gap-2">
                {["Google","Apple","Microsoft"].map((p) => (
                  <button key={p} type="button" className="rounded-xl bg-white/10 py-2 text-xs font-semibold text-white ring-1 ring-white/10 hover:bg-white/15">
                    {p}
                  </button>
                ))}
              </div>

              <p className="pt-2 text-center text-xs text-slate-400">
                New here? <a href="#create" className="font-semibold text-teal-200">Create an account</a>
              </p>
            </form>
          </div>
        </motion.div>
      </div>

      {/* Bottom highlights */}
      <div className="mx-auto mt-14 grid max-w-7xl gap-4 px-6 md:grid-cols-3">
        {["99.9% uptime","Bank-grade encryption","Passkeys and MFA"].map((k) => (
          <div key={k} className="rounded-2xl bg-slate-900/60 p-4 ring-1 ring-white/10">
            <p className="text-sm font-semibold text-white">{k}</p>
            <p className="mt-1 text-xs text-slate-300">Your data and access are protected across every location.</p>
          </div>
        ))}
      </div>

      <footer className="mx-auto mt-10 max-w-7xl px-6 pb-10 text-center text-[11px] text-slate-500">
        © {new Date().getFullYear()} GymOS. All rights reserved.
      </footer>
    </div>
 
  );
}
