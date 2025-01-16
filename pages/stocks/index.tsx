import { useState } from "react";
import Breadcrumb from "../../components/Breadcrumbs";
import ClickOutside from "../../components/Shared/ClickOutside"; // or wherever your ClickOutside is located
import { useGetStockQuoteQuery } from "../../store/financeApi";
import StocksSlider from "../../components/Stocks/StocksSlider";
import TotalInvestmentChart from "../../components/Stocks/TotalInvestmentChart";
import MyStocksList from "../../components/Stocks/MyStocksList";

export default function StocksPage() {
  const [symbols, setSymbols] = useState(["META", "GOOGL", "TSLA", "MSFT"]);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [newSymbol, setNewSymbol] = useState("");

  // For each symbol, call the RTK Query
  const queries = symbols.map((sym) => ({
    symbol: sym,
    quote: useGetStockQuoteQuery(sym),
  }));

  const handleAddSymbol = () => {
    if (!newSymbol) return;
    setSymbols((prev) => [...prev, newSymbol.toUpperCase()]);
    setNewSymbol("");
    setAddModalOpen(false);
  };

  return (
    <div className="mx-auto max-w-7xl">
      <Breadcrumb pageName="Stocks" />
      <div className="mx-auto max-w-screen-2xl py-4 px-4 md:px-6 2xl:px-10">
        {/* Top slider with existing stock cards + plus button */}
        <StocksSlider
          queries={queries}
          onAddClicked={() => setAddModalOpen(true)}
        />

        {/* Section showing \"Total Investment\" chart and \"My Stocks\" side panel */}
        <div className="mt-8 flex gap-4">
          {/* Chart container: Use a light/dark background */}
          <div className="flex-1 rounded-[10px] bg-white p-4 dark:bg-dark-2">
            <TotalInvestmentChart />
          </div>
          {/* My stocks panel: Use matching light/dark background */}
          <div className="w-[300px] rounded-[10px] bg-white p-4 dark:bg-dark-2">
            <MyStocksList queries={queries} />
          </div>
        </div>

        {/* The Add Symbol Modal */}
        {addModalOpen && (
          <ClickOutside onClick={() => setAddModalOpen(false)}>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="w-[300px] rounded-lg bg-white p-6 dark:bg-dark-2">
                <h2 className="mb-4 text-xl font-bold text-dark dark:text-white">
                  Add a Stock Symbol
                </h2>
                <input
                  type="text"
                  className="
                    mb-4 w-full rounded border p-2
                    text-dark dark:border-dark-4 dark:bg-dark-3 dark:text-white
                  "
                  placeholder="e.g. AAPL"
                  value={newSymbol}
                  onChange={(e) => setNewSymbol(e.target.value)}
                />
                <div className="flex justify-end space-x-2">
                  <button
                    className="
                      rounded bg-gray-300 px-4 py-2 
                      text-dark hover:bg-gray-400 
                      dark:bg-dark-4 dark:text-white dark:hover:bg-dark-3
                    "
                    onClick={() => setAddModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="
                      rounded bg-primary px-4 py-2 text-white 
                      hover:bg-opacity-90
                    "
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
    </div>
  );
}
