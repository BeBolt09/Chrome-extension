import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MostVisitedWebsiteGraph = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const endTime = today.getTime();

    // Calculate start time for the past week (7 days ago)
    const startTime = endTime - (7 * 24 * 60 * 60 * 1000);

    chrome.history.search({ text: '', startTime, endTime, maxResults: 0 }, (historyItems) => {
      const domainCountMap = historyItems.reduce((acc, item) => {
        const url = new URL(item.url);
        const baseDomain = url.hostname.replace(/^www\./, '');
        if (baseDomain.toLowerCase() !== 'google.com') {
          acc[baseDomain] = (acc[baseDomain] || 0) + 1;
        }

        return acc;
      }, {});

      const sortedEntries = Object.entries(domainCountMap).sort(([, a], [, b]) => b - a);
      const mostVisitedDomain = sortedEntries[0] ? sortedEntries[0][0] : '';

      // Log the top 10 most popular websites with visit counts
      const top10 = sortedEntries.slice(0, 10);
      const urls = top10.map(([url]) => url);
      const counts = top10.map(([, count]) => count);

      const chartData = {
        labels: urls,
        datasets: [
          {
            label: '# of visits',
            data: counts,
            borderColor: 'black',
            backgroundColor: 'black',
          },
        ],
      };
      setData(chartData);
    });
  }, []);

  const options = {
    indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Top 10 Most Visited Websites Today',
      },
    },
  };

  return (
        <div className="bg-white pt-24 pb-20 sm:py-32">
        <dt className='text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl'>Top 10 Most Visited Websites in the past Week</dt>
        <div className="mx-auto w-3/4 px-6 lg:px-8 border-3 border-black rounded-lg">
          <div className="flex items-center justify-center p-4">
            {data && <Bar options={options} data={data} />}
          </div>
        </div>
      </div>
  );
};

export default MostVisitedWebsiteGraph;