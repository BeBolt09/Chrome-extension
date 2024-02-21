// src/components/BusiestHour.jsx
import React, { useState, useEffect } from 'react';

const BusiestHour = () => {
  const [busiestHour, setBusiestHour] = useState(null);

  useEffect(() => {
    const currentTime = new Date().getTime();
    const startTime = currentTime - 30 * 24 * 60 * 60 * 1000;

    chrome.history.search({ text: '', startTime, maxResults: 10000 }, (historyItems) => {
      // Create an array to store counts for each hour (24 hours)
      const hourlyCounts = new Array(24).fill(0);

      // Count visits for each hour
      historyItems.forEach((item) => {
        const visitTime = new Date(item.lastVisitTime);
        const hour = visitTime.getHours();
        hourlyCounts[hour]++;
      });

      // Create an array to store the total counts for each hour
      const hourlyTotals = new Array(24).fill(0);

      // Count total visits for each hour over the week
      historyItems.forEach((item) => {
        const visitTime = new Date(item.lastVisitTime);
        const hour = visitTime.getHours();
        hourlyTotals[hour]++;
      });

      // Find the busiest hour
      const maxCount = Math.max(...hourlyCounts);
      const busiestHourIndex = hourlyCounts.indexOf(maxCount);

      // Update state with the busiest hour (using 12-hour format)
      setBusiestHour(`${busiestHourIndex % 12 || 12} ${busiestHourIndex < 12 ? 'AM' : 'PM'}`);
    });
  }, []);

  return (
    <div>
      {busiestHour}
    </div>
  );
};

export default BusiestHour;