import React from 'react';
import './Home.css'
import Blocklist from '../components/Blocklist';
import DnsToggle from '../components/DnsToggle';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <DnsToggle />
      <div className="activity card">Activity Chart Here</div>
      <Blocklist />
      <div className="reminders card">Reminders Here</div>
    </div>
  );
};

export default Dashboard;
