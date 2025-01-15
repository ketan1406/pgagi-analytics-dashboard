// pages/stocks/index.tsx

"use client"; // or if you're on Next 13 with the old pages router, you can omit "use client"
import React from "react";
import Breadcrumb from "../Breadcrumbs";
import { useGetStockQuoteQuery } from "../../store/financeApi";

export default function StocksPage() {
  // For demonstration, fetch Apple stock quote
  const { data, error, isLoading } = useGetStockQuoteQuery("AAPL");

  // You can optionally transform 'data' into a shape suitable for your chart
  // For example: let myChartData = processAlphaVantageData(data);

  return (
      <div className="mx-auto max-w-7xl">
        <Breadcrumb pageName="Stocks" />

        <h2 className="mb-6 text-xl font-bold dark:text-white">
          Stocks Dashboard
        </h2>

        {isLoading && <p>Loading stock data...</p>}
        {error && <p>Oops, something went wrong. Try again!</p>}

        {data && (
          <div className="mb-10 rounded-lg bg-white p-4 shadow dark:bg-dark-2">
            <h3 className="mb-3 text-lg font-medium dark:text-white">
              Latest Quote for AAPL
            </h3>
            <p className="dark:text-dark-6">
              {/* Display raw or processed data */}
              {JSON.stringify(data)}
            </p>
          </div>
        )}

        {/* If you have a chart component, you can include it below */}
        {/* <MyStockChart data={myChartData} /> */}

      </div>
  );
}
