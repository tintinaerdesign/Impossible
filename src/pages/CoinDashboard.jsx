import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import CoinHeader from "../components/bitcoin/CoinHeader";
import MarketInfo from "../components/bitcoin/MarketInfo";
import CoinChart from "../components/bitcoin/CoinChart";

export default function CoinDashboard() {
  const { id } = useParams();

  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCoin() {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${id}`,
          {
            headers: {
              accept: "application/json",
            },
          },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch");
        }

        const data = await response.json();

        console.log(data);

        setCoin(data);
      } catch (error) {
        console.error("Error fetching coin:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCoin();
  }, [id]);

  if (loading) {
    return <div className="p-8 animate-pulse text-zinc-400">Loading...</div>;
  }

  if (!coin) {
    return <div className="p-8 text-red-400">Coin not found</div>;
  }

  return (
    <div className="p-8 space-y-8">
      <CoinHeader coin={coin} />

      <CoinChart coinId={id} timeframe="1D" setRsiData={() => {}} />

      <MarketInfo coin={coin} />
    </div>
  );
}
