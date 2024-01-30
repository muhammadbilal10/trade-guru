import React from "react";
import { createChart } from 'lightweight-charts';
export default function Terminal() {
  const cahrt = () => {
   
    const chartOptions = { layout: { textColor: 'black', background: { type: 'solid', color: 'white' } } };
    const chart = createChart(document.getElementById('container'), chartOptions);
    const areaSeries = chart.addAreaSeries({ lineColor: '#2962FF', topColor: '#2962FF', bottomColor: 'rgba(41, 98, 255, 0.28)', });
    areaSeries.setData([
      { time: '2018-12-22', value: 32.51 },
      { time: '2018-12-23', value: 31.11 },
      { time: '2018-12-24', value: 27.02 },
      { time: '2018-12-25', value: 27.32 },
      { time: '2018-12-26', value: 25.17 },
      { time: '2018-12-27', value: 28.89 },
      { time: '2018-12-28', value: 25.46 },
      { time: '2018-12-29', value: 23.92 },
      { time: '2018-12-30', value: 22.68 },
      { time: '2018-12-31', value: 22.67 },
    ]);

    const candlestickSeries = chart.addCandlestickSeries({
      upColor: '#26a69a', downColor: '#ef5350', borderVisible: false,
      wickUpColor: '#26a69a', wickDownColor: '#ef5350',
    });
    candlestickSeries.setData([
      { time: '2018-12-22', open: 75.16, high: 82.84, low: 36.16, close: 45.72 },
      { time: '2018-12-23', open: 45.12, high: 53.90, low: 45.12, close: 48.09 },
      { time: '2018-12-24', open: 60.71, high: 60.71, low: 53.39, close: 59.29 },
      { time: '2018-12-25', open: 68.26, high: 68.26, low: 59.04, close: 60.50 },
      { time: '2018-12-26', open: 67.71, high: 105.85, low: 66.67, close: 91.04 },
      { time: '2018-12-27', open: 91.04, high: 121.40, low: 82.70, close: 111.40 },
      { time: '2018-12-28', open: 111.51, high: 142.83, low: 103.34, close: 131.25 },
      { time: '2018-12-29', open: 131.33, high: 151.17, low: 77.68, close: 96.43 },
      { time: '2018-12-30', open: 106.33, high: 110.20, low: 90.39, close: 98.10 },
      { time: '2018-12-31', open: 109.87, high: 114.69, low: 85.66, close: 111.26 },
    ]);

    chart.timeScale().fitContent();


  }



  return (
    <>
      <div className="flex h-screen">


      </div>


    </>
  );
}








// <div className="flex lg:h-screen">
//       {/* This element will appear on the left on larger screens */}
//       <div className="lg:hidden mt-4 w-full">
//         {/* Buttons for the row layout on smaller screens */}
//         <button className="bg-blue-500 text-white px-4 py-2 mb-2 w-full">Button 1</button>
//         <button className="bg-green-500 text-white px-4 py-2 mb-2 w-full">Button 2</button>
//         <button className="bg-red-500 text-white px-4 py-2 w-full">Button 3</button>
//       </div>

//       <div className="bg-gray-200 p-4 w-1/5 lg:flex-col lg:w-1/5 ml-auto">
//         <p className="lg:mb-auto">This is a responsive column.</p>
//         {/* Buttons at the bottom of the column */}
//         <div className="mt-auto lg:mt-0">
//           <button className="bg-blue-500 text-white px-4 py-2 mb-2 w-full  lg:w-auto">buy</button>
//           <button className="bg-green-500 text-white px-4 py-2 mb-2 w-full lg:w-auto">sell</button>
//           <button className="bg-red-500 text-white px-4 py-2 w-full lg:w-auto">watchlist</button>
//         </div>
//       </div>
//     </div>









// <div className="flex-1 bg-gray-300">
//         <object data="https://sarmaaya.pk/public/widgets/market-history-chart?market_symbol=KSE100"
//         width="50%"
//         height="600"
//         type="text/html"> Markets Price History </object>
//       </div>
