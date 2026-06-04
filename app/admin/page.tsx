"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const STAGE_LABELS: Record<string, string> = {
  NEW: "New",
  IN_PROGRESS: "In Progress",
  SENT: "Sent",
  BOOKED: "Booked",
  ARCHIVED: "Archived",
};

const STAGE_COLORS: Record<string, string> = {
  NEW: "bg-green-50 text-green-700 border-green-200",
  IN_PROGRESS: "bg-blue-50 text-blue-700 border-blue-200",
  SENT: "bg-orange-50 text-orange-700 border-orange-200",
  BOOKED: "bg-emerald-50 text-emerald-700 border-emerald-200",
  ARCHIVED: "bg-gray-100 text-gray-500 border-gray-200",
};

const ACTIVITY_COLORS: Record<string, string> = {
  inquiry: "bg-green-500",
  proposal: "bg-blue-500",
  sent: "bg-orange-500",
  booked: "bg-emerald-600",
  archived: "bg-gray-400",
};

function formatDate(dateStr: string) {
  try {
    return new Date(dateStr).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  } catch { return dateStr; }
}

function formatEuro(value: number) {
  if (!value) return "—";
  return `€${Math.round(value).toLocaleString()}`;
}

export default function AdminReportsPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/reports")
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border py-6 px-6">
        <div className="container mx-auto flex items-center justify-between max-w-5xl">
          <div>
            <h1 className="font-serif text-3xl">Reports</h1>
            {data && (
              <p className="text-sm text-muted-foreground mt-1">
                {data.totalQuotes} total inquiries
              </p>
            )}
          </div>
          <div className="flex gap-4">
            <Link href="/admin/quotes" className="text-xs uppercase tracking-wide border border-border px-4 py-2 hover:border-foreground transition-colors">
              All Quotes
            </Link>
            <Link href="/admin" className="text-xs uppercase tracking-wide border border-border px-4 py-2 hover:border-foreground transition-colors">
              Dashboard
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12 max-w-5xl">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-foreground/20 border-t-foreground rounded-full animate-spin" />
          </div>
        ) : !data?.success ? (
          <p className="text-muted-foreground text-center py-20">Failed to load report data.</p>
        ) : (
          <div className="space-y-12">

            {/* ── Metric cards ── */}
            <section>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="border border-border p-6">
                  <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground mb-2">Active Pipeline</p>
                  <p className="font-serif text-2xl">{formatEuro(data.activeValue)}</p>
                  <p className="text-xs text-muted-foreground mt-1">In Progress + Sent</p>
                </div>
                <div className="border border-border p-6">
                  <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground mb-2">Booked</p>
                  <p className="font-serif text-2xl">{formatEuro(data.bookedValue)}</p>
                  <p className="text-xs text-muted-foreground mt-1">{data.pipeline?.BOOKED?.count || 0} client{data.pipeline?.BOOKED?.count !== 1 ? "s" : ""}</p>
                </div>
                <div className="border border-border p-6">
                  <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground mb-2">Avg Response</p>
                  <p className="font-serif text-2xl">
                    {data.avgResponseDays !== null ? `${data.avgResponseDays}d` : "—"}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Inquiry → proposal</p>
                </div>
                <div className="border border-border p-6">
                  <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground mb-2">Sent → Booked</p>
                  <p className="font-serif text-2xl">
                    {data.pipeline?.SENT?.count > 0
                      ? `${Math.round((data.pipeline.BOOKED?.count || 0) / (data.pipeline.SENT.count + (data.pipeline.BOOKED?.count || 0)) * 100)}%`
                      : "—"}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Conversion rate</p>
                </div>
              </div>
            </section>

            {/* ── Pipeline ── */}
            <section>
              <h2 className="font-serif text-xl mb-6">Pipeline</h2>
              <div className="border border-border divide-y divide-border">
                {["NEW", "IN_PROGRESS", "SENT", "BOOKED", "ARCHIVED"].map(stage => {
                  const s = data.pipeline?.[stage] || { count: 0, value: 0 };
                  const maxCount = Math.max(...Object.values(data.pipeline || {}).map((v: any) => v.count), 1);
                  return (
                    <div key={stage} className="flex items-center gap-6 px-6 py-4">
                      <span className={`text-xs px-2 py-1 border rounded w-28 text-center flex-shrink-0 ${STAGE_COLORS[stage]}`}>
                        {STAGE_LABELS[stage]}
                      </span>
                      <div className="flex-1 flex items-center gap-3">
                        <div className="flex-1 bg-muted rounded-full h-1.5">
                          <div
                            className="h-1.5 rounded-full bg-foreground/40 transition-all"
                            style={{ width: `${(s.count / maxCount) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium w-4 text-right flex-shrink-0">{s.count}</span>
                      </div>
                      <span className="text-sm text-muted-foreground w-24 text-right flex-shrink-0">
                        {s.value > 0 ? formatEuro(s.value) : "—"}
                      </span>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* ── Journey popularity + Activity log ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

              {/* Journey popularity */}
              <section>
                <h2 className="font-serif text-xl mb-6">Most Requested Journeys</h2>
                <div className="border border-border divide-y divide-border">
                  {data.journeys?.length === 0 && (
                    <p className="px-6 py-4 text-sm text-muted-foreground">No data yet.</p>
                  )}
                  {data.journeys?.map((j: any, i: number) => {
                    const maxCount = data.journeys[0]?.count || 1;
                    return (
                      <div key={i} className="flex items-center gap-4 px-6 py-3">
                        <span className="text-xs text-muted-foreground w-4 flex-shrink-0">{i + 1}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm truncate">{j.name}</p>
                          <div className="h-1 bg-muted rounded-full mt-1.5">
                            <div
                              className="h-1 rounded-full bg-foreground/30"
                              style={{ width: `${(j.count / maxCount) * 100}%` }}
                            />
                          </div>
                        </div>
                        <span className="text-sm font-medium flex-shrink-0">{j.count}</span>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Activity log */}
              <section>
                <h2 className="font-serif text-xl mb-6">Activity — Last 30 Days</h2>
                <div className="border border-border divide-y divide-border">
                  {data.activity?.length === 0 && (
                    <p className="px-6 py-4 text-sm text-muted-foreground">No activity in the last 30 days.</p>
                  )}
                  {data.activity?.map((a: any, i: number) => (
                    <div key={i} className="flex items-center gap-4 px-6 py-3">
                      <div className={`w-2 h-2 rounded-full flex-shrink-0 ${ACTIVITY_COLORS[a.type] || "bg-gray-400"}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm truncate">{a.label}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{formatDate(a.date)}</p>
                      </div>
                      {a.clientId && (
                        <Link
                          href={`/admin/quotes/${a.clientId}`}
                          className="text-xs text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
                        >
                          →
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            </div>

          </div>
        )}
      </main>
    </div>
  );
}
