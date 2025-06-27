import React from "react";
import "./ContactForm.css";

const ContactForm = () => {
  return (
    <div className="story-form-container">
      <h2>Connect With Us... With Your Stories and a Helpful Message</h2>
      <form>
        <input type="text" placeholder="Name..." required />
        <input type="text" placeholder="Email/Phone..." required />
        <textarea rows="6" placeholder="Your Story..." required></textarea>
        <button type="submit">Submit Story</button>
      </form>
    </div>
  );
};

export default ContactForm;
