import React, { useEffect, useState } from 'react';
import './DnsToggle.css';

const DnsToggle = () => {
  const [runningMessage, setRunningMessage] = useState(false);
  const [runningState,setRunningState] = useState("")

  async function fetchStatus() {
    const resp = await fetch('http://3.7.180.250:8080/status');
    const data = await resp.json();
    setRunningState(data.serverStatus)
  }

  useEffect(() => {
    fetchStatus()
  }, [])
  return (
    <div className="toggle-container card">
      <span className={!runningState ? 'running' : 'stopped'}>
        DNS Server is {!runningState ? 'UP':'DOWN'}
      </span>
    </div>
  );
};

export default DnsToggle;
