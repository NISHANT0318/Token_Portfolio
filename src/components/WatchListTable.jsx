import { useEffect, useState } from "react";
import { fetchCoinData } from "../api/api";
import Sparklines from "./Sparklines"
import RowMenu from "./Rowmenu";

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
      <div className="text-center p-6 text-gray-300">Loading coins...</div>
    );
  }

  return (
    <div className="p-6 bg-black">
      <h2 className="text-2xl font-bold mb-6 text-white">⭐ Watchlist</h2>

      <div className="w-[1384px] rounded-lg shadow-md">
        <table className="w-full border-collapse">
          
          <thead>
            <tr className="w-[1384px] h-12 bg-[#27272A]">
              <th className="w-[206px] h-12 px-6 text-left text-[13px] leading-5 font-medium text-[#A1A1AA]">
                Token
              </th>
              <th className="w-[206px] h-12 px-6 text-left text-[13px] leading-5 font-medium text-[#A1A1AA]">
                Price
              </th>
              <th className="w-[206px] h-12 px-6 text-left text-[13px] leading-5 font-medium text-[#A1A1AA]">
                24h %
              </th>
              <th className="w-[206px] h-12 px-6 text-left text-[13px] leading-5 font-medium text-[#A1A1AA]">
                Market Cap
              </th>
              <th className="w-[206px] h-12 px-6 text-left text-[13px] leading-5 font-medium text-[#A1A1AA]">
                Sparkline (7d)
              </th>
              <th className="w-[206px] h-12 px-6 text-left text-[13px] leading-5 font-medium text-[#A1A1AA]">
                Holdings
              </th>
              <th className="w-[206px] h-12 px-6 text-left text-[13px] leading-5 font-medium text-[#A1A1AA]">
                Value
              </th>
              <th className="w-[206px] h-12 px-6 text-left text-[13px] leading-5 font-medium text-[#A1A1AA]">
                
              </th>
            </tr>
          </thead>

          <tbody className="w-[1384px] h-[312px] border border-[#FFFFFF14]">
            {coins.slice(0, 10).map((coin) => (
              <tr
                key={coin.id}
                className="w-[1384px] h-12 bg-[#212124] border-b border-[#FFFFFF14]"
              >
                
                <td className="w-[206px] h-12 flex items-center gap-3 px-6">
                  <div className="w-8 h-8 flex items-center justify-center border border-white/10 rounded">
                    <img
                      src={coin.image}
                      alt={coin.name}
                      className="w-8 h-8 object-cover rounded"
                    />
                  </div>
                  <span className="text-[13px] leading-5 text-[#F4F4F5] font-normal">
                    {coin.name} ({coin.symbol.toUpperCase()})
                  </span>
                </td>

               
                <td className="w-[206px] h-12 px-6 text-[13px] leading-5 text-[#F4F4F5]">
                  ${coin.current_price.toLocaleString()}
                </td>

                
                <td
                  className={`w-[206px] h-12 px-6 text-[13px] leading-5 font-medium ${
                    coin.price_change_percentage_24h > 0
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </td>

                
                <td className="w-[206px] h-12 px-6 text-[13px] leading-5 text-[#A1A1AA]">
                  ${coin.market_cap.toLocaleString()}
                </td>

                
                <td className="w-[206px] h-12 px-6">
  <Sparklines data={coin.sparkline_in_7d.price} />
</td>
<td className="w-[206px] h-12 px-6">
        <input
          type="number"
          min="0"
          step="any"
          defaultValue={0}
          onChange={(e) => {
            const value = parseFloat(e.target.value) || 0;
            coin.holdings = value; // temporary; better: store in Redux or state
          }}
          className="w-20 px-2 py-1 bg-[#1F1F23] border border-[#333] rounded text-sm text-white"
        />
      </td>

      
      <td className="w-[206px] h-12 px-6 text-[13px] leading-5 text-[#F4F4F5]">
        ${((coin.holdings || 0) * coin.current_price).toLocaleString()}
      </td>

      
      <td className="w-[72px] h-12 px-6 text-right">
  <RowMenu
    onEdit={() => {
    }}
    onRemove={() => {
      setCoins((prev) => prev.filter((c) => c.id !== coin.id));
    }}
  />
</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
