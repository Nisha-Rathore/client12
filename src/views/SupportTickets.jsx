import React, { useMemo, useState } from "react";
import Layout from "../components/Layout";

// Support Tickets page for a gym management website
// Bold, dark UI inspired by the provided dashboard screenshot
// Tailwind only. No TypeScript.

const seedTickets = [
  { id: "GB-1042", subject: "App not logging workouts", member: "Aarav S.", club: "Hyderabad", priority: "High", status: "Open", created: "2025-10-01 09:34", updated: "2025-10-03 14:12", assignee: "Vikram", category: "App", replies: 2 },
  { id: "GB-1041", subject: "Refund for canceled class", member: "Nisha K.", club: "Agra", priority: "Medium", status: "Pending", created: "2025-10-01 08:02", updated: "2025-10-02 11:51", assignee: "Maya", category: "Billing", replies: 3 },
  { id: "GB-1039", subject: "Door access not working", member: "Rahul P.", club: "Delhi", priority: "Urgent", status: "Open", created: "2025-09-30 18:11", updated: "2025-10-01 07:41", assignee: "Aisha", category: "Facilities", replies: 1 },
  { id: "GB-1038", subject: "PT session reschedule", member: "Sanya R.", club: "Hyderabad", priority: "Low", status: "Resolved", created: "2025-09-29 10:19", updated: "2025-09-29 13:44", assignee: "Vikram", category: "Training", replies: 2 },
  { id: "GB-1035", subject: "Unable to renew membership", member: "Zara A.", club: "Agra", priority: "High", status: "Open", created: "2025-09-28 15:03", updated: "2025-09-30 12:15", assignee: "—", category: "Billing", replies: 0 },
  { id: "GB-1032", subject: "Steam room temperature", member: "Club: Delhi", club: "Delhi", priority: "Medium", status: "Pending", created: "2025-09-26 12:33", updated: "2025-09-27 09:10", assignee: "Ops", category: "Facilities", replies: 5 },
  { id: "GB-1027", subject: "Diet plan not syncing", member: "Ritika", club: "Online", priority: "Low", status: "Resolved", created: "2025-09-23 16:45", updated: "2025-09-24 08:55", assignee: "Maya", category: "App", replies: 4 },
];

export default function SupportTickets() {
  const [tickets, setTickets] = useState(seedTickets);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [priority, setPriority] = useState("all");
  const [category, setCategory] = useState("all");
  const [range, setRange] = useState("7");
  const [sort, setSort] = useState("updated-desc");
  const [selected, setSelected] = useState([]);
  const [drawer, setDrawer] = useState(null); // ticket id or null
  const [composeOpen, setComposeOpen] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

  const stats = useMemo(() => {
    const open = tickets.filter(t => t.status === "Open").length;
    const pending = tickets.filter(t => t.status === "Pending").length;
    const resolved = tickets.filter(t => t.status === "Resolved").length;
    const urgent = tickets.filter(t => t.priority === "Urgent").length;
    return [
      { label: "Open", value: open },
      { label: "Pending", value: pending },
      { label: "Resolved", value: resolved },
      { label: "Urgent", value: urgent },
    ];
  }, [tickets]);

  const filtered = useMemo(() => {
    let list = tickets
      .filter(t => (status === "all" ? true : t.status === status))
      .filter(t => (priority === "all" ? true : t.priority === priority))
      .filter(t => (category === "all" ? true : t.category === category))
      .filter(t => `${t.id} ${t.subject} ${t.member} ${t.club} ${t.assignee}`.toLowerCase().includes(query.toLowerCase()));

    if (sort === "updated-desc") list = list.sort((a,b)=> new Date(b.updated) - new Date(a.updated));
    if (sort === "updated-asc") list = list.sort((a,b)=> new Date(a.updated) - new Date(b.updated));
    if (sort === "priority") {
      const order = { Urgent: 0, High: 1, Medium: 2, Low: 3 };
      list = list.sort((a,b)=> order[a.priority]-order[b.priority]);
    }
    return list;
  }, [tickets, status, priority, category, query, sort]);

  function toggleSelect(id) {
    setSelected(s => s.includes(id) ? s.filter(x=>x!==id) : [...s, id]);
  }

  function bulkUpdate(field, value) {
    setTickets(ts => ts.map(t => selected.includes(t.id) ? { ...t, [field]: value, updated: new Date().toISOString().slice(0,16).replace('T',' ') } : t));
    setSelected([]);
  }

  function createTicket(data) {
    const id = `GB-${(1000 + Math.floor(Math.random()*9000))}`;
    const now = new Date().toISOString().slice(0,16).replace('T',' ');
    const t = { id, subject: data.subject, member: data.member || "—", club: data.club || "Online", priority: data.priority || "Medium", status: "Open", created: now, updated: now, assignee: data.assignee || "—", category: data.category || "App", replies: 0 };
    setTickets([t, ...tickets]);
    setComposeOpen(false);
    setDrawer(id);
  }

  const base = highContrast ? "from-teal-100 via-teal-50 to-teal-100" : "from-white via-teal-50 to-white";

  return (
    <Layout>
       <div className={`min-h-screen w-full bg-gradient-to-b ${base} text-slate-900`}>
      <div className="mx-auto max-w-7xl px-4 py-6">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Support Tickets</h1>
            <p className="mt-1 text-sm text-slate-600">Fast triage, clean visuals, real time updates.</p>
          </div>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-xs">
              <span>High contrast</span>
              <input type="checkbox" checked={highContrast} onChange={e=>setHighContrast(e.target.checked)} />
            </label>
            <select value={range} onChange={e=>setRange(e.target.value)} className="rounded-xl bg-white border border-gray-300 px-3 py-2 text-xs focus:outline-none">
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
            </select>
            <button onClick={()=>setComposeOpen(true)} className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 hover:brightness-110">New ticket</button>
          </div>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(s => (
            <div key={s.label} className="rounded-2xl border border-gray-300 bg-white p-4 shadow">
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-wide text-gray-600">{s.label}</p>
                <svg className="h-5 w-5 opacity-70" viewBox="0 0 24 24" fill="currentColor"><path d="M3 12h3l3 7 4-14 3 7h5"/></svg>
              </div>
              <div className="mt-2 text-2xl font-bold">{s.value}</div>
              <div className="text-xs text-gray-600">Updated {new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="mt-6 rounded-2xl border border-gray-300 bg-white p-4 shadow">
          <div className="grid gap-3 md:grid-cols-6">
            <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search tickets, members, assignees" className="md:col-span-2 rounded-xl bg-gray-100 border border-gray-300 px-3 py-2 text-sm focus:outline-none" />
            <select value={status} onChange={e=>setStatus(e.target.value)} className="rounded-xl bg-gray-100 border border-gray-300 px-3 py-2 text-sm"><option value="all">All status</option><option>Open</option><option>Pending</option><option>Resolved</option></select>
            <select value={priority} onChange={e=>setPriority(e.target.value)} className="rounded-xl bg-gray-100 border border-gray-300 px-3 py-2 text-sm"><option value="all">All priority</option><option>Urgent</option><option>High</option><option>Medium</option><option>Low</option></select>
            <select value={category} onChange={e=>setCategory(e.target.value)} className="rounded-xl bg-gray-100 border border-gray-300 px-3 py-2 text-sm"><option value="all">All categories</option><option>Billing</option><option>App</option><option>Facilities</option><option>Training</option></select>
            <select value={sort} onChange={e=>setSort(e.target.value)} className="rounded-xl bg-gray-100 border border-gray-300 px-3 py-2 text-sm"><option value="updated-desc">Newest updated</option><option value="updated-asc">Oldest updated</option><option value="priority">Priority</option></select>
          </div>
          {selected.length>0 && (
            <div className="mt-3 flex items-center justify-between rounded-xl bg-gray-100 px-3 py-2 text-sm">
              <div>{selected.length} selected</div>
              <div className="flex items-center gap-2">
                <button onClick={()=>bulkUpdate('status','Resolved')} className="rounded-lg bg-green-500 px-3 py-1 text-white">Mark resolved</button>
                <button onClick={()=>bulkUpdate('assignee','—')} className="rounded-lg bg-gray-500 px-3 py-1 text-white">Unassign</button>
                <button onClick={()=>setSelected([])} className="rounded-lg bg-gray-500 px-3 py-1 text-white">Clear</button>
              </div>
            </div>
          )}
        </div>

        {/* Table */}
        <div className="mt-6 overflow-hidden rounded-2xl border border-gray-300 bg-white shadow">
          <div className="grid grid-cols-12 gap-3 border-b border-gray-300 p-3 text-xs text-gray-600">
            <div className="col-span-1">Select</div>
            <div className="col-span-2">Ticket</div>
            <div className="col-span-3">Subject</div>
            <div className="col-span-2">Member</div>
            <div className="col-span-1">Priority</div>
            <div className="col-span-1">Status</div>
            <div className="col-span-2">Updated</div>
          </div>
          <ul className="divide-y divide-gray-300">
            {filtered.map(t => (
              <li key={t.id} className="grid grid-cols-12 items-center gap-3 px-3 py-3 hover:bg-gray-100">
                <div className="col-span-1">
                  <input type="checkbox" checked={selected.includes(t.id)} onChange={()=>toggleSelect(t.id)} />
                </div>
                <div className="col-span-2">
                  <button onClick={()=>setDrawer(t.id)} className="rounded bg-blue-100 px-2 py-1 text-xs hover:underline">{t.id}</button>
                  <div className="text-[11px] text-gray-600">{t.category} • {t.club}</div>
                </div>
                <div className="col-span-3">
                  <div className="text-sm font-medium">{t.subject}</div>
                  <div className="text-xs text-gray-600">Assignee: {t.assignee}</div>
                </div>
                <div className="col-span-2 text-sm">{t.member}</div>
                <div className="col-span-1">
                  <span className={`rounded px-2 py-1 text-xs ${
                    t.priority==='Urgent'?'bg-red-100 text-red-800':
                    t.priority==='High'?'bg-orange-100 text-orange-800':
                    t.priority==='Medium'?'bg-yellow-100 text-yellow-800':'bg-gray-100 text-gray-800'}`}>{t.priority}</span>
                </div>
                <div className="col-span-1">
                  <span className={`rounded px-2 py-1 text-xs ${t.status==='Resolved'?'bg-green-100 text-green-800':t.status==='Pending'?'bg-blue-100 text-blue-800':'bg-indigo-100 text-indigo-800'}`}>{t.status}</span>
                </div>
                <div className="col-span-2 text-xs text-gray-600">{t.updated}</div>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer actions */}
        <div className="mt-6 flex items-center justify-between text-sm">
          <div className="text-gray-600">{filtered.length} tickets</div>
          <div className="flex items-center gap-2">
            <button className="rounded-xl bg-gray-200 px-3 py-2">Export</button>
            <button className="rounded-xl bg-gray-200 px-3 py-2">Automation</button>
          </div>
        </div>
      </div>

      {/* Drawer */}
      {drawer && (
        <TicketDrawer ticket={tickets.find(x=>x.id===drawer)} onClose={()=>setDrawer(null)} onUpdate={(patch)=>{
          setTickets(ts=>ts.map(t=> t.id===drawer? { ...t, ...patch, updated: new Date().toISOString().slice(0,16).replace('T',' ') }: t));
        }} />
      )}

      {/* Compose */}
      {composeOpen && (
        <ComposeModal onClose={()=>setComposeOpen(false)} onCreate={createTicket} />
      )}
    </div>
    
    </Layout>
  );
}

function TicketDrawer({ ticket, onClose, onUpdate }) {
  const [reply, setReply] = useState("");
  const [nextStatus, setNextStatus] = useState(ticket.status);
  const [nextAssignee, setNextAssignee] = useState(ticket.assignee);

  function save() {
    onUpdate({ status: nextStatus, assignee: nextAssignee });
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Ticket {ticket.id}</h2>
          <button onClick={onClose} className="text-gray-500 text-2xl">&times;</button>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <Info label="Subject" value={ticket.subject} />
          <Info label="Member" value={ticket.member} />
          <Info label="Club" value={ticket.club} />
          <Info label="Priority" value={ticket.priority} />
          <Info label="Category" value={ticket.category} />
          <Info label="Created" value={ticket.created} />
          <Info label="Updated" value={ticket.updated} />
          <Info label="Replies" value={ticket.replies} />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Status</label>
          <select value={nextStatus} onChange={e=>setNextStatus(e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2">
            <option>Open</option><option>Pending</option><option>Resolved</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Assignee</label>
          <input value={nextAssignee} onChange={e=>setNextAssignee(e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Add Reply</label>
          <textarea value={reply} onChange={e=>setReply(e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2" rows="3" />
        </div>
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
          <button onClick={save} className="px-4 py-2 bg-blue-500 text-white rounded">Save</button>
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="rounded-xl border border-gray-300 bg-gray-50 p-3">
      <div className="text-xs text-gray-600">{label}</div>
      <div className="text-sm font-semibold">{value}</div>
    </div>
  );
}

function ComposeModal({ onClose, onCreate }) {
  const [subject, setSubject] = useState("");
  const [member, setMember] = useState("");
  const [club, setClub] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [category, setCategory] = useState("App");
  const [assignee, setAssignee] = useState("");

  function submit() {
    if (!subject.trim()) return alert("Add a subject");
    onCreate({ subject, member, club, priority, category, assignee });
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4">
      <div className="w-full max-w-2xl rounded-2xl border border-gray-300 bg-white p-5">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Create ticket</h3>
          <button onClick={onClose} className="rounded-lg bg-gray-200 px-3 py-1 text-xs">Close</button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <input value={subject} onChange={e=>setSubject(e.target.value)} placeholder="Subject" className="col-span-2 rounded-xl bg-gray-100 border border-gray-300 px-3 py-2 text-sm focus:outline-none" />
          <input value={member} onChange={e=>setMember(e.target.value)} placeholder="Member name" className="rounded-xl bg-gray-100 border border-gray-300 px-3 py-2 text-sm focus:outline-none" />
          <input value={club} onChange={e=>setClub(e.target.value)} placeholder="Club or location" className="rounded-xl bg-gray-100 border border-gray-300 px-3 py-2 text-sm focus:outline-none" />
          <select value={priority} onChange={e=>setPriority(e.target.value)} className="rounded-xl bg-gray-100 border border-gray-300 px-3 py-2 text-sm focus:outline-none"><option>Urgent</option><option>High</option><option>Medium</option><option>Low</option></select>
          <select value={category} onChange={e=>setCategory(e.target.value)} className="rounded-xl bg-gray-100 border border-gray-300 px-3 py-2 text-sm focus:outline-none"><option>Billing</option><option>App</option><option>Facilities</option><option>Training</option></select>
          <input value={assignee} onChange={e=>setAssignee(e.target.value)} placeholder="Assign to" className="rounded-xl bg-gray-100 border border-gray-300 px-3 py-2 text-sm focus:outline-none" />
        </div>
        <div className="mt-4 flex items-center justify-end gap-2">
          <button onClick={onClose} className="rounded-xl bg-gray-200 px-4 py-2 text-sm">Cancel</button>
          <button onClick={submit} className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30">Create</button>
        </div>
      </div>
    </div>
  );
}
