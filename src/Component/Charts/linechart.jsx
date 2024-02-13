// LineChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';

const LineChart = ({ data }) => {
  return (
    <div>
      <h2>Portfolio Performance</h2>
      <Line data={data} />
    </div>
  );
}

export default LineChart;
