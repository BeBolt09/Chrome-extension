import React, { useState, useEffect } from 'react';

const WebsiteCounter = () => {
  const [pastWeekCount, setPastWeekCount] = useState(0);
  const [week1Count, setWeek1Count] = useState(0);
  const [week2Count, setWeek2Count] = useState(0);
  const [week3Count, setWeek3Count] = useState(0);
  const [week4Count, setWeek4Count] = useState(0);

  const fetchUrlCountForWeek = (weekOffset, setCount) => {
    const currentTime = new Date().getTime();
    let startTime;
    let endTime;

    switch (weekOffset) {
      case 0:
        // Current week (past week)
        startTime = currentTime - 7 * 24 * 60 * 60 * 1000;
        endTime = currentTime;
        break;
      case 1:
        // Week - 1
        startTime = currentTime - 3 * 7 * 24 * 60 * 60 * 1000;
        endTime = currentTime - 2 * 7 * 24 * 60 * 60 * 1000;
        break;
      case 2:
        // Week - 2
        startTime = currentTime - 4 * 7 * 24 * 60 * 60 * 1000;
        endTime = currentTime - 3 * 7 * 24 * 60 * 60 * 1000;
        break;
      case 3:
        // Week - 3
        startTime = currentTime - 5 * 7 * 24 * 60 * 60 * 1000;
        endTime = currentTime - 4 * 7 * 24 * 60 * 60 * 1000;
        break;
      case 4:
        // Week - 4
        startTime = currentTime - 6 * 7 * 24 * 60 * 60 * 1000;
        endTime = currentTime - 5 * 7 * 24 * 60 * 60 * 1000;
        break;
      default:
        break;
    }

    chrome.history.search({ text: '', startTime, endTime, maxResults: 10000 }, (historyItems) => {
      const totalCount = historyItems.length;
      setCount(totalCount);
    });
  };

  useEffect(() => {
    fetchUrlCountForWeek(4, setPastWeekCount);
    fetchUrlCountForWeek(3, setWeek1Count);
    fetchUrlCountForWeek(2, setWeek2Count);
    fetchUrlCountForWeek(1, setWeek3Count);
    fetchUrlCountForWeek(0, setWeek4Count);
  }, []);

  return (
    <div>
      {week4Count}
    </div>
  );
};

export default WebsiteCounter;
