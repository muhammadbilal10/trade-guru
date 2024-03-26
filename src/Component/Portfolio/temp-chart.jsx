import { useEffect, useState } from 'react';
import * as LightweightCharts from 'lightweight-charts';
import { fetchStocks } from './apiFuntion/api_funtion';

const CandlestickChartComponent = ({ data }) => {
    const [stocksData, setStocksData] = useState(null); // Initialize with null
    const [loading, setLoading] = useState(true); // Introduce loading state

    useEffect(() => {
        const ProcesshData = async () => {
            try {
                // Parse the raw data string into an array of objects
                const parsedData = JSON.parse(data);
                // Check if parsedData is an array
                if (Array.isArray(parsedData)) {
                    console.log('Parsed data:', parsedData); // Log parsed data
                    // Check if parsed data is not empty
                    if (parsedData.length > 0) {
                        console.log('Parsed data is not empty');
                        // Format each item in the array according to the required format
                        const formattedData = parsedData.map(item => ({
                            time: item.Date,
                            open: Number(item.Open),
                            high: Number(item.High),
                            low: Number(item.Low),
                            close: Number(item.Close),
                        }));
                        console.log('Formatted data:', formattedData); // Log formatted data
                        // Set the formatted data in the state
                        setStocksData(formattedData);
                    } else {
                        // Handle case where parsed data is empty
                        console.error('Parsed data is empty');
                    }
                } else {
                    // Handle case where parsedData is not an array
                    console.error('Parsed data is not an array');
                }
            } catch (error) {
                // Handle JSON parsing error
                console.error('Error parsing JSON:', error);
            }


        };
        ProcesshData();
    }, []);


    return (
        <div id="chart-container" className="w-full h-500 lg:h-160 xl:h-200">
            {stocksData && <ChartWithData data={stocksData} />}
        </div>

    );
};

const ChartWithData = ({ data }) => {
    useEffect(() => {
        const chart = LightweightCharts.createChart(document.getElementById('chart-container'), {
            width: 1000,
            height: 450,
            layout: {
                background: {
                    type: 'solid',
                    color: '#ffffff', // Set background color to white
                },
                textColor: 'rgba(0, 0, 0, 0.9)', // Set text color to black
            },
            grid: {
                vertLines: {
                    color: 'rgba(197, 203, 206, 0.5)',
                },
                horzLines: {
                    color: 'rgba(197, 203, 206, 0.5)',
                },
            },
            crosshair: {
                mode: LightweightCharts.CrosshairMode.Normal,
            },
            rightPriceScale: {
                borderColor: 'rgba(197, 203, 206, 0.8)',
            },
            timeScale: {
                borderColor: 'rgba(197, 203, 206, 0.8)',
            },
        });

        const candleSeries = chart.addCandlestickSeries({
            upColor: 'green', // Set the color for upward candles (green)
            downColor: 'red', // Set the color for downward candles (red)
            // borderDownColor: 'rgba(255, 144, 0, 1)', // Adjust border color if needed
            // borderUpColor: 'rgba(255, 144, 0, 1)', // Adjust border color if needed
            wickDownColor: 'rgba(255, 144, 0, 1)', // Adjust wick color if needed
            wickUpColor: 'rgba(255, 144, 0, 1)', // Adjust wick color if needed
        });

        candleSeries.setData(data);


        // Cleanup function to remove the chart when the component unmounts
        return () => chart.remove();
    }, [data]);

    return null; // Chart will be rendered using LightweightCharts
};

export default CandlestickChartComponent;
