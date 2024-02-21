import React from 'react';
import StatsOfTheDay from '../components/dayComponents/TodayStats';
import MostVisitedWebsiteGraph from '../components/dayComponents/MostVisitedWebsitesGraph';
import BarChart from '../components/dayComponents/VisitsInThePast5Days';
import LineChart from '../components/dayComponents/HourlyCountGraph';


const Today = () => {
  return (
    <div>
      <StatsOfTheDay/>
      <BarChart/>
      <LineChart/>
      <MostVisitedWebsiteGraph/>
    </div>
  );
};

export default Today;