import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function BtcChart({ timeframe, setRsiData }) {
  const [chartData, setChartData] = useState([]);

  // timeframe map
  const daysMap = {
    "1D": 1,
    "1W": 7,
    "1M": 30,
    "3M": 90,
    "1Y": 365,
  };

  useEffect(() => {
    const fetchChart = async () => {
      try {
        const days = daysMap[timeframe] || 7;

        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=${days}`,
        );

        const data = await response.json();

        const sampledPrices = data.prices.filter((_, index) => {
          return index % 4 === 0;
        });

        const formatted = sampledPrices.map((item) => ({
          date: new Date(item[0]).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          }),
          price: item[1],
          priceGlow: item[1],
        }));

        setChartData(formatted);

        // mock RSI simple version
        const fakeRsi = formatted.map((d) => ({
          value: Math.random() * 40 + 30,
        }));

        setRsiData(fakeRsi);
      } catch (error) {
        console.error("Chart fetch error:", error);
      }
    };

    fetchChart();
  }, [timeframe, setRsiData]);

  return (
    <div className="w-full h-full rounded-2xl overflow-hidden">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          margin={{
            top: 20,
            right: 10,
            left: 0,
            bottom: 0,
          }}
        >
          {/* gradient */}
          <defs>
            <linearGradient id="pinkGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ec4899" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#ec4899" stopOpacity={0} />
            </linearGradient>

            {/* glow */}
            <filter id="glow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <XAxis
            dataKey="date"
            minTickGap={80}
            tick={{
              fill: "#71717a",
              fontSize: 10,
            }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis hide domain={["dataMin - 300", "dataMax + 300"]} />

          <Tooltip
            filterNull={true}
            contentStyle={{
              backgroundColor: "#09090b",
              border: "1px solid #27272a",
              borderRadius: "12px",
              color: "#fff",
            }}
            formatter={(value, name, props) => {
              if (props.dataKey !== "price") return null;

              return [
                `$${Number(value).toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}`,
                "BTC",
              ];
            }}
          />

          {/* glow line */}
          <Area
            type="monotone"
            dataKey="priceGlow"
            stroke="#ec4899"
            strokeWidth={6}
            fill="none"
            opacity={0.08}
            filter="url(#glow)"
          />

          {/* main line */}
          <Area
            type="monotone"
            dataKey="price"
            stroke="#ec4899"
            strokeWidth={3}
            fill="url(#pinkGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
