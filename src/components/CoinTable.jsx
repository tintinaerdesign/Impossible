import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function CoinTable({ coins, loading }) {
  const navigate = useNavigate();
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-gradient-to-r from-[#f2a900] to-[#ec0065] border border-white/20 rounded-lg overflow-hidden">
        <thead className="">
          <tr>
            {/* table header */}
            <th className="px-4 py-2 text-left">#</th>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Price</th>
            <th className="px-4 py-2 text-left">Market Cap</th>
            <th className="px-4 py-2 text-left">24h Change</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {loading ? (
            <tr className="border-t border-gray-600 bg-zinc-900/80 hover:bg-white/20">
              <td colSpan="5">Fetching data...</td>
            </tr>
          ) : (
            coins.map((coin) => (
              <tr
                className="
bg-black/85
hover:text-white
border-zinc-800
hover:bg-gray-700/80
cursor-pointer
transition-all
duration-200
"
                onClick={() => navigate(`/coin/${coin.id}`)}
              >
                <td className="px-4 py-2">{coin.market_cap_rank}</td>

                <td>
                  <div className="flex gap-2">
                    <img src={coin.image} className="w-6 h-6" />

                    <span className="text-lg">{coin.name}</span>
                    <div className="bg-zinc-800 text-zinc-300 text-xs px-2 py-1 rounded-md uppercase">
                      {coin.symbol}
                    </div>
                  </div>
                </td>

                <td className="px-4 py-2">
                  ${coin.current_price.toLocaleString()}
                </td>

                <td>${coin.market_cap.toLocaleString()}</td>

                <td
                  className={`px-6 py-4 text-left text-sm font-medium ${
                    coin.price_change_percentage_24h >= 0
                      ? "text-emerald-400"
                      : "text-rose-400"
                  }`}
                >
                  {coin.price_change_percentage_24h >= 0 ? "▲ +" : "▼ "}
                  {coin.price_change_percentage_24h?.toFixed(2)}%
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
