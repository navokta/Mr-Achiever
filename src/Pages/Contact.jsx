import React, { useRef, useState } from 'react';
import CommunityCards from '../Components/CommunityCards';
import FloatingActionButton from '../Components/FloatingActionButton';
import './Contact.css'; // ✅ Import the external stylesheet

const Contact = () => {
  const formRef = useRef(null);
  const [msg, setMsg] = useState('');
  const scriptURL = 'https://script.google.com/macros/s/AKfycbwm1V-5_PekJRDnmq7SC3A0xWdYPIpeGvLh23tqi9tzP3esirxGiOF_zIlXVO8590qPXQ/exec';

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(scriptURL, {
      method: 'POST',
      body: new FormData(formRef.current),
    })
      .then(() => {
        console.log('Success!');
        setMsg('✅ Message sent!');
        setTimeout(() => setMsg(''), 4000);
        formRef.current.reset();
      })
      .catch((error) => {
        console.error('Error!', error.message);
        setMsg('❌ Error sending message.');
      });
  };

  return (
    <div className="contact-page">
      <header className="contact-header">
        <h1>Get in Touch with Navokta</h1>
        <p>
          We’re here to help you achieve more. Reach out for support,
          partnerships, or just to say hi!
        </p>
      </header>

      <main className="contact-main">
        <section className="contact-section">
          <div className="contact-left">
            <h2>Our Communities</h2>
            <CommunityCards />
          </div>

          <div className="contact-right">
            <h2>Contact Form</h2>
            <form ref={formRef} onSubmit={handleSubmit} name="submit-to-google-sheet" className="contact-form">
              <p>Connect With Us... With Your Stories and a Helpful Message</p>
              <input type="text" name="name" placeholder="Name..." required />
              <input type="text" name="email" placeholder="Email/Phone..." required />
              <textarea name="message" placeholder="Your Story..." rows="4" required></textarea>
              <button type="submit">Submit Story</button>
              {msg && <p className={`form-message ${msg.includes('✅') ? 'success' : 'error'}`}>{msg}</p>}
              <input type="hidden" name="sheetType" value="Sheet1" />
            </form>

            <div className="contact-address">
              <h3>Our Contact</h3>
              <div>
                Email: <a href="mailto:navokta@gmail.com">navokta@gmail.com</a><br />
                Phone: <a href="tel:+918307233996">+91 83072 33996</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <FloatingActionButton />
    </div>
  );
};

export default Contact;
