export default function ({ bitcoin }) {
  return (
    <div className="space-y-6">
      {/* 2. บล็อกข้อมูลข้อมูลรายละเอียดตลาดเชิงลึก */}
      <div className="bg-zinc-950/60 border border-zinc-900 rounded-3xl p-6 space-y-3.5">
        <h3 className="text-md font-bold text-zinc-400 font-sans tracking-wider uppercase mb-1">
          Market Info
        </h3>
        {[
          {
            name: "Market Cap",
            val: bitcoin ? `$${(bitcoin.market_cap / 1e12).toFixed(2)}T` : "--",
          },
          {
            name: "Market Cap Rank",
            val: bitcoin ? `#${bitcoin.market_cap_rank}` : "--",
            highlight: true,
          },
          {
            name: "Circulating Supply",
            val: bitcoin
              ? `${(bitcoin.circulating_supply / 1e6).toFixed(2)}M BTC`
              : "--",
          },
          {
            name: "Total Supply",
            val: bitcoin?.total_supply
              ? `${(bitcoin.total_supply / 1e6).toFixed(2)}M BTC`
              : "--",
          },
          {
            name: "Max Supply",
            val: bitcoin?.max_supply
              ? `${(bitcoin.max_supply / 1e6).toFixed(2)}M BTC`
              : "--",
          },
          { name: "Market Dominance", val: "52.34%" },
          {
            name: "All Time High",
            val: bitcoin
              ? `$${bitcoin.ath.toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}`
              : "--",
            sub: bitcoin
              ? new Date(bitcoin.ath_date).toLocaleDateString()
              : "--",
          },
          {
            name: "All Time Low",
            val: bitcoin
              ? `$${bitcoin.atl.toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}`
              : "--",
            sub: bitcoin
              ? new Date(bitcoin.atl_date).toLocaleDateString()
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
                className={`font-bold font-sans ${row.highlight ? "text-transparent bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text" : "text-zinc-300"}`}
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
