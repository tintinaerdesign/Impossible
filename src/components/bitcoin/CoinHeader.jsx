import { useState, useEffect } from "react";

export default function CoinHeader({ bitcoin }) {
  if (!bitcoin) return null;

  return (
    <header className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
      {/* ซ้าย */}
      <div className="flex items-center gap-4 xl:col-span-1">
        <img
          src={bitcoin.image}
          className="w-10 h-10 object-contain"
          alt={bitcoin.name}
        />

        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold font-[Orbitron]">
              {bitcoin.name}
            </h1>

            <span className="text-xs bg-zinc-900 text-zinc-500 px-2 py-0.5 rounded font-[Orbitron]">
              {bitcoin.symbol.toUpperCase()}
            </span>
          </div>

          <div className="flex items-baseline gap-3 mt-1">
            <span className="text-3xl md:text-4xl text-pink-500 tracking-tight font-sans">
              $
              {bitcoin.current_price.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>

            <span
              className={`text-xs font-bold ${
                bitcoin.price_change_percentage_24h >= 0
                  ? "text-emerald-400"
                  : "text-red-400"
              }`}
            >
              {bitcoin.price_change_percentage_24h >= 0 ? "▲" : "▼"}{" "}
              {bitcoin.price_change_percentage_24h.toFixed(2)}% (24h)
            </span>
          </div>
        </div>
      </div>

      {/* ขวา */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-zinc-950/40 p-4 rounded-2xl border border-zinc-900/60 backdrop-blur-sm xl:col-span-2 w-full">
        <div>
          <p className="text-[10px] text-zinc-500 uppercase font-[Orbitron]">
            Market Cap
          </p>
          <p className="text-xs font-bold mt-1 text-zinc-300 font-[Orbitron]">
            ${(bitcoin.market_cap / 1e12).toFixed(2)}T
          </p>
        </div>

        <div>
          <p className="text-[10px] text-zinc-500 uppercase font-[Orbitron]">
            24h High
          </p>

          <p className="text-xs font-bold mt-1 text-zinc-300 font-[Orbitron]">
            $
            {bitcoin.high_24h.toLocaleString(undefined, {
              maximumFractionDigits: 0,
            })}
          </p>
        </div>

        <div>
          <p className="text-[10px] text-zinc-500 uppercase font-[Orbitron]">
            24h Low
          </p>

          <p className="text-xs font-bold mt-1 text-zinc-300 font-[Orbitron]">
            $
            {bitcoin.low_24h.toLocaleString(undefined, {
              maximumFractionDigits: 0,
            })}
          </p>
        </div>

        <div>
          <p className="text-[10px] text-zinc-500 uppercase font-[Orbitron]">
            24h Volume
          </p>

          <p className="text-xs font-bold mt-1 text-zinc-300 font-[Orbitron]">
            ${(bitcoin.total_volume / 1e12).toFixed(2)}T
          </p>
        </div>
      </div>
    </header>
  );
}
