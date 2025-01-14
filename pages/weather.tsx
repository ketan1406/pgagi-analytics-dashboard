import { useGetWeatherByCityQuery } from '../store/weatherApi';

export default function WeatherPage() {
  // For demo: fetch weather for "London"
  const { data, error, isLoading } = useGetWeatherByCityQuery('London');

  if (isLoading) return <p>Loading weather data...</p>;
  if (error) return <p>Error fetching weather.</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Weather Info</h1>
      {data && (
        <div className="mt-2">
          <p>City: {data.name}</p>
          <p>Temperature: {data.main.temp} °C</p>
          <p>Condition: {data.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}
