import React from 'react'
import './Team.css'

const team = () => {
  return (
     <section className="about-section">
        <div className="container">
          <h2>Who we are?</h2>
          <p className="about-description">
            We believe every success story deserves to be heard. Our platform connects achievers 
            from all walks of life, creating a community of inspiration and motivation.
          </p>
          
          <div className="team-grid">
            <div className="team-member">
              <div className="member-image">
                <img src="/bhavy.png" alt="Team Member 1" />
              </div>
              <h3>Bhavy Sharma</h3>
              <p>MERN Stack Developer</p>
              <p>Passionate about empowering people to share their achievements and inspire others.</p>
            </div>
            
            <div className="team-member">
              <div className="member-image">
                <img src="/Sakshi.png" alt="Team Member 2" />
              </div>
              <h3>Sakshi Jain</h3>
              <p>MERN Stack Developer</p>
              <p>Tech enthusiast dedicated to building platforms that connect and inspire communities.</p>
            </div>
          </div>
        </div>
      </section>
  )
}

export default team
