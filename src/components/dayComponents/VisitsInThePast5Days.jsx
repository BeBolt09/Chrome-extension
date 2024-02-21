import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, LinearScale, CategoryScale } from 'chart.js/auto';

const BarChart = () => {
  const [visitedCounts, setVisitedCounts] = useState({
    today: 0,
    previousDays: Array.from({ length: 4 }, (_, i) => ({
      key: `dayMinus${i}`,
      date: new Date(new Date().getTime() - (i + 1) * 24 * 60 * 60 * 1000),
      count: 0,
    })),
  });

  useEffect(() => {
    const getVisitedURLs = async () => {
      const promises = visitedCounts.previousDays.map(({ key, date }) => {
        return new Promise((resolve) => {
          chrome.history.search(
            {
              text: '',
              startTime: date.getTime(),
              endTime: new Date(date.getTime() + 24 * 60 * 60 * 1000).getTime(),
              maxResults: 0,
            },
            (historyItems) => {
              if (Array.isArray(historyItems)) {
                const uniqueURLs = new Set();

                historyItems.forEach((item) => {
                  uniqueURLs.add(item.url);
                });

                resolve({ key, count: uniqueURLs.size });
              } else {
                console.error('Unexpected data returned from chrome.history.search:', historyItems);
                resolve({ key, count: 0 });
              }
            }
          );
        });
      });

      const results = await Promise.all(promises);

      const counts = results.reduce((acc, { key, count }) => {
        acc[key] = count;
        return acc;
      }, {});

      setVisitedCounts((prev) => ({
        ...prev,
        previousDays: prev.previousDays.map((day) => ({
          ...day,
          count: counts[day.key] || 0,
        })),
      }));

      // Calculate count for today
      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);
      const todayEnd = new Date();
      const todayPromises = [
        new Promise((resolve) => {
          chrome.history.search(
            {
              text: '',
              startTime: todayStart.getTime(),
              endTime: todayEnd.getTime(),
              maxResults: 0,
            },
            (historyItems) => {
              if (Array.isArray(historyItems)) {
                resolve(historyItems.length);
              } else {
                console.error('Unexpected data returned from chrome.history.search:', historyItems);
                resolve(0);
              }
            }
          );
        }),
      ];
      const todayCount = await Promise.all(todayPromises);

      setVisitedCounts((prev) => ({ ...prev, today: todayCount[0] }));
    };

    getVisitedURLs();
  }, []);

  Chart.register(LinearScale, CategoryScale);

  const labels = ['Today', ...visitedCounts.previousDays.map((day) => day.date.toLocaleDateString('en-US', { weekday: 'long' }))].reverse();

  const data = {
    labels,
    datasets: [
      {
        label: '# of websites visited per day',
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'black',
        hoverBackgroundColor: 'rgba(75,192,192,0.4)',
        data: [visitedCounts.today, ...visitedCounts.previousDays.map((day) => day.count)].reverse(),
      },
    ],
  };

  const options = {
    scales: {
      y: {
        type: 'linear',
        beginAtZero: true,
      },
      x: {
        type: 'category',
      },
    },
  };

  return (
  <>
    <div className="bg-white pt-24 pb-0 sm:py-32">
      <dt className='text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl'>Number of Websites Opened In the Past 5 Days</dt>
      <div className="mx-auto w-3/4 px-6 lg:px-8 border-3 border-black rounded-lg">
        <div className="flex items-center justify-center p-4">
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  </>
  );
};

export default BarChart;
