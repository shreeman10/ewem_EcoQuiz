"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export function HistoryScoreChart({ data }: { data: Array<{ date: string; score: number }> }) {
  if (!data || data.length === 0) {
    return (
      <div className="flex h-48 items-center justify-center text-xs text-slate-500">
        Complete at least one quiz to view performance trends over time.
      </div>
    );
  }

  return (
    <div className="h-56 w-full pt-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="scoreColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="date"
            stroke="#64748b"
            fontSize={11}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            domain={[0, 100]}
            stroke="#64748b"
            fontSize={11}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#0f172a",
              borderColor: "rgba(255,255,255,0.1)",
              borderRadius: "0.75rem",
              color: "#fff",
              fontSize: "12px",
            }}
          />
          <Area
            type="monotone"
            dataKey="score"
            stroke="#10b981"
            strokeWidth={2.5}
            fillOpacity={1}
            fill="url(#scoreColor)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
