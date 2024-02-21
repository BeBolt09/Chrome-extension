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
      setMostVisitedUrl(mostVisitedDomain);

    });
  }, []);

  return (
    <div>
      {mostVisitedUrl}
    </div>
  );
};

export default MostVisitedUrl;
