// pages/stocks/index.tsx

import React from "react";
import Breadcrumb from "../Breadcrumbs";
import { useGetStockQuoteQuery } from "../../store/financeApi";

export default function StocksPage() {
  const { data, error, isLoading } = useGetStockQuoteQuery("AAPL");

  return (
    <div className="mx-auto max-w-7xl">
      {isLoading && (
        <p className="text-dark-5 dark:text-dark-6">Loading stock data...</p>
      )}
      {error && (
        <p className="text-red-500">Oops, something went wrong. Try again!</p>
      )}

      {data && (
        <div className="mb-10 rounded-lg bg-white p-4 shadow dark:bg-dark-2">
          <h3 className="mb-3 text-lg font-medium text-dark dark:text-white">
            Latest Quote for AAPL
          </h3>
          <p className="text-dark-5 dark:text-dark-6">
            {JSON.stringify(data)}
          </p>
        </div>
      )}
    </div>
  );
}
