import React, { useEffect } from 'react';
import useVisitedUrls from '../../custom-hooks/visitedUrls';

const NumVisited = () => {
  const visitedCounts = useVisitedUrls();
  const todayCount = visitedCounts.today;

  const postVisitedCount = (json) => {
    fetch('https://backend-for-chrome-extension.onrender.com/api/visited-count', {
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
    const currentDate = new Date();

    const getDayName = (offset) => {
      const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const dayIndex = (currentDate.getDay() - offset + 7) % 7;
      return dayNames[dayIndex];
    };

    
    for (let i = 4; i >= 1; i--) {
      setTimeout(function() {
        const dayName = getDayName(i);
        const count = visitedCounts[`dayMinus${i}`];
        sendVisitedCount(dayName, count);
      }, 25)
    }
    
    setTimeout(function() {
      sendVisitedCount('Today', todayCount);
    }, 80);

  }, [visitedCounts, todayCount]);

  return (
    <div>
      {todayCount}
    </div>
  );
};

export default NumVisited;