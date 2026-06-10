export default function CoinHeader({ coin }) {
  if (!coin) return null;

  const marketData = coin.market_data;

  return (
    <header className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
      {/* Left */}
      <div className="flex items-center gap-4 xl:col-span-1">
        <img
          src={coin.image.large}
          className="w-10 h-10 object-contain"
          alt={coin.name}
        />

        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold font-[Orbitron]">{coin.name}</h1>

            <span className="text-xs bg-zinc-900 text-zinc-500 px-2 py-0.5 rounded font-[Orbitron]">
              {coin.symbol.toUpperCase()}
            </span>
          </div>

          <div className="flex items-baseline gap-3 mt-1">
            <span className="text-3xl md:text-4xl text-pink-500 tracking-tight font-sans">
              $
              {marketData?.current_price?.usd?.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>

            <span
              className={`text-xs font-bold ${
                marketData?.price_change_percentage_24h >= 0
                  ? "text-emerald-400"
                  : "text-red-400"
              }`}
            >
              {marketData?.price_change_percentage_24h >= 0 ? "▲" : "▼"}{" "}
              {marketData?.price_change_percentage_24h?.toFixed(2)}% (24h)
            </span>
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-zinc-950/40 p-4 rounded-2xl border border-zinc-900/60 backdrop-blur-sm xl:col-span-2 w-full">
        <div>
          <p className="text-[10px] text-zinc-500 uppercase font-[Orbitron]">
            Market Cap
          </p>

          <p className="text-xs font-bold mt-1 text-zinc-300 font-[Orbitron]">
            ${(marketData?.market_cap?.usd / 1e12).toFixed(2)}T
          </p>
        </div>

        <div>
          <p className="text-[10px] text-zinc-500 uppercase font-[Orbitron]">
            24H High
          </p>

          <p className="text-xs font-bold mt-1 text-zinc-300 font-[Orbitron]">
            $
            {marketData?.high_24h?.usd?.toLocaleString(undefined, {
              maximumFractionDigits: 0,
            })}
          </p>
        </div>

        <div>
          <p className="text-[10px] text-zinc-500 uppercase font-[Orbitron]">
            24H Low
          </p>

          <p className="text-xs font-bold mt-1 text-zinc-300 font-[Orbitron]">
            $
            {marketData?.low_24h?.usd?.toLocaleString(undefined, {
              maximumFractionDigits: 0,
            })}
          </p>
        </div>

        <div>
          <p className="text-[10px] text-zinc-500 uppercase font-[Orbitron]">
            24H Volume
          </p>

          <p className="text-xs font-bold mt-1 text-zinc-300 font-[Orbitron]">
            ${(marketData?.total_volume?.usd / 1e12).toFixed(2)}T
          </p>
        </div>
      </div>
    </header>
  );
}
