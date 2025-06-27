import React, { useState } from 'react';
import './Teamcore.css';
import mamImg from '../../src/assets/mam.jpg';
import bhavyImg from '../../src/assets/bhavy.jpg';
import sakshiImg from '../../src/assets/Sakshi.png';
import bhumiImg from '../../src/assets/bhumi.png';
import kratakshiImg from '../../src/assets/kratakshi.png';
import fazalImg from '../../src/assets/fazal.png'
import abhinavImg from '../../src/assets/abhinav.jpg';

// const placeholderImg = 'https://via.placeholder.com/150';

const Teamcore = () => {
  const [activeProfile, setActiveProfile] = useState(null);

  const teamMembers = [
    {
      id: 1,
      name: "Richa Dixit",
      position: "President",
      image: mamImg,
      summary: "Yaha ayagi summary.",
      fullDescription: "Yaha ayaga description"
    },
    {
      id: 2,
      name: "Bhavy Sharma",
      position: "President",
      image: bhavyImg,
      summary: "Yaha ayagi summary.",
      fullDescription: "Yaha ayaga description"
    },
    {
      id: 3,
      name: "Sakshi Jain",
      position: "President",
      image: sakshiImg,
      summary: "Yaha ayagi summary.",
      fullDescription: "Yaha ayaga description"
    },
    {
      id: 4,
      name: "Bhumi Singhal",
      position: "President",
      image: bhumiImg,
      summary: "Yaha ayagi summary.",
      fullDescription: "Yaha ayaga description"
    },
    {
      id: 5,
      name: "Abhinav Kaushik",
      position: "Preside7nt",
      image: abhinavImg,
      summary: "Yaha ayagi summary.",
      fullDescription: "Yaha ayaga description"
    },
    {
      id: 6,
      name: "Kratakshi Bhardwaj",
      position: "President",
      image: kratakshiImg,
      summary: "Yaha ayagi summary.",
      fullDescription: "Yaha ayaga description"
    },
     {
      id: 7,
      name: "Mohd. Fazal Ali",
      position: "President",
      image: fazalImg,
      summary: "Yaha ayagi summary.",
      fullDescription: "Yaha ayaga description"
    }
    // ... other team members
  ];

  return (
    <div className="team-core-container">
      <h1 className="team-core-title">OUR CORE TEAM</h1>
      
      <div className="team-core-members">
        {teamMembers.map((member) => (
          <div key={member.id} className="team-core-card">
            <div className="team-core-img-circle">
              <img src={member.image} alt={member.name} className="team-core-circle-img" />
            </div>
            <div className="team-core-info">
              <h2 className="team-core-name">{member.name}</h2>
              <h3 className="team-core-position">{member.position}</h3>
              <p className="team-core-summary">{member.summary}</p>
              <div className="team-core-btn-container">
                <button 
                  className="team-core-profile-btn"
                  onClick={() => setActiveProfile(member)}
                >
                  View Profile
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {activeProfile && (
        <div className="team-core-modal">
          <div className="team-core-modal-overlay" onClick={() => setActiveProfile(null)}></div>
          <div className="team-core-modal-content">
            <button className="team-core-close-btn" onClick={() => setActiveProfile(null)}>
              &times;
            </button>
            
            <div className="team-core-modal-header">
              <div className="team-core-modal-img-container">
                <img 
                  src={activeProfile.image} 
                  alt={activeProfile.name} 
                  className="team-core-modal-img"
                />
              </div>
              <div className="team-core-modal-title">
                <h2 className="team-core-modal-name">{activeProfile.name}</h2>
                <h3 className="team-core-modal-position">{activeProfile.position}</h3>
              </div>
            </div>
            
            <div className="team-core-modal-body">
              <p className="team-core-modal-description">{activeProfile.fullDescription}</p>
            </div>
            
            <div className="team-core-modal-footer">
              <button className="team-core-modal-close-btn" onClick={() => setActiveProfile(null)}>
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Teamcore;