import React, { useState, useEffect } from 'react';

const MostVisitedUrl = () => {
  const [mostVisitedUrl, setMostVisitedUrl] = useState('');

  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const startTime = today.getTime();

    chrome.history.search({ text: '', startTime, maxResults: 0 }, (historyItems) => {
      const domainCountMap = historyItems.reduce((acc, item) => {
        const url = new URL(item.url);
        const baseDomain = url.hostname.replace(/^www\./, '');
        acc[baseDomain] = (acc[baseDomain] || 0) + 1;
        return acc;
      }, {});

      const sortedEntries = Object.entries(domainCountMap).sort(([, a], [, b]) => b - a);
      const mostVisitedDomain = sortedEntries[0][0];
      setMostVisitedUrl(`${mostVisitedDomain}`);
    });
  }, []);

  return (
    <div>
      {mostVisitedUrl}
    </div>
  );
};

export default MostVisitedUrl;