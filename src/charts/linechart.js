import { Line } from 'react-chartjs-2';
import React from 'react';

const LineChart = ({ alertData }) => {
    const timestamps = alertData.map(alert => new Date(alert.timestamp).toLocaleString());
    const severityCounts = alertData.map(alert => alert.alert?.severity);

    const data = {
        labels: timestamps,
        datasets: [
            {
                label: 'Alert Severity Over Time',
                data: severityCounts,
                fill: false,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
            },
        ],
    };

    return (
        <div className="bg-white shadow p-4 rounded-lg">
            <h2 className="text-xl font-bold mb-2">Alert Severity Over Time</h2>
            <Line data={data} style={{height: '80%'}} />
        </div>
    );
};

export default LineChart;
