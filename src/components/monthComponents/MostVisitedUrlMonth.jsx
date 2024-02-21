import React, { useState, useEffect } from 'react';

const MostVisitedUrl = () => {
  const [mostVisitedUrl, setMostVisitedUrl] = useState('');

  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const endTime = today.getTime();  // Current time

    // Calculate start time for the past month (30 days ago)
    const startTime = endTime - (30 * 24 * 60 * 60 * 1000);

    chrome.history.search({ text: '', startTime, endTime, maxResults: 0 }, (historyItems) => {
      const domainCountMap = historyItems.reduce((acc, item) => {
        const url = new URL(item.url);
        const baseDomain = url.hostname.replace(/^www\./, '');

        // Exclude "google.com" from the results
        if (baseDomain.toLowerCase() !== 'google.com') {
          acc[baseDomain] = (acc[baseDomain] || 0) + 1;
        }

        return acc;
      }, {});

      const sortedEntries = Object.entries(domainCountMap).sort(([, a], [, b]) => b - a);
      const mostVisitedDomain = sortedEntries[0] ? sortedEntries[0][0] : '';

      // Log the top 10 most popular websites with visit counts
      const top10 = sortedEntries.slice(0, 10);
      console.log('Top 10 Most Popular Websites:', top10);

      const jsonArray = top10.map(([url, count]) => ({ url, count }));
      console.log(jsonArray);

      setMostVisitedUrl(mostVisitedDomain);

      fetch('https://backend-for-chrome-extension.onrender.com/receive-visited-websites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonArray),
      })
        .then(response => response.json())
        .then(data => console.log('Server response:', data))
        .catch(error => console.error('Error sending data to server:', error));

    });
  }, []);

  return (
    <div>
      {mostVisitedUrl}
    </div>
  );
};

export default MostVisitedUrl;
