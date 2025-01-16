// components/Stocks/MyStocksList.tsx
import Image from "next/image";

export default function MyStocksList({ queries }) {
  return (
    <div>
      <h3 className="mb-4 text-white font-bold">My Stocks</h3>
      <ul className="space-y-3">
        {queries.map(({ symbol, quote }) => {
          // parse data
          return (
            <li key={symbol} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Image 
                  src="/images/logo/some-stock-icon.png"
                  width={24}
                  height={24}
                  alt={symbol}
                />
                <span className="text-white">{symbol}</span>
              </div>
              {/* Example price / change, real data from the quote */}
              <span className="text-white">$410.5</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
