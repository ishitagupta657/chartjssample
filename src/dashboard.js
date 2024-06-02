import 'chart.js/auto';
import 'tailwindcss/tailwind.css';

import { Bar, Line, Pie } from 'react-chartjs-2';
import React, { useEffect, useState } from 'react';

import BarChart from './charts/barchart';
import LineChart from './charts/linechart';
import { MOCKDATA } from './mockdata';
import PieChart from './charts/piechart';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [tab, setTab] = useState(0)
  const [portFilter, setPortFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [uniquePorts, setUniquePorts] = useState([]);

  useEffect(() => {
    setData(MOCKDATA);
  }, []);

  const handlePortFilterChange = (e) => {
    setPortFilter(e.target.value);
  };

  const handleDateFilterChange = (e) => {
    setDateFilter(e.target.value);
  };

  const filterAlerts = (alerts) => {
    return alerts.filter(alert => {
      const matchesPort = portFilter ? alert.dest_port.toString() === portFilter : true;
      const matchesDate = dateFilter ? new Date(alert.timestamp).toISOString().split('T')[0] === dateFilter : true;
      return matchesPort && matchesDate;
    });
  };


  useEffect(() => {
    const ports = [...new Set(data.map(alert => alert.dest_port))];
    setUniquePorts(ports);
  }, [data]);


  const filteredData = filterAlerts(data);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>
        <div className="flex items-center">
          <div className="mb-4 mr-4">
            <label className="block text-gray-700">Filter by Destination Port:</label>
            <select
              value={portFilter}
              onChange={handlePortFilterChange}
              className="mt-1 border border-gray-300 rounded"
            >
              <option value="">All Ports</option>
              {uniquePorts.map(port => (
                <option key={port} value={port}>{port}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Filter by Date:</label>
            <input
              type="date"
              value={dateFilter}
              onChange={handleDateFilterChange}
              className="mt-1 border border-gray-300 rounded"
            />
          </div>
        </div>
      </header>

      <div className="flex" >
        <aside className="bg-gray-800 text-white w-64 p-4" style={{ height: '100vh' }}>
          <nav>
            <ul>
              <li className={`mb-4 ${tab === 0 ? 'text-blue-600 font-bold' : ''}`}>
                <a href="#" className="hover:text-gray-300" onClick={() => setTab(0)}>Alert Category Distribution: Pie Chart</a>
              </li>
              <li className={`mb-4 ${tab === 1 ? 'text-blue-600 font-bold' : ''}`}>
                <a href="#" className="hover:text-gray-300" onClick={() => setTab(1)}>Severity Counts: LineChart</a>
              </li>
              <li className={`mb-4 ${tab === 2 ? 'text-blue-600 font-bold' : ''}`}>
                <a href="#" className="hover:text-gray-300" onClick={() => setTab(2)}>Alerts by Severity: Bar Chart</a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:text-gray-300" onClick={() => window.location.reload()}>Reset Filters</a>
              </li>
            </ul>
          </nav>
        </aside>

        <main className="flex-1 p-6" style={{ height: 'calc(100vh - 120px)' }}>
          {tab === 0 && <PieChart alertData={filteredData} />}
          {tab === 1 && <LineChart alertData={filteredData} />}
          {tab === 2 && <BarChart alertData={filteredData} />}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
