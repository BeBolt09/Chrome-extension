import React, { useState, useEffect } from 'react';

const WebsiteCounter = () => {
  const [week4Count, setWeek4Count] = useState(0);

  useEffect(() => {
    const currentTime = new Date().getTime();

    let startTime = currentTime - 30 * 24 * 60 * 60 * 1000;
    let endTime = currentTime;
    chrome.history.search({ text: '', startTime, endTime, maxResults: 10000 }, (historyItems) => {
      const totalCount = historyItems.length;
      setWeek4Count(totalCount)
    });

  }, []);

  return (
    <div>
      {week4Count}
    </div>
  );
};

export default WebsiteCounter;