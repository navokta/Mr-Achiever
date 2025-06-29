import React from "react";
import "./ProfileModal.css";

const ProfileModal = ({ story, onClose }) => {
  if (!story) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>×</button>
        <img src={story.image || "/default-user.jpg"} alt="Profile" className="profile-img" />
        <h2 className="profile-name">{story.name}</h2>
        <p className="profile-role">{story.role || "President"}</p>
        <p className="profile-description">{story.story}</p>
        <button className="close-profile" onClick={onClose}>Close Profile</button>
      </div>
    </div>
  );
};

export default ProfileModal;
