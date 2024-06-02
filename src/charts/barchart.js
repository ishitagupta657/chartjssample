import { Bar } from 'react-chartjs-2';
import React from 'react';

const BarChart = ({ alertData }) => {
    const severityCounts = alertData.reduce((acc, alert) => {
        acc[alert.alert?.severity ?? 0] = (acc[alert.alert?.severity ?? 0] || 0) + 1;
        return acc;
    }, {});

    const data = {
        labels: Object.keys(severityCounts),
        datasets: [
            {
                label: 'Number of Alerts by Severity',
                data: Object.values(severityCounts),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            },
        ],
    };

    return (
        <div className="bg-white shadow p-4 rounded-lg">
            <h2 className="text-xl font-bold mb-2">Alerts by Severity</h2>
            <Bar data={data} />
        </div>
    );
};

export default BarChart;
