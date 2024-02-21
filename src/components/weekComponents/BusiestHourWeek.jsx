// src/components/BusiestHour.jsx
import React, { useState, useEffect } from 'react';

const BusiestHour = () => {
  const [busiestHour, setBusiestHour] = useState(null);

  useEffect(() => {
    const currentTime = new Date().getTime();
    const startTime = currentTime - 7 * 24 * 60 * 60 * 1000;

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

      // Calculate the average visits per hour and round to two decimals
      const averageVisitsPerHour = hourlyTotals.map((total) => (total / 7).toFixed(2));

      // Log the array with the rounded average visits per hour
      console.log('Average Visits Per Hour of the Week:', averageVisitsPerHour);
      fetch('https://backend-for-chrome-extension.onrender.com/week-hours-average', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(averageVisitsPerHour),
      })
        .then((response) => response.json())
        .then((data) => console.log('Response:', data))
        .catch((error) => {
          console.error('Error:', error);
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