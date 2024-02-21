import { useEffect, useState } from 'react';

const useVisitedUrls = () => {
  const [visitedCounts, setVisitedCounts] = useState({
    today: 0,
    dayMinus1: 0,
    dayMinus2: 0,
    dayMinus3: 0,
    dayMinus4: 0,
  });

  useEffect(() => {
    const getVisitedURLs = async () => {
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);

      const dateRanges = [
        { key: 'today', date: currentDate },
        { key: 'dayMinus1', date: new Date(currentDate.getTime() - 24 * 60 * 60 * 1000) },
        { key: 'dayMinus2', date: new Date(currentDate.getTime() - 2 * 24 * 60 * 60 * 1000) },
        { key: 'dayMinus3', date: new Date(currentDate.getTime() - 3 * 24 * 60 * 60 * 1000) },
        { key: 'dayMinus4', date: new Date(currentDate.getTime() - 4 * 24 * 60 * 60 * 1000) },
      ];

      const promises = dateRanges.map(({ key, date }) => {
        return new Promise((resolve) => {
          chrome.history.search(
            {
              text: '',
              startTime: date.getTime(),
              endTime: new Date(date.getTime() + 24 * 60 * 60 * 1000).getTime(),
              maxResults: 0,
            },
            (historyItems) => {
              const uniqueURLs = new Set();

              historyItems.forEach((item) => {
                uniqueURLs.add(item.url);
              });

              const uniqueURLsArray = Array.from(uniqueURLs);

              resolve({ key, count: uniqueURLsArray.length });
            }
          );
        });
      });

      const results = await Promise.all(promises);

      const counts = results.reduce((acc, { key, count }) => {
        acc[key] = count;
        return acc;
      }, {});

      setVisitedCounts((prev) => ({ ...prev, ...counts }));
    };

    getVisitedURLs();
  }, []);

  return visitedCounts;
};

export default useVisitedUrls;
