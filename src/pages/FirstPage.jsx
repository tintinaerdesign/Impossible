import { Link } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";

// 1. คอมโพเนนต์สำหรับแสดงผล Hana Viewer 3D แบบค่อยๆ เฟดอินออกมา (Fade-in)
function Hero3D() {
  const viewerRef = useRef(null);
  const [isReady, setIsReady] = useState(false); // เพิ่ม state สำหรับควบคุมแอนิเมชันเฟดอิน

  useEffect(() => {
    // โหลดสคริปต์ของ Hana Viewer เข้ามาทำงานในระบบ
    const scriptId = "spline-hana-viewer-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.type = "module";
      script.src =
        "https://cdn.spline.design/@splinetool/hana-viewer@1.2.54/hana-viewer.js";
      document.body.appendChild(script);
    }

    // หน่วงเวลาครึ่งวินาที เพื่อให้ฉากหลังโปร่งใสเตรียมพร้อม จากนั้นสั่งเปิดไฟให้ตัวโมเดลค่อยๆ เฟดขึ้นมา
    const safetyTimer = setTimeout(() => {
      setIsReady(true);
    }, 100);

    return () => clearTimeout(safetyTimer); // เคลียร์ตัวนับเวลาคืนหน่วยความจำอย่างถูกต้อง
  }, []);

  return (
    <div
      // ใช้ Tailwind ควบคุมความโปร่งแสง (Opacity) ให้สลับจาก 0 เป็น 100 อย่างนุ่มนวลภายใน 1 วินาที (duration-1000)
      className={`relative w-full h-[400px] lg:h-[500px] rounded-3xl overflow-hidden bg-transparent transition-opacity duration-1000 ease-out ${
        isReady ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="absolute top-30 w-full h-full flex items-center justify-center">
        <hana-viewer
          ref={viewerRef}
          url="https://prod.spline.design/fQw9vEaPML4OLIUp-ibO/scene.hanacode"
          style={{
            width: "100%",
            height: "100%",
            display: "block",
            background: "transparent",
            transform: "scale(1.8)",
            transformOrigin: "center center",
          }}
        ></hana-viewer>
      </div>
    </div>
  );
}

export default function FirstPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-700 text-white font-[system-ui]">
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 flex flex-col space-y-6">
          <h1 className="font-['Orbitron'] text-4xl md:text-5xl lg:text-6xl font-black leading-[0.95] tracking-tight text-left">
            Navigate Purchasing power <br /> & Inflation with Clarity
          </h1>

          <p className="text-zinc-400 text-xl md:text-2xl max-w-[600px] leading-relaxed">
            Explore real-time market data, inflation insights, and financial
            tools designed to help you better understand digital assets and
            macro trends.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link
              to="/Calculator"
              className="px-8 py-4 rounded-2xl border border-white text-center text-xl bg-transparent text-white hover:text-black hover:bg-white transition duration-300"
            >
              Open Inflation Calculator
            </Link>
            <Link
              to="/coinlist"
              className="px-8 py-4 rounded-2xl text-center text-white text-xl bg-gradient-to-r from-orange-400 to-pink-500 hover:scale-105 transition duration-300 shadow-md"
            >
              Explore Coin Market
            </Link>
          </div>
        </div>

        {/* ฝั่งขวา: พื้นที่ 3D ให้มันค่อยๆ ออกมานิดๆ */}
        <div className="lg:col-span-5 w-full overflow-visible">
          <Hero3D />
        </div>
      </div>
    </div>
  );
}
