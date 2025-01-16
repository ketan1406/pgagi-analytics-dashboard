import { useState } from "react";
import Layout from "../../components/Layouts/Layout";
import { useGetWeatherByCityQuery } from "../../store/weatherApi";
import dynamic from "next/dynamic";
import Breadcrumb from "../../components/Breadcrumbs";

// Import ApexCharts dynamically (avoid SSR issues)
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function WeatherDashboard() {
  // State to hold the city name typed by user
  const [city, setCity] = useState("London");
  // Trigger the query
  const { data, error, isLoading, refetch } = useGetWeatherByCityQuery(city);

  // For a “creative” chart, let’s do a radial bar for humidity
  // And maybe show a bar chart for actual vs. “feels like” temp

  // Radial chart for humidity
  const humidity = data?.main?.humidity || 0;
  const humidityChartOptions = {
    chart: {
      type: "radialBar" as const, // must match Apex type
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: "60%",
        },
        dataLabels: {
          show: true,
          name: {
            show: true,
            fontSize: "16px",
          },
          value: {
            fontSize: "14px",
            formatter: (val: number) => `${val}%`,
          },
        },
      },
    },
    labels: ["Humidity"],
    colors: ["#3C50E0"],
  };
  const humidityChartSeries = [humidity];

  // A small bar chart for actual vs. feels-like
  const temp = data?.main?.temp || 0;
  const feelsLike = data?.main?.feels_like || 0;
  const barChartOptions = {
    chart: {
      type: "bar" as const,
      height: 200,
    },
    xaxis: {
      categories: ["Temperature (C)"],
    },
    colors: ["#F59E0B", "#3C50E0"],  // just an example color palette
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "40%",
      },
    },
    dataLabels: {
      enabled: true,
    },
  };
  const barChartSeries = [
    {
      name: "Actual Temp",
      data: [Math.round(temp)],
    },
    {
      name: "Feels Like",
      data: [Math.round(feelsLike)],
    },
  ];

  return (
    <Layout>
      <div className="mx-auto max-w-7xl">
        {/* Reuse the existing breadcrumbs component for consistency */}
        <Breadcrumb pageName="Weather" />

        <div className="mb-2">
          <p className="text-body-sm text-dark-5 dark:text-dark-6">
            Enter a city name to see current conditions.
          </p>
        </div>

        {/* City Input + Button */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4">
          <input
            type="text"
            className="w-full sm:w-60 rounded border border-stroke bg-gray-2 py-2 px-3 text-dark focus:border-primary focus:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="e.g. London"
          />
          <button
            onClick={() => refetch()}
            className="rounded-md bg-primary px-6 py-2 text-white hover:bg-opacity-90"
          >
            Search
          </button>
        </div>

        {/* Loading / Error / Data States */}
        {isLoading && <p>Loading weather data for {city}...</p>}
        {error && (
          <p className="text-red">Sorry, something went wrong fetching weather.</p>
        )}
        {!isLoading && !error && data && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: Weather Summary Card */}
            <div className="rounded-lg border border-stroke bg-white p-5 dark:border-dark-3 dark:bg-gray-dark shadow-card-2">
              <h3 className="text-lg font-semibold text-dark dark:text-white mb-2">
                Current Conditions in {city}
              </h3>
              <p className="mb-2 text-dark-5 dark:text-dark-6">
                <strong>Temperature:</strong> {Math.round(temp)}°C
              </p>
              <p className="mb-2 text-dark-5 dark:text-dark-6">
                <strong>Feels Like:</strong> {Math.round(feelsLike)}°C
              </p>
              <p className="mb-2 text-dark-5 dark:text-dark-6">
                <strong>Humidity:</strong> {humidity}%
              </p>
              <p className="mb-2 text-dark-5 dark:text-dark-6">
                <strong>Weather:</strong>{" "}
                {data?.weather?.[0]?.description || "N/A"}
              </p>
            </div>

            {/* Right: Some fun charts */}
            <div className="grid grid-cols-1 gap-6">
              {/* 1) Radial Chart: Humidity */}
              <div className="rounded-lg border border-stroke bg-white p-4 dark:border-dark-3 dark:bg-gray-dark shadow-card-2">
                <h4 className="text-md font-medium mb-2 text-dark dark:text-white">
                  Humidity
                </h4>
                <ReactApexChart
                  options={humidityChartOptions}
                  series={humidityChartSeries}
                  type="radialBar"
                  height={250}
                />
              </div>

              {/* 2) Bar Chart: Actual vs. Feels Like */}
              <div className="rounded-lg border border-stroke bg-white p-4 dark:border-dark-3 dark:bg-gray-dark shadow-card-2">
                <h4 className="text-md font-medium mb-2 text-dark dark:text-white">
                  Temperature Comparison
                </h4>
                <ReactApexChart
                  options={barChartOptions}
                  series={barChartSeries}
                  type="bar"
                  height={250}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
