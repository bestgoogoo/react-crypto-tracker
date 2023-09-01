import { useRecoilValue } from "recoil";
import { useQuery } from "react-query";
import ApexChart from "react-apexcharts";
import { fetchCoinHistory } from "../api";
import { Loader } from "./Coins";
import { isDarkAtom } from "../atoms";

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
}

function Chart({ coinId }: IChartProps) {
  const isDark = useRecoilValue(isDarkAtom);
  const { isLoading, data } = useQuery<IData[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );
  const ohlcData = data?.map((ohlc) => ({
    x: new Date(Date.now() - ohlc?.time_close).toString().slice(4, 25),
    y: [ohlc.open, ohlc.high, ohlc.low, ohlc.close],
  }));

  return (
    <>
      {isLoading ? (
        <Loader>Loading chart...</Loader>
      ) : (
        <ApexChart
          type="candlestick"
          series={[{ data: ohlcData }] as unknown as number[]}
          options={{
            theme: {
              mode: isDark ? "dark" : "light",
            },
            chart: {
              type: "candlestick",
              height: 300,
              width: 500,
              toolbar: { show: false },
              background: "transparent",
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
            tooltip: {
              y: { formatter: (value: number) => `$${value.toLocaleString()}` },
            },
            grid: { show: false },
            stroke: {
              width: 2,
            },
          }}
        />
      )}
    </>
  );
}

export default Chart;
