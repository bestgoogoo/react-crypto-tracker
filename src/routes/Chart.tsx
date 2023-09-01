import { useQuery } from "react-query";
import ApexChart from "react-apexcharts";
import { fetchCoinHistory } from "../api";
import { Loader } from "./Coins";

interface IData {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

interface IChartProps {
  coinId: string;
  isDark: boolean;
}

function Chart({ coinId, isDark }: IChartProps) {
  const { isLoading, data } = useQuery<IData[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );
  return (
    <h1>
      {isLoading ? (
        <Loader>Loading chart...</Loader>
      ) : (
        <ApexChart
          type="line"
          series={[
            {
              name: "Price",
              data: data?.map((price) => Number(price.close)) as number[],
            },
          ]}
          options={{
            theme: {
              mode: isDark ? "dark" : "light",
            },
            chart: {
              height: 300,
              width: 500,
              toolbar: { show: false },
              background: "transparent",
            },
            grid: { show: false },
            stroke: {
              width: 3,
              curve: "straight",
            },
            xaxis: {
              labels: { show: false },
              axisBorder: { show: false },
              axisTicks: { show: false },
              categories: data?.map((price) =>
                new Date(Date.now() - price.time_close).toString().slice(4, 25)
              ),
            },
            yaxis: { show: false },
            fill: {
              type: "gradient",
              gradient: { gradientToColors: ["#0fbcf9"], stops: [0, 100] },
            },
            colors: ["#0be881"],
            tooltip: {
              y: { formatter: (value) => `$${value.toLocaleString()}` },
            },
          }}
        />
      )}
    </h1>
  );
}

export default Chart;
