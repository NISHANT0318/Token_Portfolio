import { useEffect, useState } from "react";
import { fetchCoinData } from "../api/api";
import Sparkline from "./Sparklines";

export default function WatchlistTable() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const data = await fetchCoinData();
        setCoins(data);
      } catch (error) {
        console.error("Error fetching coin data:", error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  if (loading) {
    return (
      <div className="text-center p-6 text-gray-300">
        Loading coins...
      </div>
    );
  }

  return (
    <div className="p-6 bg-black">
      <h2 className="text-2xl font-bold mb-6 text-white">⭐ Watchlist</h2>

      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-800 text-gray-200">
              <th className="p-3">Token</th>
              <th className="p-3">Price</th>
              <th className="p-3">24h %</th>
              <th className="p-3">Market Cap</th>
              <th className="p-3">Sparkline (7d)</th>

            </tr>
          </thead>
          <tbody>
            {coins.slice(0, 10).map((coin) => (
              <tr
                key={coin.id}
                className="border-b border-gray-700 hover:bg-gray-800 transition"
              >
                <td className="p-3 flex items-center space-x-3">
                  <img
                    src={coin.image}
                    alt={coin.name}
                    className="w-7 h-7 rounded-full"
                  />
                  <span className="text-white">
                    {coin.name} ({coin.symbol.toUpperCase()})
                  </span>
                </td>
                <td className="p-3 text-gray-200">
                  ${coin.current_price.toLocaleString()}
                </td>
                <td
                  className={`p-3 font-medium ${
                    coin.price_change_percentage_24h > 0
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </td>
                <td className="p-3 text-gray-400">
                  ${coin.market_cap.toLocaleString()}
                </td>
                <td className="p-2">
                 <Sparkline data={coin.sparkline_in_7d.price}></Sparkline>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
