// components/Stocks/StocksSlider.tsx
// This is a simple horizontal list for demonstration.
// You can replace with your existing Swiper or "carouselOne" code.

import Image from "next/image";

export default function StocksSlider({ queries, onAddClicked }) {
  return (
    <div className="flex items-center gap-4 overflow-x-auto p-4 bg-dark-2 rounded-[10px]">
      {queries.map(({ symbol, quote }) => {
        const { data, isLoading, error } = quote;

        // parse data from AlphaVantage etc.
        let price = "—";
        let percentChange = "—";
        if (data && data["Global Quote"]) {
          price = data["Global Quote"]["05. price"];
          // etc.
        }

        return (
          <div 
            key={symbol} 
            className="min-w-[180px] p-4 bg-dark-3 rounded-lg flex flex-col items-center"
          >
            <div className="flex items-center justify-center mb-2">
              <Image src="/images/logo/some-stock-icon.png" width={24} height={24} alt="stock"/>
              <span className="ml-2 font-medium text-white">{symbol}</span>
            </div>
            {isLoading ? (
              <div className="text-gray-400 text-sm">Loading...</div>
            ) : error ? (
              <div className="text-red text-sm">Error</div>
            ) : (
              <div className="text-white">
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
        className="min-w-[60px] h-[60px] rounded-full bg-dark-3 flex items-center justify-center text-2xl text-white"
      >
        +
      </button>
    </div>
  );
}
