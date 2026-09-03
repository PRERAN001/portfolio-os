// GithubGraph.jsx — light mode support
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

function calcLevel(count) {
  if (count === 0) return 0;
  if (count <= 3) return 1;
  if (count <= 6) return 2;
  if (count <= 9) return 3;
  return 4;
}

// GitHub's official light mode green palette
const PALETTE = ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"];

export function GithubGraph({ account = "PRERAN001", className = "" }) {
  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Generate mock data for the last 6 months (approx 26 weeks)
    const mockData = [];
    const today = new Date();
    for (let i = 180; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const count = Math.floor(Math.random() * 12);
      mockData.push({
        date: date.toISOString().split("T")[0],
        count,
        level: calcLevel(count),
      });
    }
    setContributions(mockData);
    setLoading(false);
  }, []);

  if (loading) return <div className="text-sm text-zinc-400">loading contributions...</div>;

  // Group into weeks
  const weeks = [];
  let currentWeek = [];
  contributions.forEach((c) => {
    currentWeek.push(c);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });
  if (currentWeek.length) weeks.push(currentWeek);

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <div className="flex gap-1.5 overflow-x-auto pb-2">
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-1.5">
            {week.map((day, di) => (
              <motion.div
                key={di}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: wi * 0.005 + di * 0.002 }}
                style={{
                  width: 11,
                  height: 11,
                  borderRadius: 2,
                  backgroundColor: PALETTE[day.level],
                }}
                className="hover:ring-2 hover:ring-zinc-400 transition-all cursor-pointer"
                title={`${day.date}: ${day.count} contributions`}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-end gap-1.5 text-[11px] text-zinc-400 font-mono">
        <span>Less</span>
        {PALETTE.map((color, i) => (
          <div key={i} style={{ width: 11, height: 11, borderRadius: 2, backgroundColor: color }} />
        ))}
        <span>More</span>
      </div>
    </div>
  );
}
