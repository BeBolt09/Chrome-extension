import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, LinearScale, CategoryScale } from 'chart.js/auto';

const CountPerWeekGraph = () => {
  const [pastWeekCount, setPastWeekCount] = useState(0);
  const [week1Count, setWeek1Count] = useState(0);
  const [week2Count, setWeek2Count] = useState(0);
  const [week3Count, setWeek3Count] = useState(0);
  const [week4Count, setWeek4Count] = useState(0);

  const fetchUrlCountForWeek = (weekOffset, setCount) => {
    const currentTime = new Date().getTime();
    let startTime;
    let endTime;

    switch (weekOffset) {
      case 0:
        // Current week (past week)
        startTime = currentTime - 7 * 24 * 60 * 60 * 1000;
        endTime = currentTime;
        break;
      case 1:
        // Week - 1
        startTime = currentTime - 3 * 7 * 24 * 60 * 60 * 1000;
        endTime = currentTime - 2 * 7 * 24 * 60 * 60 * 1000;
        break;
      case 2:
        // Week - 2
        startTime = currentTime - 4 * 7 * 24 * 60 * 60 * 1000;
        endTime = currentTime - 3 * 7 * 24 * 60 * 60 * 1000;
        break;
      case 3:
        // Week - 3
        startTime = currentTime - 5 * 7 * 24 * 60 * 60 * 1000;
        endTime = currentTime - 4 * 7 * 24 * 60 * 60 * 1000;
        break;
      case 4:
        // Week - 4
        startTime = currentTime - 6 * 7 * 24 * 60 * 60 * 1000;
        endTime = currentTime - 5 * 7 * 24 * 60 * 60 * 1000;
        break;
      default:
        break;
    }

    chrome.history.search({ text: '', startTime, endTime, maxResults: 10000 }, (historyItems) => {
      const totalCount = historyItems.length;
      setCount(totalCount);
      sendVisitedCount(`Week - ${weekOffset}`, totalCount);
    });
  };

  useEffect(() => {
    fetchUrlCountForWeek(4, setPastWeekCount);
    fetchUrlCountForWeek(3, setWeek1Count);
    fetchUrlCountForWeek(2, setWeek2Count);
    fetchUrlCountForWeek(1, setWeek3Count);
    fetchUrlCountForWeek(0, setWeek4Count);
  }, []);

  Chart.register(LinearScale, CategoryScale);

  const currentDate = new Date();
  const currentDayOfWeek = currentDate.getDay();
  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(currentDate.getDate() - currentDayOfWeek);
  const startOfPreviousWeeks = [];
  for (let i = 1; i <= 4; i++) {
    const startOfPreviousWeek = new Date(startOfWeek);
    startOfPreviousWeek.setDate(startOfWeek.getDate() - 7 * i);
    startOfPreviousWeeks.push(startOfPreviousWeek);
  }
  const labels = startOfPreviousWeeks.map((startOfWeek, index) => {
      const formattedDate = startOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      return `${formattedDate}`;
  });
  labels.reverse();
  labels.push('Current week');

  const data = {
    labels,
    datasets: [
      {
        label: '# of websites visited per day',
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'black',
        hoverBackgroundColor: 'rgba(75,192,192,0.4)',
        data: [pastWeekCount,week1Count,week2Count,week3Count,week4Count]
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
    <div className="bg-white pt-24 pb-0 sm:py-32">
      <dt className='text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl'>Number of Websites Opened In the Past 5 Weeks</dt>
      <div className="mx-auto w-3/4 px-6 lg:px-8 border-3 border-black rounded-lg">
        <div className="flex items-center justify-center p-4">
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>

  );
};

export default CountPerWeekGraph;