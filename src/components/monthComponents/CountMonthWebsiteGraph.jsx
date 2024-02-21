import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

const CountPerMonthGraph = () => {

  const [lastMonth,setLastMonth] = useState(0);
  const [currentMonth,setCurrentMonth] = useState(0);

  useEffect(() => {
    const currentTime = new Date().getTime();

    let startTime = currentTime - 60 * 24 * 60 * 60 * 1000;
    let endTime = currentTime - 30 * 24 * 60 * 60 * 1000;
    chrome.history.search({ text: '', startTime, endTime, maxResults: 10000 }, (historyItems) => {
      const lastMonthCount = historyItems.length;
      setLastMonth(lastMonthCount)
    })

    startTime = currentTime - 30 * 24 * 60 * 60 * 1000;
    endTime = currentTime;
    chrome.history.search({ text: '', startTime, endTime, maxResults: 10000 }, (historyItems) => {
      const totalCount = historyItems.length;
      setCurrentMonth(totalCount)
    });

  }, []);
  const labels = ["Last Month","Current Month"];
  const dataPoints=[lastMonth,currentMonth];
  const data = {
    labels,
    datasets: [
      {
        label: '# of websites visited',
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'black',
        hoverBackgroundColor: 'rgba(75,192,192,0.4)',
        data: dataPoints,
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
      <dt className='text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl'>Websites visited in the past two months</dt>
      <div className="mx-auto w-3/4 px-6 lg:px-8 border-3 border-black rounded-lg">
        <div className="flex items-center justify-center p-4">
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>

  );
};

export default CountPerMonthGraph;