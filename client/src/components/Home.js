import React from 'react';
import './Home.scss';

import Navbar from './Navbar';
import CurrentDate from './CurrentDate';
import ChoiceBar from './ChoiceBar';
import Reason from './Reason';
import ReasonEditor from './ReasonEditor';
import Stats from './Stats';
import Attendance from './Attendance';
import Footer from './Footer';

const Home = () => {
  return (
    <div className="Home">
      <Navbar />
      <div className="container">
        <div className="info-bar">
          <CurrentDate />
          <ChoiceBar />
        </div>
        <div className="reason-bar">
          <Reason />
          <ReasonEditor />
        </div>
        <Stats />
        <Attendance />        
      </div>
      <Footer />
    </div>
  );
};

export default Home;