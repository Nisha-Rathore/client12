import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Dumbbell,
  Mail,
  Lock,
  Phone,
  User,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

function strengthScore(pw) {
  let s = 0;
  if (pw.length >= 8) s += 1;
  if (/[A-Z]/.test(pw)) s += 1;
  if (/[a-z]/.test(pw)) s += 1;
  if (/[0-9]/.test(pw)) s += 1;
  if (/[^A-Za-z0-9]/.test(pw)) s += 1;
  return Math.min(s, 5);
}

export default function SignUpGym() {
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", pass: "", confirm: "", plan: "Monthly" });
  const [agree, setAgree] = useState(false);
  const [promo, setPromo] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");

  const s = strengthScore(form.pass);
  const labels = ["weak", "fair", "ok", "strong", "elite"]; 
  const percent = useMemo(() => (s / 5) * 100, [s]);

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setOk("");
    if (!form.name || !form.email || !form.pass || !form.confirm) {
      setError("Fill in all required fields");
      return;
    }
    if (form.pass !== form.confirm) {
      setError("Passwords do not match");
      return;
    }
    if (!agree) {
      setError("Please accept the terms to continue");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOk("Account created. Check your email to verify.");
    }, 900);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-white">
      {/* Top bar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-gray-100 ring-1 ring-gray-300">
            <Dumbbell className="h-5 w-5 text-teal-600" />
          </div>
          <span className="text-lg font-bold tracking-tight text-slate-900">GymMS</span>
        </div>
        <a href="#signin" className="rounded-lg bg-teal-500 px-3 py-1.5 text-sm text-white ring-1 ring-gray-300 hover:bg-teal-200 hover:text-teal-800">Sign in</a>
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 pt-4 md:grid-cols-2">
        {/* Hero copy */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <p className="inline-flex items-center gap-2 rounded-full bg-teal-400/10 px-3 py-1 text-xs font-semibold text-teal-700 ring-1 ring-teal-300/30">
            <ShieldCheck className="h-3.5 w-3.5" /> Instant access. Cancel anytime.
          </p>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-5xl">
            Create your <span className="text-teal-500">account</span>
          </h1>
          <p className="mt-3 max-w-xl text-sm text-slate-600">
            Manage members, classes, billing, and door access from one dashboard. It takes less than a minute.
          </p>
          <ul className="mt-6 grid max-w-md gap-2 text-sm text-slate-700">
            {[
              "Unlimited member records",
              "Attendance and class schedules",
              "Secure payments and invoices",
            ].map((t) => (
              <li key={t} className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-teal-600" /> {t}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Sign up card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.05 }} className="relative">
          <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-teal-500/40 to-cyan-500/40 blur-xl" />
          <div className="relative rounded-3xl bg-white p-6 border border-gray-200 shadow-lg">
            <div className="mb-5">
              <p className="text-sm text-slate-600">Start your free trial</p>
              <p className="text-lg font-semibold text-slate-900">No credit card needed</p>
            </div>

            <form onSubmit={submit} className="grid grid-cols-1 gap-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs text-gray-700">Full name</label>
                  <div className="mt-1 flex items-center gap-2 rounded-xl bg-gray-100 px-3 ring-1 ring-gray-300 focus-within:ring-teal-300/40">
                    <User className="h-4 w-4 text-gray-500" />
                    <input value={form.name} onChange={(e)=>update("name", e.target.value)} placeholder="Alex Carter" className="w-full bg-transparent py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none" />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-700">Phone</label>
                  <div className="mt-1 flex items-center gap-2 rounded-xl bg-gray-100 px-3 ring-1 ring-gray-300 focus-within:ring-teal-300/40">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <input value={form.phone} onChange={(e)=>update("phone", e.target.value)} placeholder="+91 90000 00000" className="w-full bg-transparent py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none" />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-700">Email</label>
                  <div className="mt-1 flex items-center gap-2 rounded-xl bg-gray-100 px-3 ring-1 ring-gray-300 focus-within:ring-teal-300/40">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <input value={form.email} onChange={(e)=>update("email", e.target.value)} type="email" placeholder="you@gyms.com" className="w-full bg-transparent py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none" />
                  </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs text-gray-700">Password</label>
                  <div className="mt-1 flex items-center gap-2 rounded-xl bg-gray-100 px-3 ring-1 ring-gray-300 focus-within:ring-teal-300/40">
                    <Lock className="h-4 w-4 text-gray-500" />
                    <input value={form.pass} onChange={(e)=>update("pass", e.target.value)} type={show?"text":"password"} placeholder="At least 8 characters" className="w-full bg-transparent py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none" />
                    <button type="button" onClick={()=>setShow(!show)} className="p-1 text-gray-500 hover:text-gray-700">{show? <EyeOff className="h-4 w-4"/>:<Eye className="h-4 w-4"/>}</button>
                  </div>
                  {/* strength bar */}
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-[11px] text-gray-500">
                      <span>Password strength</span>
                      <span className="capitalize">{labels[Math.max(0, s-1)] || ""}</span>
                    </div>
                    <div className="mt-1 h-2.5 w-full overflow-hidden rounded-full bg-gray-200">
                      <div className="h-full rounded-full bg-gradient-to-r from-rose-300 via-yellow-300 to-emerald-300" style={{ width: `${percent}%` }} />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-700">Confirm password</label>
                  <div className="mt-1 flex items-center gap-2 rounded-xl bg-gray-100 px-3 ring-1 ring-gray-300 focus-within:ring-teal-300/40">
                    <Lock className="h-4 w-4 text-gray-500" />
                    <input value={form.confirm} onChange={(e)=>update("confirm", e.target.value)} type={show?"text":"password"} placeholder="Re enter password" className="w-full bg-transparent py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs text-gray-700">Plan</label>
                  <select value={form.plan} onChange={(e)=>update("plan", e.target.value)} className="mt-1 w-full rounded-xl bg-gray-100 px-3 py-2 text-sm text-gray-900 ring-1 ring-gray-300 focus:outline-none">
                    <option>Monthly</option>
                    <option>Quarterly</option>
                    <option>Annual</option>
                  </select>
                </div>
                <div className="rounded-xl bg-gray-100 p-3 ring-1 ring-gray-300">
                  <p className="text-xs font-semibold text-gray-900">Perks with trial</p>
                  <ul className="mt-1 space-y-1 text-[11px] text-gray-700">
                    <li className="flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-teal-600"/> 1 admin seat</li>
                    <li className="flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-teal-600"/> Unlimited members</li>
                    <li className="flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-teal-600"/> Class scheduling</li>
                  </ul>
                </div>
              </div>

              {error && (
                <div className="rounded-lg bg-rose-100 p-2 text-xs text-rose-700 ring-1 ring-rose-300/30 flex items-center gap-2"><AlertTriangle className="h-4 w-4"/> {error}</div>
              )}
              {ok && (
                <div className="rounded-lg bg-emerald-100 p-2 text-xs text-emerald-700 ring-1 ring-emerald-300/30 flex items-center gap-2"><CheckCircle2 className="h-4 w-4"/> {ok}</div>
              )}

              <div className="flex flex-wrap items-center justify-between gap-3">
                <label className="flex items-center gap-2 text-xs text-gray-700">
                  <input checked={agree} onChange={(e)=>setAgree(e.target.checked)} type="checkbox" className="h-3.5 w-3.5 rounded border-gray-300 bg-white focus:ring-0" />
                  I agree to the <a href="#terms" className="font-semibold text-teal-600">Terms</a> and <a href="#privacy" className="font-semibold text-teal-600">Privacy</a>
                </label>
                <label className="flex items-center gap-2 text-xs text-gray-700">
                  <input checked={promo} onChange={(e)=>setPromo(e.target.checked)} type="checkbox" className="h-3.5 w-3.5 rounded border-gray-300 bg-white focus:ring-0" />
                  Send me product tips
                </label>
              </div>

              <button type="submit" disabled={loading} className="group mt-1 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-400 to-cyan-300 px-4 py-2.5 text-sm font-semibold text-slate-900 transition hover:opacity-95 disabled:cursor-not-allowed">
                {loading ? "Creating account..." : "Create account"}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>

              <div className="relative py-3 text-center text-xs text-gray-500">
                <span className="relative z-10 bg-white px-3">or sign up with</span>
                <div className="absolute left-0 right-0 top-1/2 -z-0 h-px -translate-y-1/2 bg-gray-200" />
              </div>

              <div className="grid grid-cols-3 gap-2">
                {["Google","Apple","Microsoft"].map((p) => (
                  <button key={p} type="button" className="rounded-xl bg-gray-100 py-2 text-xs font-semibold text-slate-900 ring-1 ring-gray-300 hover:bg-gray-200">
                    {p}
                  </button>
                ))}
              </div>

              <p className="pt-2 text-center text-xs text-gray-500">
                Already have an account? <a href="#signin" className="font-semibold text-teal-600">Sign in</a>
              </p>
            </form>
          </div>
        </motion.div>
      </div>

      {/* Badges */}
      <div className="mx-auto mt-14 grid max-w-7xl gap-4 px-6 md:grid-cols-3">
        {["99.9% uptime","Bank grade encryption","Passkeys and MFA"].map((k) => (
          <div key={k} className="rounded-2xl bg-teal-50 p-4 border border-gray-200 shadow-sm">
            <p className="text-sm font-semibold text-teal-900">{k}</p>
            <p className="mt-1 text-xs text-gray-600">Your data and access are protected across every location.</p>
          </div>
        ))}
      </div>

      <footer className="mx-auto mt-10 max-w-7xl px-6 pb-10 text-center text-[11px] text-slate-500">
        © {new Date().getFullYear()} GymOS. All rights reserved.
      </footer>
    </div>
  );
}