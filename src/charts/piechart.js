import { Pie } from 'react-chartjs-2';
import React from 'react';

const PieChart = ({ alertData }) => {
    const categoryCounts = alertData.reduce((acc, alert) => {
        acc[alert.alert?.category] = (acc[alert.alert?.category] || 0) + 1;
        return acc;
    }, {});

    const data = {
        labels: Object.keys(categoryCounts),
        datasets: [
            {
                data: Object.values(categoryCounts),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
            },
        ],
    };

    return (
        <div className="bg-white shadow p-4 rounded-lg">
            <h2 className="text-xl font-bold mb-2">Alert Category Distribution</h2>
            <Pie data={data} style={{maxHeight:'50vh'}} />
        </div>
    );
};

export default PieChart;
