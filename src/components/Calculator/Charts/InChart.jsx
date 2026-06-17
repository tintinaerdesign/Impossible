import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

import { calculateInvestment } from "../../FirstPage/Utility/calculateInvestment";

export default function InChart({ monthlySaving, savingPeriod, btcGrowth }) {
  // Generate chart data
  const chartData = Array.from({ length: savingPeriod }, (_, index) => {
    const year = index + 1;

    const result = calculateInvestment({
      monthlySaving,
      savingPeriod: year,
      btcGrowth,
    });

    return {
      year: `Year ${year}`,

      invested: result.principal,

      future: result.fvResult,

      purchasingPower: result.adjustedPurchasingPower,
    };
  });

  return (
    <div className="h-[320px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          margin={{
            top: 20,
            right: 10,
            left: -10,
            bottom: 0,
          }}
        >
          {/* Gradients */}
          <defs>
            {/* Future Value */}
            <linearGradient id="futureGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F97316" stopOpacity={0.35} />

              <stop offset="100%" stopColor="#F97316" stopOpacity={0} />
            </linearGradient>

            {/* Purchasing Power */}
            <linearGradient id="powerGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#EC4899" stopOpacity={0.25} />

              <stop offset="100%" stopColor="#EC4899" stopOpacity={0} />
            </linearGradient>
          </defs>

          {/* Grid */}
          <CartesianGrid stroke="#27272a" vertical={false} />

          {/* X Axis */}
          <XAxis
            dataKey="year"
            stroke="#71717a"
            tick={{
              fill: "#71717a",
              fontSize: 14,
            }}
          />

          {/* Y Axis */}
          <YAxis
            stroke="#71717a"
            tick={{
              fill: "#71717a",
              fontSize: 14,
            }}
            tickFormatter={(value) => {
              if (value >= 1000) {
                return `$${(value / 1000).toFixed(0)}k`;
              }

              return `$${value}`;
            }}
          />

          {/* Tooltip */}
          <Tooltip
            formatter={(value) => [`$${Number(value).toLocaleString()}`]}
            contentStyle={{
              background: "#18181b",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 24,
              color: "white",
              boxShadow: "0 0 40px rgba(236,72,153,0.12)",
            }}
            labelStyle={{
              color: "#fff",
              fontWeight: 600,
            }}
          />

          {/* Legend */}
          <Legend
            wrapperStyle={{
              color: "#a1a1aa",
              paddingTop: 10,
            }}
          />

          {/* Invested */}
          <Area
            type="monotone"
            dataKey="invested"
            name="Total Invested"
            stroke="#6B7280"
            fill="transparent"
            strokeWidth={2}
          />

          {/* Purchasing Power */}
          <Area
            type="monotone"
            dataKey="purchasingPower"
            name="Purchasing Power"
            stroke="#EC4899"
            fill="url(#powerGradient)"
            strokeWidth={3}
            strokeDasharray="6 6"
          />

          {/* Future Value */}
          <Area
            type="monotone"
            dataKey="future"
            name="Future Value"
            stroke="#F97316"
            fill="url(#futureGradient)"
            strokeWidth={4}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
