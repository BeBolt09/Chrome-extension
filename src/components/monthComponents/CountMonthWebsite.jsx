import React, { useState, useEffect } from 'react';

const WebsiteCounter = () => {
  const [week3Count, setWeek3Count] = useState(0);
  const [week4Count, setWeek4Count] = useState(0);

  const postVisitedCount = (json) => {
    fetch('https://backend-for-chrome-extension.onrender.com/week-url-count', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(json),
    })
      .then((response) => response.json())
      .then((data) => console.log('Response:', data))
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const sendVisitedCount = (page, count) => {
    const json = {
      page,
      count,
    };
    postVisitedCount(json);
  };

  useEffect(() => {
    const currentTime = new Date().getTime();

    let startTime = currentTime - 60 * 24 * 60 * 60 * 1000;
    let endTime = currentTime - 30 * 24 * 60 * 60 * 1000;
    chrome.history.search({ text: '', startTime, endTime, maxResults: 10000 }, (historyItems) => {
      const lastMonthCount = historyItems.length;
      sendVisitedCount(`Last month`, lastMonthCount);
    })

    startTime = currentTime - 30 * 24 * 60 * 60 * 1000;
    endTime = currentTime;
    chrome.history.search({ text: '', startTime, endTime, maxResults: 10000 }, (historyItems) => {
      const totalCount = historyItems.length;
      setWeek4Count(totalCount)
      sendVisitedCount(`Current Month`, totalCount);
    });

  }, []);

  return (
    <div>
      {week4Count}
    </div>
  );
};

export default WebsiteCounter;