// components/Stocks/MyStocksList.tsx

import Image from "next/image";

export default function MyStocksList({ queries }) {
  return (
    <div>
      <h3 className="mb-4 text-dark dark:text-white font-bold">My Stocks</h3>
      <ul className="space-y-3">
        {queries.map(({ symbol, quote }) => {
          // parse data
          // let price = ...
          return (
            <li
              key={symbol}
              className="flex items-center justify-between rounded-md p-2
                         bg-white dark:bg-dark-3"
            >
              <div className="flex items-center gap-2">
                <Image
                  src="/images/logo/some-stock-icon.png"
                  width={24}
                  height={24}
                  alt={symbol}
                />
                <span className="text-dark dark:text-white font-medium">
                  {symbol}
                </span>
              </div>
              <span className="text-dark-5 dark:text-dark-6">$410.5</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
