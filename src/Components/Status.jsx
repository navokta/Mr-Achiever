import React from 'react'
import { useState } from 'react';
import './Status.css'

const Status = () => {
     const [stats, setStats] = useState({ totalUsers: 0, totalStories: 0 });
  return (
     <section className="stats-section">
        <div className="container">
          <h2>Number Crunch</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <h3>{stats.totalUsers}</h3>
              <p>Registered Users</p>
            </div>
            <div className="stat-card">
              <h3>{stats.totalStories}</h3>
              <p>Success Stories</p>
            </div>
          </div>
        </div>
      </section>
  )
}

export default Status
