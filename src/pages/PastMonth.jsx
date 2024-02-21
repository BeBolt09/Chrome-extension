import React from 'react';
import MonthStats from '../components/monthComponents/MonthStats';
import MostVisitedWebsiteGraph from '../components/monthComponents/MostVisitedUrlMonthGraph';
import MonthHourAverage from '../components/monthComponents/BusiestHourMonthGraph';
import CountPerMonthGraph from '../components/monthComponents/CountMonthWebsiteGraph';


const PastMonth = () => {
  return (
    <div>
      <MonthStats/>
      <CountPerMonthGraph/>
      <MonthHourAverage/>
      <MostVisitedWebsiteGraph/>
    </div>
  );
};

export default PastMonth;