import CoinTable from "../components/CoinTable";
import useCoins from "../Hooks/UseCoins";

export default function CoinList() {
  const { coins, loading } = useCoins();

  return (
    <div className="p-8">
      <h1 className="text-6xl text-pink-300 m-6">
        <span className="text-7xl">C</span>ryptocurrencies Market
      </h1>
      <CoinTable coins={coins} loading={loading} />
    </div>
  );
}
