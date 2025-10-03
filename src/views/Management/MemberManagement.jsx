import React, { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar, ChevronDown, Filter, Mail, MoreHorizontal, Phone, Plus, Search, UserPlus, Users, Weight, Zap } from "lucide-react";
import Layout from "../../components/Layout";

const ACCENT = "#0f2a60ff";

export default function MemberManagement() {
  const [q, setQ] = useState("");
  const [plan, setPlan] = useState<string>("all");
  const [status, setStatus] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("due");
  const [selected, setSelected] = useState([]);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [focusMember, setFocusMember] = useState<Member | null>(null);

  const members = useMemo(() => MOCK_MEMBERS, []);

  const filtered = useMemo(() => {
    let list = members.filter(m =>
      (status === "all" || m.status === status) &&
      (plan === "all" || m.plan === plan) &&
      (m.name.toLowerCase().includes(q.toLowerCase()) || m.email.toLowerCase().includes(q.toLowerCase()))
    );
    switch (sortBy) {
      case "join":
        list.sort((a,b) => new Date(a.joined).getTime() - new Date(b.joined).getTime());
        break;
      case "checkin":
        list.sort((a,b) => new Date(b.lastCheckin).getTime() - new Date(a.lastCheckin).getTime());
        break;
      default:
        list.sort((a,b) => new Date(a.nextDue).getTime() - new Date(b.nextDue).getTime());
    }
    return list;
  }, [members, q, plan, status, sortBy]);

  const toggleSelect = (id) =>
    setSelected(sel => sel.includes(id) ? sel.filter(x => x !== id) : [...sel, id]);

  const allSelected = filtered.length > 0 && selected.length === filtered.length;
  const toggleAll = () => setSelected(allSelected ? [] : filtered.map(m => m.id));

  return (
   <Layout>
     <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <header className="sticky top-0 z-30 backdrop-blur border-b supports-[backdrop-filter]:bg-background/75">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Users style={{ color: ACCENT }} />
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Members</h1>
            <Badge variant="secondary" className="ml-2">Management</Badge>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <Button className="font-bold" style={{ backgroundColor: ACCENT }}>
                  <UserPlus className="mr-2 h-4 w-4"/> New Member
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Add Member</SheetTitle>
                  <SheetDescription>Quick add for front desk</SheetDescription>
                </SheetHeader>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <Label>Name</Label>
                    <Input placeholder="Full name" />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input type="email" placeholder="email@domain.com" />
                  </div>
                  <div>
                    <Label>Phone</Label>
                    <Input placeholder="+91 90000 00000" />
                  </div>
                  <div>
                    <Label>Plan</Label>
                    <Select defaultValue="Monthly">
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Monthly">Monthly</SelectItem>
                        <SelectItem value="Quarterly">Quarterly</SelectItem>
                        <SelectItem value="Annual">Annual</SelectItem>
                        <SelectItem value="PT">PT</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="sm:col-span-2">
                    <Label>Notes</Label>
                    <Textarea placeholder="Injuries, goals, preferences" />
                  </div>
                  <div className="flex items-center gap-2 sm:col-span-2">
                    <Switch id="welcome" />
                    <Label htmlFor="welcome">Send welcome email</Label>
                  </div>
                  <div className="sm:col-span-2 flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setSheetOpen(false)}>Cancel</Button>
                    <Button className="font-bold" style={{ backgroundColor: ACCENT }}>Save</Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        {/* KPIs */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Active" value="742" delta="+18" hint="vs last week" />
          <StatCard label="Frozen" value="39" delta="-6" hint="active freezes" />
          <StatCard label="Due this week" value="112" delta="+9" hint="renewals" />
          <StatCard label="Attendance avg" value="74%" hint="30 days" />
        </section>

        {/* Toolbar */}
        <section className="mt-6 flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="flex-1 flex items-center gap-2">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input value={q} onChange={e => setQ(e.target.value)} className="pl-9" placeholder="Search by name or email" />
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <Filter className="h-4 w-4 opacity-70" />
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="w-[150px]"><SelectValue placeholder="Status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Paused">Paused</SelectItem>
                  <SelectItem value="Expired">Expired</SelectItem>
                </SelectContent>
              </Select>
              <Select value={plan} onValueChange={setPlan}>
                <SelectTrigger className="w-[150px]"><SelectValue placeholder="Plan" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All plans</SelectItem>
                  <SelectItem value="Monthly">Monthly</SelectItem>
                  <SelectItem value="Quarterly">Quarterly</SelectItem>
                  <SelectItem value="Annual">Annual</SelectItem>
                  <SelectItem value="PT">PT</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[160px]"><SelectValue placeholder="Sort by" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="due">Next due</SelectItem>
                  <SelectItem value="checkin">Last check in</SelectItem>
                  <SelectItem value="join">Join date</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center gap-2 justify-between lg:justify-end">
            <Button variant="outline">Export CSV</Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-1">Bulk actions <ChevronDown className="h-4 w-4"/></Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Apply to selected</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Send renewal reminder</DropdownMenuItem>
                <DropdownMenuItem>Freeze membership</DropdownMenuItem>
                <DropdownMenuItem>Mark as paid</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </section>

        {/* Table */}
        <section className="mt-4 bg-background/60 backdrop-blur rounded-2xl border">
          <Table>
            <TableCaption>10 most recent members. Use search and filters for more.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-8"><Checkbox checked={allSelected} onCheckedChange={toggleAll} /></TableHead>
                <TableHead>Member</TableHead>
                <TableHead className="hidden sm:table-cell">Plan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden lg:table-cell">Attendance</TableHead>
                <TableHead className="hidden sm:table-cell">Last check in</TableHead>
                <TableHead>Next due</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.slice(0, 10).map(m => (
                <TableRow key={m.id} className="hover:bg-muted/40">
                  <TableCell><Checkbox checked={selected.includes(m.id)} onCheckedChange={() => toggleSelect(m.id)} /></TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9 border">
                        <AvatarImage src={m.avatar} alt={m.name} />
                        <AvatarFallback>{initials(m.name)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-bold leading-tight">{m.name}</div>
                        <div className="text-xs text-muted-foreground">{m.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">{m.plan}</TableCell>
                  <TableCell>
                    <StatusBadge status={m.status} />
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <div className="flex items-center gap-3">
                      <Progress value={m.attendance} className="h-2 w-36" />
                      <span className="text-xs text-muted-foreground">{m.attendance}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">{fmt(m.lastCheckin)}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-semibold">{fmt(m.nextDue)}</span>
                      <span className="text-xs text-muted-foreground">₹{m.due.toLocaleString("en-IN")}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="ghost"><MoreHorizontal className="h-4 w-4"/></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setFocusMember(m)}>View profile</DropdownMenuItem>
                        <DropdownMenuItem>Mark paid</DropdownMenuItem>
                        <DropdownMenuItem>Freeze</DropdownMenuItem>
                        <DropdownMenuItem>Send reminder</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>

        {/* Member quick profile drawer */}
        <Dialog open={!!focusMember} onOpenChange={(v) => !v && setFocusMember(null)}>
          <DialogContent className="sm:max-w-[740px]">
            <DialogHeader>
              <DialogTitle>Member profile</DialogTitle>
            </DialogHeader>
            {focusMember && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-1 space-y-4">
                  <Card className="border-0 shadow-sm">
                    <CardContent className="p-4 flex items-center gap-3">
                      <Avatar className="h-14 w-14 border">
                        <AvatarImage src={focusMember.avatar} />
                        <AvatarFallback>{initials(focusMember.name)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-extrabold text-lg leading-tight">{focusMember.name}</div>
                        <div className="text-xs text-muted-foreground">{focusMember.email}</div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2"><CardTitle className="text-sm">Contact</CardTitle></CardHeader>
                    <CardContent className="p-4 space-y-2 text-sm">
                      <div className="flex items-center gap-2"><Phone className="h-4 w-4"/> {focusMember.phone}</div>
                      <div className="flex items-center gap-2"><Mail className="h-4 w-4"/> {focusMember.email}</div>
                      <div className="flex items-center gap-2"><Calendar className="h-4 w-4"/> Joined {fmt(focusMember.joined)}</div>
                    </CardContent>
                  </Card>
                </div>
                <div className="md:col-span-2 space-y-4">
                  <Tabs defaultValue="plan">
                    <TabsList>
                      <TabsTrigger value="plan">Plan</TabsTrigger>
                      <TabsTrigger value="attendance">Attendance</TabsTrigger>
                      <TabsTrigger value="notes">Notes</TabsTrigger>
                    </TabsList>
                    <TabsContent value="plan" className="mt-3">
                      <Card>
                        <CardHeader className="pb-2"><CardTitle className="text-sm">Plan details</CardTitle></CardHeader>
                        <CardContent className="p-4 space-y-3 text-sm">
                          <div className="flex gap-2"><span className="w-32 text-muted-foreground">Plan</span><span className="font-semibold">{focusMember.plan}</span></div>
                          <div className="flex gap-2"><span className="w-32 text-muted-foreground">Status</span><StatusBadge status={focusMember.status} /></div>
                          <div className="flex gap-2"><span className="w-32 text-muted-foreground">Next due</span><span className="font-semibold">{fmt(focusMember.nextDue)}</span></div>
                          <div className="flex gap-2"><span className="w-32 text-muted-foreground">Amount due</span><span className="font-semibold">₹{focusMember.due.toLocaleString("en-IN")}</span></div>
                          <div className="pt-2 flex gap-2">
                            <Button size="sm" className="font-bold" style={{ backgroundColor: ACCENT }}>Mark paid</Button>
                            <Button size="sm" variant="outline">Freeze</Button>
                            <Button size="sm" variant="outline">Send reminder</Button>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                    <TabsContent value="attendance" className="mt-3">
                      <Card>
                        <CardHeader className="pb-2"><CardTitle className="text-sm">30 day attendance</CardTitle></CardHeader>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <Progress value={focusMember.attendance} className="h-2 w-full" />
                            <span className="text-xs text-muted-foreground">{focusMember.attendance}%</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-2">Last check in {fmt(focusMember.lastCheckin)}</p>
                        </CardContent>
                      </Card>
                    </TabsContent>
                    <TabsContent value="notes" className="mt-3">
                      <Card>
                        <CardHeader className="pb-2"><CardTitle className="text-sm">Coach notes</CardTitle></CardHeader>
                        <CardContent className="p-4 space-y-3 text-sm">
                          <p>{focusMember.notes || "No notes yet"}</p>
                          <Textarea placeholder="Add a note for coaches" />
                          <div className="flex justify-end"><Button size="sm">Save note</Button></div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </main>
    </div>
   </Layout>
  );
}

function StatCard({ label, value, delta, hint }) {
  return (
    <Card className="relative overflow-hidden border-0 shadow-sm bg-gradient-to-b from-background/90 to-background">
      <CardHeader className="pb-2">
        <CardTitle className="text-xs uppercase tracking-wider text-muted-foreground">{label}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="text-3xl font-extrabold tracking-tight">{value}</div>
        <div className="text-xs text-muted-foreground mt-1">{hint}</div>
        {delta && (
          <Badge className="mt-3" style={{ backgroundColor: ACCENT }}>{delta}</Badge>
        )}
        <div className="pointer-events-none absolute inset-0 rounded-2xl p-[1.5px]">
          <div className="h-full w-full rounded-2xl [background:conic-gradient(from_var(--a),#2cab52,transparent_30%,#a7f3d0_60%,transparent_75%,#2cab52)] animate-spin-slow" />
        </div>
      </CardContent>
    </Card>
  );
}

function StatusBadge({ status }) {
  const map = {
    Active: { label: "Active", bg: "bg-emerald-100", text: "text-emerald-700" },
    Paused: { label: "Paused", bg: "bg-amber-100", text: "text-amber-700" },
    Expired: { label: "Expired", bg: "bg-rose-100", text: "text-rose-700" },
  };
  const m = map[status];
  return <span className={`px-2 py-1 rounded-full text-xs font-semibold ${m.bg} ${m.text}`}>{m.label}</span>;
}

function initials(n) {
  return n.split(" ").slice(0, 2).map(p => p[0]).join("").toUpperCase();
}

function fmt(d) {
  return new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

// Slow spin for gradient borders
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.innerHTML = `.animate-spin-slow{animation:spin 6s linear infinite}@keyframes spin{to{--a:360deg}}`;
  document.head.appendChild(style);
}

// Mock data
/**
 * @typedef {Object} Member
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {string} phone
 * @property {string} [avatar]
 * @property {"Monthly"|"Quarterly"|"Annual"|"PT"} plan
 * @property {"Active"|"Paused"|"Expired"} status
 * @property {string} joined
 * @property {string} lastCheckin
 * @property {string} nextDue
 * @property {number} attendance
 * @property {number} due
 * @property {string} [notes]
 */

const MOCK_MEMBERS = [
  { id: "m1", name: "Aarav Mehta", email: "aarav@example.com", phone: "+91 98980 11111", plan: "Monthly", status: "Active", joined: "2025-05-03", lastCheckin: "2025-10-02", nextDue: "2025-10-07", attendance: 82, due: 1499, avatar: "https://i.pravatar.cc/80?img=1", notes: "Prefers evening sessions" },
  { id: "m2", name: "Isha Verma", email: "isha@example.com", phone: "+91 98980 22222", plan: "Annual", status: "Active", joined: "2025-01-12", lastCheckin: "2025-10-01", nextDue: "2026-01-12", attendance: 76, due: 0, avatar: "https://i.pravatar.cc/80?img=2" },
  { id: "m3", name: "Kabir Sharma", email: "kabir@example.com", phone: "+91 98980 33333", plan: "Quarterly", status: "Paused", joined: "2025-06-10", lastCheckin: "2025-09-20", nextDue: "2025-11-10", attendance: 40, due: 0, avatar: "https://i.pravatar.cc/80?img=3", notes: "Recovering from ankle sprain" },
  { id: "m4", name: "Zara Khan", email: "zara@example.com", phone: "+91 98980 44444", plan: "PT", status: "Active", joined: "2025-07-01", lastCheckin: "2025-10-02", nextDue: "2025-10-15", attendance: 88, due: 3500, avatar: "https://i.pravatar.cc/80?img=4" },
  { id: "m5", name: "Rohan Gupta", email: "rohan@example.com", phone: "+91 98980 55555", plan: "Monthly", status: "Expired", joined: "2025-04-08", lastCheckin: "2025-09-05", nextDue: "2025-09-08", attendance: 22, due: 1499, avatar: "https://i.pravatar.cc/80?img=5" },
  { id: "m6", name: "Maya Iyer", email: "maya@example.com", phone: "+91 98980 66666", plan: "Annual", status: "Active", joined: "2024-12-02", lastCheckin: "2025-09-29", nextDue: "2025-12-02", attendance: 65, due: 0, avatar: "https://i.pravatar.cc/80?img=6" },
  { id: "m7", name: "Arjun Nair", email: "arjun@example.com", phone: "+91 98980 77777", plan: "Monthly", status: "Active", joined: "2025-08-14", lastCheckin: "2025-10-02", nextDue: "2025-10-14", attendance: 71, due: 1499, avatar: "https://i.pravatar.cc/80?img=7" },
  { id: "m8", name: "Saanvi Rao", email: "saanvi@example.com", phone: "+91 98980 88888", plan: "Quarterly", status: "Active", joined: "2025-03-22", lastCheckin: "2025-10-01", nextDue: "2025-12-22", attendance: 59, due: 0, avatar: "https://i.pravatar.cc/80?img=8" },
  { id: "m9", name: "Dev Patel", email: "dev@example.com", phone: "+91 98980 99999", plan: "PT", status: "Paused", joined: "2025-07-18", lastCheckin: "2025-09-30", nextDue: "2025-10-18", attendance: 34, due: 1200, avatar: "https://i.pravatar.cc/80?img=9" },
  { id: "m10", name: "Anaya Singh", email: "anaya@example.com", phone: "+91 98980 11112", plan: "Monthly", status: "Active", joined: "2025-09-01", lastCheckin: "2025-10-02", nextDue: "2025-10-08", attendance: 79, due: 1499, avatar: "https://i.pravatar.cc/80?img=10" },
  { id: "m11", name: "Vivaan Joshi", email: "vivaan@example.com", phone: "+91 98980 13131", plan: "Annual", status: "Active", joined: "2025-02-10", lastCheckin: "2025-10-01", nextDue: "2026-02-10", attendance: 73, due: 0, avatar: "https://i.pravatar.cc/80?img=11" },
  { id: "m12", name: "Kiara Bhat", email: "kiara@example.com", phone: "+91 98980 12121", plan: "Quarterly", status: "Expired", joined: "2025-05-05", lastCheckin: "2025-09-02", nextDue: "2025-09-05", attendance: 28, due: 2499, avatar: "https://i.pravatar.cc/80?img=12" }
];
