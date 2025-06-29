import React from "react";
import "./CommunityCards.css";

const CommunityCards = () => {
  return (
    <div className="community-wrapper">
      <div className="community-card">
        <h2>Join Our WhatsApp Community</h2>
        <p>Become a part of our small and growing community on WhatsApp. Stay updated and connect with like-minded people!</p>
        <a href="https://chat.whatsapp.com/DtDNk5dWJF2HL2Fx1s9aOT" target="_blank" rel="noopener noreferrer">
          <button className="btn-join">Join Now</button>
        </a>
      </div>

      <div className="community-card">
        <h2>Follow us on Instagram Community</h2>
        <p>Become a part of our small and growing community on WhatsApp. Stay updated and connect with like-minded people!</p>
        <a href="https://www.instagram.com/navokta?utm_source=qr&igsh=MTEzaTFxb2hxczc1Yw==" target="_blank" rel="noopener noreferrer">
          <button className="btn-join">Join Now</button>
        </a>
      </div>
    </div>
  );
};

export default CommunityCards;
