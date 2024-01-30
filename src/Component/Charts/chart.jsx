import React, { useEffect } from 'react';
import { createChart } from 'lightweight-charts';

export default function Chart(){
  useEffect(() => {
    // Create a new chart
    const container = document.getElementById('tv_chart_container');
    const chart = createChart(container, { width: container.offsetWidth, height: 250});

    // Add your chart configuration and data here
    const lineSeries = chart.addLineSeries();
  lineSeries.setData([
    { time: '2019-04-11', value: 80.01 },
    { time: '2019-04-12', value: 96.63 },
    { time: '2019-04-13', value: 96.63 },
    { time: '2019-04-14', value: 96.63 },
    // Add more data points as needed
  ]);

    return () => {
      
    };
  }, []);

   return <div id="tv_chart_container" style={{ height: '400px' }} />;

};




