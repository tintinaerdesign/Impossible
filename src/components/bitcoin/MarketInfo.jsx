export default function MarketInfo({ coin }) {
  const marketData = coin?.market_data;

  const symbol = coin?.symbol?.toUpperCase();

  return (
    <div className="space-y-6">
      {/* Market Info */}
      <div className="bg-zinc-950/60 border border-zinc-900 rounded-3xl p-6 space-y-3.5">
        <h3 className="text-md font-bold text-zinc-400 font-sans tracking-wider uppercase mb-1">
          Market Info
        </h3>

        {[
          {
            name: "Market Cap",
            val: marketData?.market_cap?.usd
              ? `$${(marketData.market_cap.usd / 1e12).toFixed(2)}T`
              : "--",
          },

          {
            name: "Market Cap Rank",
            val: coin?.market_cap_rank ? `#${coin.market_cap_rank}` : "--",
            highlight: true,
          },

          {
            name: "Circulating Supply",
            val: marketData?.circulating_supply
              ? `${(marketData.circulating_supply / 1e6).toFixed(2)}M ${symbol}`
              : "--",
          },

          {
            name: "Total Supply",
            val: marketData?.total_supply
              ? `${(marketData.total_supply / 1e6).toFixed(2)}M ${symbol}`
              : "--",
          },

          {
            name: "Max Supply",
            val: marketData?.max_supply
              ? `${(marketData.max_supply / 1e6).toFixed(2)}M ${symbol}`
              : "--",
          },

          {
            name: "Market Dominance",
            val: "--",
          },

          {
            name: "All Time High",
            val: marketData?.ath?.usd
              ? `$${marketData.ath.usd.toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}`
              : "--",

            sub: marketData?.ath_date?.usd
              ? new Date(marketData.ath_date.usd).toLocaleDateString()
              : "--",
          },

          {
            name: "All Time Low",
            val: marketData?.atl?.usd
              ? `$${marketData.atl.usd.toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}`
              : "--",

            sub: marketData?.atl_date?.usd
              ? new Date(marketData.atl_date.usd).toLocaleDateString()
              : "--",
          },
        ].map((row, i) => (
          <div
            key={i}
            className="border-b border-zinc-900/60 pb-2 last:border-0 last:pb-0"
          >
            <div className="flex justify-between text-md">
              <span className="text-zinc-500 font-medium">{row.name}</span>

              <span
                className={`font-bold font-sans ${
                  row.highlight
                    ? "text-transparent bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text"
                    : "text-zinc-300"
                }`}
              >
                {row.val}
              </span>
            </div>

            {row.sub && (
              <p className="text-[9px] text-zinc-600 text-right mt-0.5 font-sans">
                {row.sub}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
