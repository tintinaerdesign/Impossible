import CoinTable from "../components/CoinTable";
import useCoins from "../Hooks/UseCoins";

export default function CoinList() {
  const { coins, loading } = useCoins();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold m-6">Crypto currencies Market</h1>
      <CoinTable coins={coins} loading={loading} />
    </div>
  );
}
