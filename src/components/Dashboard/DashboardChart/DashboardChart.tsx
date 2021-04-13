import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';

import './DashboardChart.css';

interface ChartDataFields {
    xAxis: [];
    yAxis: [];
    type: string;
    mode: string;
}

interface DashboardChartProps {
    data: number[];
}
function DashboardChart() {
    return (
        <div id="dashboard-chart">
            <Line
                data={{
                    labels: [
                        'Monday',
                        'Tuesday',
                        'Wednesday',
                        'Thursday',
                        'Friday',
                        'Saturday',
                    ],
                    datasets: [
                        {
                            label: 'Number of Orders',
                            data: [8, 10, 20, 25, 13, 15],
                            backgroundColor: '#ac8efd80',
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)',
                            ],
                            borderWidth: 3,
                        },
                    ],
                }}
                height={200}
                width={50}
                options={{
                    maintainAspectRatio: false,
                    scales: {
                        yAxes: [
                            {
                                ticks: {
                                    beginAtZero: true,
                                },
                            },
                        ],
                    },
                    legend: {
                        display: true,
                        labels: {
                            fontSize: 14,
                        },
                    },
                }}
            />
        </div>
    );
}
export default DashboardChart;
