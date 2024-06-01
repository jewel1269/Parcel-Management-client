import React from 'react';
import Chart from 'react-apexcharts';

const Statistics = () => {
  const lineChartData = {
    series: [
      {
        name: 'Bookings',
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: 'line',
      },
      title: {
        text: 'Detailed Chart 01',
        align: 'left',
      },
      xaxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
        ],
      },
    },
  };

  const barChartData = {
    series: [
      {
        data: [44, 55, 41, 64, 22, 43, 21],
      },
    ],
    options: {
      chart: {
        type: 'bar',
        height: 350,
      },
      title: {
        text: 'Detailed Chart 02',
        align: 'left',
      },
      xaxis: {
        categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      },
    },
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 p-4">
      <h1 className="text-3xl font-semibold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="col-span-1 md:col-span-2 bg-white shadow rounded-lg p-4">
          <Chart
            options={lineChartData.options}
            series={lineChartData.series}
            type="line"
            height={350}
          />
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-xl font-semibold">Average Charts</h2>
          <ul className="mt-4 space-y-2">
            <li className="flex justify-between items-center">
              <span>Chart 01</span>
              <div className="w-2/3 h-2 bg-red-500 rounded"></div>
            </li>
            <li className="flex justify-between items-center">
              <span>Chart 02</span>
              <div className="w-1/2 h-2 bg-blue-500 rounded"></div>
            </li>
            <li className="flex justify-between items-center">
              <span>Chart 03</span>
              <div className="w-1/3 h-2 bg-yellow-500 rounded"></div>
            </li>
            <li className="flex justify-between items-center">
              <span>Chart 04</span>
              <div className="w-1/4 h-2 bg-green-500 rounded"></div>
            </li>
          </ul>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-xl font-semibold">Earnings</h2>
          <p className="text-3xl font-bold text-blue-600">$2723</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-xl font-semibold">Downloads</h2>
          <p className="text-3xl font-bold text-yellow-600">2,142,950</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-xl font-semibold">Favorites</h2>
          <p className="text-3xl font-bold text-green-600">232,000</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-xl font-semibold">Profile Strength</h2>
          <div className="flex justify-center items-center">
            <div className="relative w-32 h-28 lg:mt-10">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold">75%</span>
              </div>
              <svg className="w-full h-full transform rotate-90">
                <circle
                  cx="50%"
                  cy="50%"
                  r="45%"
                  strokeWidth="10"
                  className="text-gray-300"
                  stroke="currentColor"
                  fill="transparent"
                />
                <circle
                  cx="50%"
                  cy="50%"
                  r="45%"
                  strokeWidth="10"
                  className="text-red-600"
                  stroke="currentColor"
                  strokeDasharray="calc(283 * 0.75) 283"
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="col-span-1 md:col-span-2 bg-white shadow rounded-lg p-4">
          <Chart
            options={barChartData.options}
            series={barChartData.series}
            type="bar"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default Statistics;
