import React, { useEffect, useState } from 'react';

const BusiestTime = () => {
  const [busiestHour, setBusiestHour] = useState(null);

  useEffect(() => {
    let currentDate = new Date();

    currentDate.setHours(0, 0, 0, 0);
    let startTime = currentDate.getTime();

    chrome.history.search({ text: '', startTime, maxResults: 1000 }, function (data) {
      
        console.log("Browsing history data:", data);

        // Process the history data
        if (!data || data.length === 0) {
          throw new Error("No browsing history found");
        }

        let urlTimestamps = data.map(item => ({ url: item.url, timestamp: item.lastVisitTime }));
        console.log("URL timestamps:", urlTimestamps);

        let groupedByTime = {};
        urlTimestamps.forEach(item => {
          let hour = new Date(item.timestamp).getHours();
          groupedByTime[hour] = groupedByTime[hour] ? [...groupedByTime[hour], item.url] : [item.url];
        });
        console.log("Grouped by time:", groupedByTime);

        // Find the busiest time
        let busiestTime = Object.keys(groupedByTime).reduce((max, key) => {
          return groupedByTime[key].length > groupedByTime[max].length ? key : max;
        }, Object.keys(groupedByTime)[0]);

        setBusiestHour(busiestTime);
    });
  }, []);

  const formatTime = (hour) => {
    const formattedHour = hour % 12 || 12; // Convert to 12-hour format
    const ampm = hour < 12 ? 'AM' : 'PM';
    return `${formattedHour}${ampm}`;
  };

  return (
    <div>
        {formatTime(busiestHour)}
    </div>
  );
};

export default BusiestTime;