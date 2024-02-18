import React, { useRef, useEffect } from 'react';
import { createChart } from 'lightweight-charts';

const TradingViewCandlestickChart = ({ rawData }) => {
  const chartContainerRef = useRef();

  useEffect(() => {
    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
    });

    const candleSeries = chart.addCandlestickSeries();

    // Convert raw data to chart format and sort by time
    const data = rawData
      .map(item => ({
        time: item[0] * 1000, // Convert Unix timestamp to milliseconds
        open: item[1],
        high: item[2],
        low: item[3],
        close: item[4],
      }))
      .sort((a, b) => a.time - b.time);

    candleSeries.setData(data);

    return () => {
      chart.remove();
    };
  }, [rawData]);

  return <div ref={chartContainerRef} className="w-full h-80" />;
};

export default TradingViewCandlestickChart;
