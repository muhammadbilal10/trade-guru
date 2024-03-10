import { useEffect } from 'react';
import * as LightweightCharts from 'lightweight-charts';

const CandlestickChartComponent = ({ data }) => {
    useEffect(() => {
        const chart = LightweightCharts.createChart(document.getElementById('chart-container'), {
            width: 600,
            height: 300,
            layout: {
                background: {
                    type: 'solid',
                    color: '#000000',
                },
                textColor: 'rgba(255, 255, 255, 0.9)',
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
            upColor: 'rgba(255, 144, 0, 1)',
            downColor: '#000',
            borderDownColor: 'rgba(255, 144, 0, 1)',
            borderUpColor: 'rgba(255, 144, 0, 1)',
            wickDownColor: 'rgba(255, 144, 0, 1)',
            wickUpColor: 'rgba(255, 144, 0, 1)',
        });

        candleSeries.setData(data);

        // Cleanup function to remove the chart when the component unmounts
        return () => chart.remove();
    }, [data]);

    return <div id="chart-container" className="w-full h-full"></div>;
};

export default CandlestickChartComponent;
