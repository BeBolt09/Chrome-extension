import { Line } from 'react-chartjs-2';
import React, { useEffect, useState } from 'react';

const MonthHourAverage = () => {

  const [dataPoints,setData] = useState(null);

  useEffect(() => {
    const currentTime = new Date().getTime();
    const startTime = currentTime - 30 * 24 * 60 * 60 * 1000;

    chrome.history.search({ text: '', startTime, maxResults: 10000 }, (historyItems) => {
      const hourlyCounts = new Array(24).fill(0);

      // Count visits for each hour
      historyItems.forEach((item) => {
        const visitTime = new Date(item.lastVisitTime);
        const hour = visitTime.getHours();
        hourlyCounts[hour]++;
      });

      const hourlyTotals = new Array(24).fill(0);

      // Count total visits for each hour over the week
      historyItems.forEach((item) => {
        const visitTime = new Date(item.lastVisitTime);
        const hour = visitTime.getHours();
        hourlyTotals[hour]++;
      });

      const averageVisitsPerHour = hourlyTotals.map((total) => (total / 30).toFixed(2));
      setData(averageVisitsPerHour);
      console.log('Average Visits Per Hour of the Week:', averageVisitsPerHour);

      // Find the busiest hour
      const maxCount = Math.max(...hourlyCounts);
      const busiestHourIndex = hourlyCounts.indexOf(maxCount);

      // Update state with the busiest hour (using 12-hour format)
      setBusiestHour(`${busiestHourIndex % 12 || 12} ${busiestHourIndex < 12 ? 'AM' : 'PM'}`);
    });
  }, []);

  const labels = ["0AM","1AM","2AM","3AM","4AM","5AM","6AM","7AM","8AM","9AM","10AM","11AM","12PM","1PM","2PM","3PM","4PM","5PM","6PM","7PM","8PM","9PM","10PM","11PM"];
  const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
    },
    scales: {
        y: {
            suggestedMin: 0, // Ensure the y-axis starts at 0
        },
    },
};
const data = {
    labels: labels,
    datasets: [
        {
            label: '# of Websites visited at each hour',
            data: dataPoints,
            borderColor: 'black',
            backgroundColor: 'black',
        },
    ],
};
  return (
        <div className="bg-white pt-24 pb-0 sm:py-32">
        <dt className='text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl'>Average Visits Each Hour</dt>
        <div className="mx-auto w-3/4 px-6 lg:px-18 border-3 border-black rounded-lg">
          <div className="flex items-center justify-center p-4">
            <Line data={data} options={options} />
          </div>
        </div>
      </div>
  );
};

export default MonthHourAverage;