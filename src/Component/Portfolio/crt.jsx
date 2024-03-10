
import React, { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';

const CandlestickChart = ({ data }) => {
  const containerRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !data || data.length === 0) return;

    // Create a new chart
    const chart = createChart(containerRef.current, {
      width: containerRef.current.clientWidth,
      height: containerRef.current.clientHeight,
    });

    // Add a candlestick series
    const candlestickSeries = chart.addCandlestickSeries();

    // Convert date strings to timestamps and handle null open and close values
    const formattedData = data.map(({ time, open, high, low, close, volume }) => {
      const formattedOpen = open !== null ? open : low;
      const formattedClose = close !== null ? close : formattedOpen; // Set close to open if close is null
      return {
        time: new Date(time).getTime() / 1000, // Convert to Unix timestamp (seconds)
        open: formattedOpen,
        high,
        low,
        close: formattedClose,
        volume,
      };
    });

    // Sort formattedData by time in ascending order
    formattedData.sort((a, b) => a.time - b.time);

    // Add data to the candlestick series
    candlestickSeries.setData(formattedData);

    chartRef.current = chart;

    return () => {
      if (chartRef.current !== null) {
        chartRef.current.remove();
      }
    };
  }, [data]);

  return <div ref={containerRef} style={{ width: '100%', height: '400px' }}></div>;

};

export default CandlestickChart;

// const formattedData = data.map(({ time, open, high, low, close, volume }) => ({
//   time: new Date(time).getTime() / 1000, // Convert to Unix timestamp (seconds)
//   open,
//   high,
//   low,
//   close,
//   volume,
// }));
// Convert date strings to timestamps and handle null open and close values





















