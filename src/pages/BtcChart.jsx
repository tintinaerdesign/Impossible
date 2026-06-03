import React, { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function BtcChart({ currentPrice, usdtoThb }) {
  const [chartData, setChartData] = useState([]);

  // สร้างข้อมูลเริ่มต้นสำหรับการจำลองกราฟ 24 ชั่วโมง (1D) ให้ดูสวยงาม
  useEffect(() => {
    const basePrice = currentPrice || 65000; // ใช้ราคาปัจจุบันหรือค่าเริ่มต้น
    const initialData = [];
    const now = new Date();

    for (let i = 16; i >= 0; i--) {
      const time = new Date(now.getTime() - i * 60000);
      // สร้างความผันผวนของราคาเล็กน้อยแบบสมจริงเพื่อให้กราฟมีมิติย้อนหลัง
      const randomChange = (Math.random() - 0.48) * (basePrice * 0.001); // เปลี่ยนแปลงได้สูงสุด ±2% ของราคา
      const generatedPrice = (basePrice + randomChange) * usdtoThb;

      initialData.push({
        time: time.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        price: generatedPrice,
      });
    }
    setChartData(initialData);
  }, [currentPrice, usdtoThb]);

  // ระบบดึงข้อมูล/อัปเดตราคาแบบ Realtime ทุกๆ 3 วินาที
  useEffect(() => {
    if (!currentPrice) return;

    const interval = setInterval(() => {
      setChartData((prevData) => {
        const nextData = [...prevData];
        // ลบข้อมูลตัวเก่าสุดออกเพื่อไม่ให้กราฟล้นโครงสร้าง
        if (nextData.length > 80) nextData.shift();

        const now = new Date();
        // เพิ่มความสมจริงด้วยแรงเหวี่ยงราคาแบบเรียลไทม์ยึดจากราคา API ปัจจุบัน
        const livePrice =
          (currentPrice + (Math.random() - 0.5) * (currentPrice * 0.0005)) *
          usdtoThb;

        return [
          ...nextData,
          {
            time: now.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            price: livePrice,
          },
        ];
      });
    }, 3000); // อัปเดตทุกๆ 3 วินาที

    return () => clearInterval(interval);
  }, [currentPrice, usdtoThb]);

  // การตั้งค่าสไตล์ Tooltip ให้เรียบหรูสไตล์ฟินเทคพรีเมียม
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-zinc-950/90 border border-zinc-800 backdrop-blur-md px-3 py-2 rounded-xl shadow-xl shadow-black/50">
          <p className="text-[10px] text-zinc-500 font-[Orbitron]">
            {payload[0].payload.time}
          </p>
          <p className="text-xs font-bold text-pink-500 font-[Orbitron] mt-0.5">
            ฿
            {payload[0].value.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-full min-h-[260px] relative">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          margin={{ top: 15, right: 5, left: 5, bottom: 0 }}
        >
          <defs>
            {/* พื้นที่สร้างเอฟเฟกต์การไล่เฉดสีชมพูสะท้อนแสง Neon Glow */}
            <linearGradient id="pinkGlow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ec4899" stopOpacity={0.25} />
              <stop offset="100%" stopColor="#ec4899" stopOpacity={0.0} />
            </linearGradient>
          </defs>

          {/* แกน X และ Y ซ่อนเส้นแกนทั้งหมดและเลือกแสดงเฉพาะข้อความฟอนต์มินิมอลเพื่อความสะอาดสายตา */}
          <XAxis
            dataKey="time"
            tickLine={false}
            axisLine={false}
            stroke="#52525b"
            style={{ fontSize: "9px", fontFamily: "Orbitron" }}
            dy={10}
            interval={Math.floor(chartData.length / 5)}
          />
          <YAxis
            domain={["dataMin - 500", "dataMax + 500"]}
            hide={true} // ซ่อนราคาด้านข้างเพื่อความลื่นไหลระดับโปรโมเดิร์นแบบ Dashboard ระดับสากล
          />

          <Tooltip
            content={<CustomTooltip />}
            cursor={{ stroke: "#27272a", strokeWidth: 1 }}
          />

          {/* ตัวเส้นกราฟหลักสีชมพูสะท้อนแสงพร้อมเอฟเฟกต์เติมพื้นที่ใต้กราฟ */}
          <Area
            type="monotone"
            dataKey="price"
            stroke="#ec4899"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#pinkGlow)"
            isAnimationActive={false} // ปิดแอนิเมชันเริ่มต้นเพื่อให้กราฟ Realtime ขยับได้ลื่นไหลไม่สะดุดกระตุกตา
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
