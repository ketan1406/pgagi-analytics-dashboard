import { useGetStockQuoteQuery } from '../store/financeApi';

export default function FinancePage() {
  // For demo: fetch "TSLA" stock quote
  const { data, error, isLoading } = useGetStockQuoteQuery('TSLA');

  if (isLoading) return <p>Loading stock data...</p>;
  if (error) return <p>Error fetching stock data.</p>;

  // The Alpha Vantage "GLOBAL_QUOTE" returns data in a specific format:
  // e.g. { "Global Quote": { "01. symbol": "TSLA", ... } }
  const quote = data?.['Global Quote'];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Finance</h1>
      {quote && (
        <div className="mt-2">
          <p>Symbol: {quote['01. symbol']}</p>
          <p>Price: {quote['05. price']}</p>
          <p>Volume: {quote['06. volume']}</p>
          <p>Change: {quote['09. change']}</p>
          <p>Change Percent: {quote['10. change percent']}</p>
        </div>
      )}
    </div>
  );
}
