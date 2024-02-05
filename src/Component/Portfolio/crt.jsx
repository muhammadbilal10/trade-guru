import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-moment';

class StockChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: {
                labels: [],
                datasets: [
                    {
                        label: 'Stock Price',
                        data: [],
                        borderColor: 'rgba(75, 192, 192, 1)',
                        fill: false
                    }
                ]
            }
        };
    }

    componentDidMount() {
        // Convert timestamps to Unix timestamps
        const data = this.props.data.map(([timestamp, price]) => [
            new Date(timestamp).getTime(),
            price
        ]);

        // Extract labels and data points
        const labels = data.map(([timestamp]) => new Date(timestamp));
        const prices = data.map(([_, price]) => price);

        // Update chart data
        this.setState({
            chartData: {
                ...this.state.chartData,
                labels,
                datasets: [
                    {
                        ...this.state.chartData.datasets[0],
                        data: prices
                    }
                ]
            }
        });
    }

    render() {
        return (
            <div>
                <h2>Stock Chart</h2>
                <Line
                    data={this.state.chartData}
                    options={{
                      scales: {
                        x: {
                            type: 'time',
                            time: {
                                unit: 'hour' // Adjust time scale as needed
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Price'
                            }
                        }
                    }
                    
                    }}
                />
            </div>
        );
    }
}

export default StockChart;
