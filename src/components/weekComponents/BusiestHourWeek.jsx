// src/components/BusiestHour.jsx
import React, { useState, useEffect } from 'react';

const BusiestHour = () => {
  const [busiestHour, setBusiestHour] = useState(null);

  useEffect(() => {
    const currentTime = new Date().getTime();
    const startTime = currentTime - 7 * 24 * 60 * 60 * 1000;

    chrome.history.search({ text: '', startTime, maxResults: 10000 }, (historyItems) => {
      const hourlyCounts = new Array(24).fill(0);

      historyItems.forEach((item) => {
        const visitTime = new Date(item.lastVisitTime);
        const hour = visitTime.getHours();
        hourlyCounts[hour]++;
      });
      const hourlyTotals = new Array(24).fill(0);
      
      historyItems.forEach((item) => {
        const visitTime = new Date(item.lastVisitTime);
        const hour = visitTime.getHours();
        hourlyTotals[hour]++;
      });
      
      const maxCount = Math.max(...hourlyCounts);
      const busiestHourIndex = hourlyCounts.indexOf(maxCount);
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