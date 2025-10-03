import React, { useState } from "react";
import { motion } from "framer-motion";
import { Dumbbell, Mail, Lock, Eye, EyeOff, ArrowRight, CheckCircle2, AlertTriangle, ShieldCheck } from "lucide-react";

export default function ForgotResetPasswordGym() {
  const [step, setStep] = useState("forgot"); // forgot | verify | reset
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [pass, setPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgot = (e) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("verify");
      setMessage("Verification code sent to your email.");
    }, 900);
  };

  const handleVerify = (e) => {
    e.preventDefault();
    if (code.length < 4) {
      setError("Invalid verification code");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("reset");
      setMessage("Code verified. You can reset your password.");
    }, 900);
  };

  const handleReset = (e) => {
    e.preventDefault();
    if (!pass || !confirm) {
      setError("Please fill both password fields");
      return;
    }
    if (pass !== confirm) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setMessage("Password has been reset successfully.");
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
        <a href="#signin" className="rounded-lg bg-white/10 px-3 py-1.5 text-sm text-white ring-1 ring-white/10 hover:bg-white/15">Sign in</a>
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 pt-4 md:grid-cols-2">
        {/* Hero copy */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <p className="inline-flex items-center gap-2 rounded-full bg-teal-400/10 px-3 py-1 text-xs font-semibold text-teal-200 ring-1 ring-teal-300/30">
            <ShieldCheck className="h-3.5 w-3.5" /> Secure password recovery
          </p>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-white md:text-5xl">
            Forgot or reset your password
          </h1>
          <p className="mt-3 max-w-xl text-sm text-slate-300">
            We'll help you get back into your account in a few simple steps. Just make sure you have access to your registered email.
          </p>
        </motion.div>

        {/* Forgot / Reset card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.05 }} className="relative">
          <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-teal-500/40 to-cyan-500/40 blur-xl" />
          <div className="relative rounded-3xl bg-slate-900/70 p-6 ring-1 ring-white/10 shadow-2xl">
            {message && (
              <div className="mb-4 flex items-center gap-2 rounded-lg bg-emerald-400/10 p-2 text-xs text-emerald-200 ring-1 ring-emerald-300/30">
                <CheckCircle2 className="h-4 w-4" /> {message}
              </div>
            )}
            {error && (
              <div className="mb-4 flex items-center gap-2 rounded-lg bg-rose-400/10 p-2 text-xs text-rose-200 ring-1 ring-rose-300/30">
                <AlertTriangle className="h-4 w-4" /> {error}
              </div>
            )}

            {step === "forgot" && (
              <form onSubmit={handleForgot} className="space-y-4">
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
                <button type="submit" disabled={loading} className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-400 to-cyan-300 px-4 py-2.5 text-sm font-semibold text-slate-900 transition hover:opacity-95 disabled:cursor-not-allowed">
                  {loading ? "Sending code..." : "Send verification code"}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              </form>
            )}

            {step === "verify" && (
              <form onSubmit={handleVerify} className="space-y-4">
                <div>
                  <label className="text-xs text-slate-300">Verification code</label>
                  <input
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Enter 6-digit code"
                    className="mt-1 w-full rounded-xl bg-slate-800/80 px-3 py-2 text-sm text-white placeholder:text-slate-400 ring-1 ring-white/10 focus:outline-none focus:ring-teal-300/40"
                  />
                </div>
                <button type="submit" disabled={loading} className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-400 to-cyan-300 px-4 py-2.5 text-sm font-semibold text-slate-900 transition hover:opacity-95 disabled:cursor-not-allowed">
                  {loading ? "Verifying..." : "Verify code"}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              </form>
            )}

            {step === "reset" && (
              <form onSubmit={handleReset} className="space-y-4">
                <div>
                  <label className="text-xs text-slate-300">New password</label>
                  <div className="mt-1 flex items-center gap-2 rounded-xl bg-slate-800/80 px-3 ring-1 ring-white/10 focus-within:ring-teal-300/40">
                    <Lock className="h-4 w-4 text-slate-400" />
                    <input
                      value={pass}
                      onChange={(e) => setPass(e.target.value)}
                      type={show ? "text" : "password"}
                      placeholder="Enter new password"
                      className="w-full bg-transparent py-2 text-sm text-white placeholder:text-slate-400 focus:outline-none"
                    />
                    <button type="button" onClick={() => setShow(!show)} className="p-1 text-slate-400 hover:text-slate-200">
                      {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="text-xs text-slate-300">Confirm password</label>
                  <div className="mt-1 flex items-center gap-2 rounded-xl bg-slate-800/80 px-3 ring-1 ring-white/10 focus-within:ring-teal-300/40">
                    <Lock className="h-4 w-4 text-slate-400" />
                    <input
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                      type={show ? "text" : "password"}
                      placeholder="Re-enter new password"
                      className="w-full bg-transparent py-2 text-sm text-white placeholder:text-slate-400 focus:outline-none"
                    />
                  </div>
                </div>
                <button type="submit" disabled={loading} className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-400 to-cyan-300 px-4 py-2.5 text-sm font-semibold text-slate-900 transition hover:opacity-95 disabled:cursor-not-allowed">
                  {loading ? "Resetting..." : "Reset password"}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>

      {/* Security badges */}
      <div className="mx-auto mt-14 grid max-w-7xl gap-4 px-6 md:grid-cols-3">
        {["99.9% uptime", "Bank-grade encryption", "Passkeys and MFA"].map((k) => (
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