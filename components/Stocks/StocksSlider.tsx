// components/Stocks/StocksSlider.tsx

import Image from "next/image";

export default function StocksSlider({ queries, onAddClicked }) {
  return (
    <div className="
      flex items-center gap-4 overflow-x-auto p-4 rounded-[10px] 
      bg-gray-2 dark:bg-dark-2
    ">
      {queries.map(({ symbol, quote }) => {
        const { data, isLoading, error } = quote;

        // parse data
        let price = "—";
        if (data && data["Global Quote"]) {
          price = data["Global Quote"]["05. price"];
        }

        return (
          <div
            key={symbol}
            className="
              min-w-[180px] p-4 rounded-lg flex flex-col items-center 
              bg-white dark:bg-dark-3
            "
          >
            <div className="flex items-center justify-center mb-2">
              <Image
                src="/images/logo/some-stock-icon.png"
                width={24}
                height={24}
                alt="stock"
              />
              <span className="ml-2 text-dark dark:text-white font-medium">
                {symbol}
              </span>
            </div>

            {isLoading ? (
              <div className="text-dark-5 dark:text-dark-6 text-sm">
                Loading...
              </div>
            ) : error ? (
              <div className="text-red text-sm">Error</div>
            ) : (
              <div className="text-dark dark:text-white">
                <div>Price: {price}</div>
                <div className="text-green-400">+0.95%</div>
              </div>
            )}
          </div>
        );
      })}

      {/* The + item */}
      <button
        onClick={onAddClicked}
        className="
          min-w-[60px] h-[60px] rounded-full 
          bg-white dark:bg-dark-3 text-dark dark:text-white
          flex items-center justify-center text-2xl
        "
      >
        +
      </button>
    </div>
  );
}
