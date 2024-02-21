import React, {useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomNavbar from './components/Navbar';
import Today from './pages/Today';
import PastWeek from './pages/PastWeek'
import PastMonth from './pages/PastMonth';
import BetaMessage from './components/BetaMessage';


function App() {

  const [isTodayVisible, setTodayIsVisible] = useState(true);
  const [isWeekVisible, setWeekIsVisible] = useState(false);
  const [isMonthVisible, setMonthIsVisible] = useState(false);
  const [isBetaMessageVisible, setBetaMessageIsVisible] = useState(false);
  const seeToday = () => {
    setTodayIsVisible(() => true);
    setWeekIsVisible(() => false);
    setMonthIsVisible(()=>false);
    setBetaMessageIsVisible(()=>false)
  };
  const seePastWeek = () => {
    setTodayIsVisible(()=>false);
    setWeekIsVisible(()=>true);
    setMonthIsVisible(()=>false);
    setBetaMessageIsVisible(()=>false)
  }
  const seePastMonth = () => {
    setTodayIsVisible(()=>false);
    setWeekIsVisible(()=>false);
    setMonthIsVisible(()=>true);
    setBetaMessageIsVisible(()=>false)
  }
  const seeBetaMessage = () => {
    setTodayIsVisible(()=>false);
    setWeekIsVisible(()=>false);
    setMonthIsVisible(()=>false);
    setBetaMessageIsVisible(()=>true)
  }

  return (
    <>
      <div>
        <CustomNavbar seeToday={seeToday} seePastWeek={seePastWeek} seePastMonth={seePastMonth} seeBetaMessage={seeBetaMessage}/>
        {isTodayVisible && <Today />}
        {isWeekVisible && <PastWeek/>}
        {isMonthVisible && <PastMonth/>}
        {isBetaMessageVisible && <BetaMessage/>}
      </div>
    </>
  );
}

export default App;
