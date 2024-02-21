import React from 'react';
import WeekStats from '../components/weekComponents/WeekStats'
import CountPerWeekGraph from '../components/weekComponents/CountWeekWebsiteGraph';
import WeekHourAverage from '../components/weekComponents/BusiestHourWeekGraph';
import MostVisitedWebsiteGraph from '../components/weekComponents/MostVisitedUrlWeekGraph';

const PastWeek = () => {
  console.clear();
  return (
    <div>
      <WeekStats/>
      <CountPerWeekGraph/>
      <WeekHourAverage/>
      <MostVisitedWebsiteGraph/>
    </div>
  );
};

export default PastWeek;