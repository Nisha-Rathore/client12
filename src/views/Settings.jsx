import React, { useMemo, useState } from "react";
import Layout from "../components/Layout";

// Settings page for a gym management website
// Light theme UI
// Tailwind only. No TypeScript.

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile");
  const [highContrast, setHighContrast] = useState(false);
  const [range, setRange] = useState("7");

  return (
    <Layout>
      <div className="min-h-screen w-full bg-white text-slate-900">
        <div className="mx-auto max-w-7xl px-4 py-6">
          {/* Header */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight"><span className="text-teal-500">Settings</span></h1>
              <p className="mt-1 text-sm text-slate-700">Manage your account, preferences, and club level controls.</p>
            </div>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 text-xs">
                <span>High contrast</span>
                <input type="checkbox" checked={highContrast} onChange={e=>setHighContrast(e.target.checked)} />
              </label>
              <select value={range} onChange={e=>setRange(e.target.value)} className="rounded-xl bg-gray-200 px-3 py-2 text-xs ring-1 ring-gray-300 focus:outline-none">
                <option value="7">Last 7 days</option>
                <option value="30">Last 30 days</option>
                <option value="90">Last 90 days</option>
              </select>
              <button className="rounded-xl bg-teal-500 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-teal-200 hover:text-teal-600">Export</button>
            </div>
          </div>

          {/* Tabs + content */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            {/* Left rail */}
            <nav className="lg:col-span-3">
              <ul className="space-y-2">
                {[
                  { id: "profile", label: "Profile" },
                  { id: "security", label: "Security" },
                  { id: "notifications", label: "Notifications" },
                  { id: "appearance", label: "Appearance" },
                  { id: "branches", label: "Branches" },
                  { id: "integrations", label: "Integrations" },
                  { id: "billing", label: "Billing" },
                  { id: "advanced", label: "Advanced" },
                ].map(t => (
                  <li key={t.id}>
                    <button onClick={()=>setActiveTab(t.id)} className={`w-full rounded-2xl border px-4 py-3 text-left text-sm transition ${activeTab===t.id?"border-teal-500 bg-teal-50 shadow":"border-gray-300 bg-white hover:border-teal-500"}`}>{t.label}</button>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Main card */}
            <div className="lg:col-span-9">
              {activeTab === "profile" && <ProfileTab />}
              {activeTab === "security" && <SecurityTab />}
              {activeTab === "notifications" && <NotificationsTab />}
              {activeTab === "appearance" && <AppearanceTab />}
              {activeTab === "branches" && <BranchesTab />}
              {activeTab === "integrations" && <IntegrationsTab />}
              {activeTab === "billing" && <BillingTab />}
              {activeTab === "advanced" && <AdvancedTab />}
            </div>
          </div>

          <footer className="mt-10 border-t border-gray-300 py-6 text-center text-xs text-gray-500">© {new Date().getFullYear()} IronBase Gym. All rights reserved.</footer>
        </div>
      </div>
    </Layout>
  );
}

function Section({ title, subtitle, children }) {
  return (
    <div className="rounded-2xl border border-gray-300 bg-white p-5 shadow">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}

function SaveBar({ onReset, onSave }) {
  return (
    <div className="mt-4 flex items-center justify-end gap-2">
      <button onClick={onReset} className="rounded-xl bg-gray-300 px-4 py-2 text-sm">Reset</button>
      <button onClick={onSave} className="rounded-xl bg-teal-600 px-4 py-2 text-sm font-semibold hover:bg-teal-200 hover:text-teal-800 text-white shadow">Save changes</button>
    </div>
  );
}                 

/* PROFILE */
function ProfileTab() {
  const [name, setName] = useState("Vaibhav Singh");
  const [email, setEmail] = useState("vaibhav@ironbase.gym");
  const [phone, setPhone] = useState("+91 90000 00000");
  const [role, setRole] = useState("Admin");
  const [bio, setBio] = useState("Helps members hit real goals. Loves strength, hates fluff.");

  function save() { alert("Profile saved"); }
  function reset() { alert("Reverted changes"); }

  return (
    <div className="space-y-6">
      <Section title="Profile" subtitle="Your basic info for staff and members.">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="text-xs text-gray-600">Full name</label>
            <input value={name} onChange={e=>setName(e.target.value)} className="mt-1 w-full rounded-xl bg-teal-50 px-3 py-2 text-sm ring-1 ring-teal-500" />
          </div>
          <div>
            <label className="text-xs text-gray-600">Role</label>
            <select value={role} onChange={e=>setRole(e.target.value)} className="mt-1 w-full rounded-xl bg-teal-50 px-3 py-2 text-sm ring-1 ring-teal-500"><option>Admin</option><option>Manager</option><option>Trainer</option><option>Support</option></select>
          </div>
          <div>
            <label className="text-xs text-gray-600">Email</label>
            <input value={email} onChange={e=>setEmail(e.target.value)} className="mt-1 w-full rounded-xl bg-teal-50 px-3 py-2 text-sm ring-1 ring-teal-500" />
          </div>
          <div>
            <label className="text-xs text-gray-600">Phone</label>
            <input value={phone} onChange={e=>setPhone(e.target.value)} className="mt-1 w-full rounded-xl bg-teal-50 px-3 py-2 text-sm ring-1 ring-teal-500" />
          </div>
          <div className="md:col-span-2">
            <label className="text-xs text-gray-600">Bio</label>
            <textarea value={bio} onChange={e=>setBio(e.target.value)} rows={3} className="mt-1 w-full rounded-xl bg-teal-50 px-3 py-2 text-sm ring-1 ring-teal-500" />
          </div>
        </div>
        <SaveBar onReset={reset} onSave={save} />
      </Section>

      <Section title="Team visibility" subtitle="Choose what your team sees on member profiles.">
        <div className="grid grid-cols-2 gap-3 text-sm">
          {[
            "Workout history",
            "Body metrics",
            "Payment status",
            "Injury notes",
            "Diet plans",
            "Trainer comments",
          ].map(key => (
            <label key={key} className="flex items-center justify-between rounded-xl border border-teal-600 bg-teal-50 px-3 py-2">
              <span>{key}</span>
              <input type="checkbox" defaultChecked />
            </label>
          ))}
        </div>
        <SaveBar onReset={()=>{}} onSave={save} />
      </Section>
    </div>
  );
}

/* SECURITY */
function SecurityTab() {
  const [pwd, setPwd] = useState("");
  const [pwd2, setPwd2] = useState("");
  const [otp, setOtp] = useState(false);
  const [sessions] = useState([
    { id: 1, device: "Windows Chrome", ip: "103.22.10.4", last: "2h ago" },
    { id: 2, device: "Mac Safari", ip: "102.76.1.22", last: "1d ago" },
  ]);

  function save() { alert("Security settings saved"); }

  return (
    <div className="space-y-6">
      <Section title="Password" subtitle="Keep it long. Keep it unique.">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="text-xs text-gray-600">New password</label>
            <input value={pwd} onChange={e=>setPwd(e.target.value)} type="password" className="mt-1 w-full rounded-xl bg-gray-100 px-3 py-2 text-sm ring-1 ring-gray-300" />
          </div>
          <div>
            <label className="text-xs text-gray-600">Confirm password</label>
            <input value={pwd2} onChange={e=>setPwd2(e.target.value)} type="password" className="mt-1 w-full rounded-xl bg-gray-100 px-3 py-2 text-sm ring-1 ring-gray-300" />
          </div>
        </div>
        <SaveBar onReset={()=>{ setPwd(""); setPwd2(""); }} onSave={save} />
      </Section>

      <Section title="Two factor" subtitle="One time code for sign in">
        <div className="flex items-center justify-between rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm">
          <div>
            <div className="font-semibold">Authenticator app</div>
            <div className="text-gray-600">Get a code when you sign in</div>
          </div>
          <input type="checkbox" checked={otp} onChange={e=>setOtp(e.target.checked)} />
        </div>
        <SaveBar onReset={()=>setOtp(false)} onSave={save} />
      </Section>

      <Section title="Sessions" subtitle="Devices using your account.">
        <ul className="space-y-2">
          {sessions.map(s => (
            <li key={s.id} className="flex items-center justify-between rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm">
              <div>
                <div className="font-semibold">{s.device}</div>
                <div className="text-xs text-gray-600">IP {s.ip} • {s.last}</div>
              </div>
              <button className="rounded-lg bg-gray-300 px-3 py-1 text-xs">Sign out</button>
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
}

/* NOTIFICATIONS */
function NotificationsTab() {
  const [email, setEmail] = useState(true);
  const [sms, setSms] = useState(true);
  const [push, setPush] = useState(true);

  function save() { alert("Notification preferences saved"); }

  return (
    <div className="space-y-6">
      <Section title="Member updates" subtitle="Choose what you receive.">
        <div className="grid grid-cols-2 gap-3 text-sm">
          {[
            { k: "Class reminders", state: email, set: setEmail },
            { k: "New signups", state: sms, set: setSms },
            { k: "PT booking alerts", state: push, set: setPush },
            { k: "Low attendance", state: true, set: ()=>{} },
            { k: "Missed payments", state: true, set: ()=>{} },
            { k: "Weekly summary", state: true, set: ()=>{} },
          ].map(item => (
            <label key={item.k} className="flex items-center justify-between rounded-xl border border-gray-300 bg-gray-50 px-3 py-2">
              <span>{item.k}</span>
              <input type="checkbox" defaultChecked={item.state} onChange={e=>item.set(e.target.checked)} />
            </label>
          ))}
        </div>
        <SaveBar onReset={()=>{ setEmail(true); setSms(true); setPush(true); }} onSave={save} />
      </Section>

      <Section title="Channels" subtitle="Your default delivery method.">
        <div className="grid grid-cols-2 gap-3 text-sm">
          {[
            { label: "Email", key: "email" },
            { label: "SMS", key: "sms" },
            { label: "Push", key: "push" },
            { label: "In app", key: "inapp" },
          ].map(c => (
            <div key={c.key} className="flex items-center justify-between rounded-xl border border-gray-300 bg-gray-50 px-3 py-2">
              <span>{c.label}</span>
              <input type="checkbox" defaultChecked />
            </div>
          ))}
        </div>
        <SaveBar onReset={()=>{}} onSave={save} />
      </Section>
    </div>
  );
}

/* APPEARANCE */
function AppearanceTab() {
  const [theme, setTheme] = useState("emerald");
  const [density, setDensity] = useState("comfortable");

  function save() { alert("Appearance saved"); }

  return (
    <div className="space-y-6">
      <Section title="Theme" subtitle="Pick your accent and layout density.">
        <div className="grid grid-cols-2 gap-3">
          <select value={theme} onChange={e=>setTheme(e.target.value)} className="rounded-xl bg-gray-100 px-3 py-2 text-sm ring-1 ring-gray-300">
            <option value="emerald">Emerald</option>
            <option value="cyan">Cyan</option>
            <option value="indigo">Indigo</option>
            <option value="rose">Rose</option>
          </select>
          <select value={density} onChange={e=>setDensity(e.target.value)} className="rounded-xl bg-gray-100 px-3 py-2 text-sm ring-1 ring-gray-300">
            <option value="comfortable">Comfortable</option>
            <option value="compact">Compact</option>
          </select>
        </div>
        <div className="mt-4 grid grid-cols-4 gap-3">
          {[...Array(8)].map((_,i)=>(
            <div key={i} className="h-20 rounded-xl border border-gray-300 bg-gray-100"></div>
          ))}
        </div>
        <SaveBar onReset={()=>{ setTheme("emerald"); setDensity("comfortable"); }} onSave={save} />
      </Section>
    </div>
  );
}

/* BRANCHES */
function BranchesTab() {
  const [branches, setBranches] = useState([
    { id: 1, name: "Hyderabad", code: "HYD", status: "Open" },
    { id: 2, name: "Agra", code: "AGR", status: "Open" },
    { id: 3, name: "Delhi", code: "DEL", status: "Maintenance" },
  ]);
  const [newBranch, setNewBranch] = useState({ name: "", code: "" });

  function addBranch() {
    if (!newBranch.name || !newBranch.code) return alert("Add name and code");
    setBranches([{ id: Date.now(), name: newBranch.name, code: newBranch.code, status: "Open" }, ...branches]);
    setNewBranch({ name: "", code: "" });
  }

  return (
    <div className="space-y-6">
      <Section title="Branches" subtitle="Manage locations and status.">
        <div className="mb-3 grid grid-cols-3 gap-3 text-sm">
          <input value={newBranch.name} onChange={e=>setNewBranch({ ...newBranch, name: e.target.value })} placeholder="Branch name" className="rounded-xl bg-gray-100 px-3 py-2 ring-1 ring-gray-300" />
          <input value={newBranch.code} onChange={e=>setNewBranch({ ...newBranch, code: e.target.value })} placeholder="Code" className="rounded-xl bg-gray-100 px-3 py-2 ring-1 ring-gray-300" />
          <button onClick={addBranch} className="rounded-xl bg-cyan-400 px-4 py-2 font-semibold text-cyan-950">Add</button>
        </div>
        <ul className="space-y-2">
          {branches.map(b => (
            <li key={b.id} className="flex items-center justify-between rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm">
              <div>
                <div className="font-semibold">{b.name} • {b.code}</div>
                <div className="text-xs text-gray-600">Status {b.status}</div>
              </div>
              <select defaultValue={b.status} className="rounded-lg bg-gray-200 px-2 py-1 text-xs ring-1 ring-gray-300"><option>Open</option><option>Maintenance</option><option>Closed</option></select>
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
}

/* INTEGRATIONS */
function IntegrationsTab() {
  const tools = [
    { id: "razorpay", name: "Razorpay", desc: "Payments and invoices", status: "Connected" },
    { id: "whatsapp", name: "WhatsApp Business", desc: "Member chat and alerts", status: "Connected" },
    { id: "mailgun", name: "Mailgun", desc: "Email delivery", status: "Not connected" },
    { id: "twilio", name: "Twilio SMS", desc: "Text messages", status: "Not connected" },
  ];

  return (
    <div className="space-y-6">
      <Section title="Integrations" subtitle="Connect the tools you already use.">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {tools.map(t => (
            <div key={t.id} className="flex items-center justify-between rounded-2xl border border-gray-300 bg-gray-50 p-4">
              <div>
                <div className="text-sm font-semibold">{t.name}</div>
                <div className="text-xs text-gray-600">{t.desc}</div>
              </div>
              <button className={`rounded-lg px-3 py-1 text-xs ${t.status==='Connected'?'bg-green-500 text-white':'bg-gray-300'}`}>{t.status==='Connected'?'Connected':'Connect'}</button>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

/* BILLING */
function BillingTab() {
  const invoices = [
    { id: "INV-1101", amount: "₹ 24,000", date: "2025-09-01", status: "Paid" },
    { id: "INV-1098", amount: "₹ 24,000", date: "2025-08-01", status: "Paid" },
    { id: "INV-1095", amount: "₹ 24,000", date: "2025-07-01", status: "Paid" },
  ];

  return (
    <div className="space-y-6">
      <Section title="Plan" subtitle="Change or update your subscription.">
        <div className="flex items-center justify-between rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm">
          <div>
            <div className="font-semibold">Pro plan</div>
            <div className="text-xs text-gray-600">Unlimited members and branches</div>
          </div>
          <button className="rounded-lg bg-gray-300 px-3 py-1 text-xs">Change plan</button>
        </div>
      </Section>

      <Section title="Invoices" subtitle="Download past invoices.">
        <div className="overflow-hidden rounded-2xl border border-gray-300">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-left text-xs text-gray-600">
              <tr>
                <th className="px-4 py-3">Invoice</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {invoices.map(inv => (
                <tr key={inv.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{inv.id}</td>
                  <td className="px-4 py-3">{inv.date}</td>
                  <td className="px-4 py-3">{inv.amount}</td>
                  <td className="px-4 py-3"><span className="rounded bg-green-500/20 px-2 py-1 text-xs text-green-700">{inv.status}</span></td>
                  <td className="px-4 py-3 text-right"><button className="rounded-lg bg-gray-300 px-3 py-1 text-xs">Download</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  );
}

/* ADVANCED */
function AdvancedTab() {
  const [dangerOpen, setDangerOpen] = useState(false);

  return (
    <div className="space-y-6">
      <Section title="Automation" subtitle="Daily jobs and health checks.">
        <div className="grid grid-cols-2 gap-3 text-sm">
          {[
            "Daily backup",
            "Cleanup old sessions",
            "Rebuild analytics",
            "Sync email lists",
          ].map(k => (
            <label key={k} className="flex items-center justify-between rounded-xl border border-gray-300 bg-gray-50 px-3 py-2">
              <span>{k}</span>
              <input type="checkbox" defaultChecked />
            </label>
          ))}
        </div>
      </Section>

      <Section title="Danger zone" subtitle="These actions cannot be undone.">
        <div className="flex items-center justify-between rounded-xl border border-gray-300 bg-red-50 px-4 py-3 text-sm">
          <div>
            <div className="font-semibold text-red-700">Delete account</div>
            <div className="text-xs text-red-600">Remove the workspace and all data</div>
          </div>
          <button onClick={()=>setDangerOpen(true)} className="rounded-lg bg-red-600 px-3 py-1 text-xs text-white">Delete</button>
        </div>
      </Section>

      {dangerOpen && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4">
          <div className="w-full max-w-md rounded-2xl border border-gray-300 bg-white p-5">
            <h4 className="text-lg font-semibold">Confirm deletion</h4>
            <p className="mt-1 text-sm text-gray-600">Type DELETE to confirm</p>
            <input placeholder="DELETE" className="mt-3 w-full rounded-xl bg-gray-100 px-3 py-2 text-sm ring-1 ring-gray-300" />
            <div className="mt-4 flex items-center justify-end gap-2">
              <button onClick={()=>setDangerOpen(false)} className="rounded-xl bg-gray-300 px-4 py-2 text-sm">Cancel</button>
              <button className="rounded-xl bg-red-600 px-4 py-2 text-sm text-white">Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
