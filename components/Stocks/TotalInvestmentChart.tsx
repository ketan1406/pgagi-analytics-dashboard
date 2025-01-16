import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts"; // important
import { useMemo } from "react";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

type TotalInvestmentChartProps = {
  // your props if any
};

export default function TotalInvestmentChart({}: TotalInvestmentChartProps) {
  // Prepare some data for the chart
  const chartData = useMemo(() => {
    return [29, 30, 31, 28, 36, 38, 40, 42];
  }, []);

  const series = [
    {
      name: "Investment Value",
      data: chartData,
    },
  ];

  // Define your ApexOptions carefully:
  const options: ApexOptions = {
    chart: {
      type: "line", // or "area", "bar", etc. => must match one of the known chart types
      height: 350,
    },
    xaxis: {
      categories: ["Jun '25", "Jul '25", "Aug '25", "Sep '25"],
    },
  };

  return (
    <Chart
      options={options}
      series={series}
      type="line"  // Must match an Apex valid type e.g. 'line', 'area'
      height={350}
    />
  );
}
