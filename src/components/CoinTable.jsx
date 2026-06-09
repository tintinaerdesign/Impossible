export default function CoinTable({ coins, loading }) {
  return (
    <div className="min-h-screen text-white px-6 py-10">
      <table className="min-w-full border-collapse">
        <thead className="bg-gradient-to-r from-[#180d12] to-orange-500/80">
          <tr>
            <th className="flex items-center justify-center">#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Market Cap</th>
            <th>24h Change</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan="5">Fetching data...</td>
            </tr>
          ) : (
            coins.map((coin) => (
              <tr key={coin.id}>
                <td>{coin.market_cap_rank}</td>

                <td>
                  <div className="flex gap-2">
                    <img src={coin.image} className="w-6 h-6" />

                    {coin.name}
                  </div>
                </td>

                <td>${coin.current_price.toLocaleString()}</td>

                <td>${coin.market_cap.toLocaleString()}</td>

                <td>{coin.price_change_percentage_24h?.toFixed(2)}%</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
