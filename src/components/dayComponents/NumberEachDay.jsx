import React, { useEffect } from 'react';
import useVisitedUrls from '../../custom-hooks/visitedUrls';

const NumVisited = () => {
  const visitedCounts = useVisitedUrls();
  const todayCount = visitedCounts.today;

  return (
    <div>
      {todayCount}
    </div>
  );
};

export default NumVisited;