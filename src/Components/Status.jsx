import React, { useEffect, useState } from 'react';
import './Status.css';

const Status = () => {
  const [stats, setStats] = useState({ totalUsers: 0, totalStories: 0 });

  useEffect(() => {
    fetch('http://localhost:5000/api/stats')
      .then(res => res.json())
      .then(data => {
        setStats(data);
      })
      .catch(err => {
        console.error("Failed to load stats", err);
      });
  }, []);

  return (
    <section className="stats-section">
      <div className="container">
        <h2>Our Achievement</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <h3>{stats.totalUsers}</h3>
            <p>Total Views</p>
          </div>
          <div className="stat-card">
            <h3>{stats.totalStories}</h3>
            <p>Total Stories</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Status;
