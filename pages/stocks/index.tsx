// pages/stocks/index.tsx

import { useState } from "react";
import ClickOutside from "../../components/Shared/ClickOutside";
import { useGetStockQuoteQuery } from "../../store/financeApi";
import StocksSlider from "../../components/Stocks/StocksSlider"; 
// (We'll create that in a moment)
import TotalInvestmentChart from "../../components/Stocks/TotalInvestmentChart"; 
// (Optional new component or reuse from existing)
import MyStocksList from "../../components/Stocks/MyStocksList";

export default function StocksPage() {
  // This could come from Redux if you want a global store.
  // For local demonstration, we'll keep it in useState
  const [symbols, setSymbols] = useState(["META", "GOOGL", "TSLA", "MSFT"]);

  // For each symbol, call the RTK Query
  // This is simplistic: we do multiple hooks. 
  // In reality, you might create a single endpoint that fetches multiple at once, 
  // or store them in Redux if you prefer. 
  const queries = symbols.map((sym) => ({
    symbol: sym,
    quote: useGetStockQuoteQuery(sym), 
  }));

  // Example: open/close for the "Add Symbol" modal
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [newSymbol, setNewSymbol] = useState("");

  const handleAddSymbol = () => {
    if (!newSymbol) return;
    // Add to array
    setSymbols((prev) => [...prev, newSymbol.toUpperCase()]);
    // Clear input & close
    setNewSymbol("");
    setAddModalOpen(false);
  };

  return (
      <div className="mx-auto max-w-screen-2xl py-4 px-4 md:px-6 2xl:px-10">
        {/* Top slider with existing stock cards + plus button */}
        <StocksSlider 
          queries={queries} 
          onAddClicked={() => setAddModalOpen(true)} 
        />

        {/* Section showing "Total Investment" chart and "My Stocks" side panel */}
        <div className="mt-8 flex gap-4">
          <div className="flex-1 bg-dark-2 p-4 rounded-[10px]">
            <TotalInvestmentChart/>
          </div>
          <div className="w-[300px] bg-dark-2 p-4 rounded-[10px]">
            <MyStocksList queries={queries} />
          </div>
        </div>

        {/* The Add Symbol Modal */}
        {addModalOpen && (
          <ClickOutside onClick={() => setAddModalOpen(false)}>
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="rounded-lg bg-white p-6 w-[300px]">
                <h2 className="mb-4 text-xl font-bold">Add a Stock Symbol</h2>
                <input
                  type="text"
                  className="mb-4 w-full rounded border p-2"
                  placeholder="e.g. AAPL"
                  value={newSymbol}
                  onChange={(e) => setNewSymbol(e.target.value)}
                />
                <div className="flex justify-end space-x-2">
                  <button
                    className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                    onClick={() => setAddModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 rounded bg-primary text-white hover:bg-opacity-90"
                    onClick={handleAddSymbol}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </ClickOutside>
        )}
      </div>
  );
}
