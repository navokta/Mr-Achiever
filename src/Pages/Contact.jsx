import React, { useRef, useState } from 'react';
import CommunityCards from '../Components/CommunityCards';
import FloatingActionButton from '../Components/FloatingActionButton';

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
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #fff 0%, #ffb6e6 100%)',
        padding: '0',
        margin: '0',
        fontFamily: 'Segoe UI, Arial, sans-serif',
      }}
    >
      <header
        style={{
          width: '100%',
          padding: '2rem 0 1rem 0',
          background: 'rgba(255,255,255,0.85)',
          boxShadow: '0 2px 8px 0 rgba(255,182,230,0.10)',
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            color: '#e75480',
            fontWeight: 800,
            fontSize: '2.5rem',
            margin: 0,
            letterSpacing: '1px',
          }}
        >
          Get in Touch with Navokta
        </h1>
        <p
          style={{
            color: '#a9446a',
            fontSize: '1.15rem',
            margin: '0.5rem 0 0 0',
            fontWeight: 500,
          }}
        >
          We’re here to help you achieve more. Reach out for support, partnerships, or just to say hi!
        </p>
      </header>

      <main
        style={{
          maxWidth: '1100px',
          margin: '2rem auto',
          padding: '0 1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '2.5rem',
        }}
      >
        <section
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '2rem',
            justifyContent: 'center',
            alignItems: 'stretch',
          }}
        >
          {/* Left - Communities */}
          <div
            style={{
              flex: '1 1 340px',
              minWidth: '280px',
              maxWidth: '420px',
              background: 'rgba(255,255,255,0.95)',
              borderRadius: '18px',
              boxShadow: '0 2px 16px 0 rgba(255,182,230,0.13)',
              padding: '2rem 1.5rem',
              marginBottom: '1rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'stretch',
              height: '100%',
            }}
          >
            <h2 style={{ color: '#e75480', marginBottom: '1rem', fontSize: '1.5rem', textAlign: 'center' }}>Our Communities</h2>
            <CommunityCards />
          </div>

          {/* Right - Contact Form + Address */}
          <div
            style={{
              flex: '1 1 340px',
              minWidth: '280px',
              maxWidth: '420px',
              background: 'rgba(255,255,255,0.95)',
              borderRadius: '18px',
              boxShadow: '0 2px 16px 0 rgba(255,182,230,0.13)',
              padding: '2rem 1.5rem',
              marginBottom: '1rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'stretch',
              height: '100%',
            }}
          >
            <h2 style={{ color: '#e75480', marginBottom: '1rem', fontSize: '1.5rem', textAlign: 'center' }}>Contact Form</h2>
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              name="submit-to-google-sheet"
              style={{
                background: '#ffe4f0',
                borderRadius: '12px',
                padding: '1.2rem',
                boxShadow: '0 4px 10px rgba(255,182,230,0.25)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              <p style={{ textAlign: 'center', fontWeight: 600, color: '#e75480' }}>
                Connect With Us... With Your Stories and a Helpful Message
              </p>
              <input
                type="text"
                name="name"
                placeholder="Name..."
                required
                style={{ padding: '0.6rem', borderRadius: '6px', border: '1px solid #e75480' }}
              />
              <input
                type="text"
                name="email"
                placeholder="Email/Phone..."
                required
                style={{ padding: '0.6rem', borderRadius: '6px', border: '1px solid #e75480' }}
              />
              <textarea
                name="message"
                placeholder="Your Story..."
                rows="4"
                required
                style={{ padding: '0.6rem', borderRadius: '6px', border: '1px solid #e75480' }}
              ></textarea>
              <button
                type="submit"
                style={{
                  backgroundColor: '#e75480',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '0.7rem',
                  fontWeight: '600',
                }}
              >
                Submit Story
              </button>
              {msg && (
                <p style={{ color: msg.includes('✅') ? 'green' : 'red', textAlign: 'center', fontWeight: 500 }}>{msg}</p>
              )}
              <input type="hidden" name="sheetType" value="Sheet1" />

            </form>

            <div
              style={{
                background: '#fff6fb',
                borderRadius: '16px',
                padding: '1.2rem',
                boxShadow: '0 2px 16px 0 rgba(255,182,230,0.10)',
                width: '90%',
                marginTop: '1.5rem',
                textAlign: 'center',
              }}
            >
              <h3 style={{ color: '#e75480', marginBottom: '0.7rem', fontWeight: 700 }}>Our Address</h3>
              <div style={{ color: '#a9446a', fontSize: '1rem', marginBottom: '0.5rem' }}>
                ??<br />
                Email: <a href="mailto:navokta@gmail.com" style={{ color: '#e75480' }}>navokta@gmail.com</a><br />
                Phone: <a href="tel:+918307233996" style={{ color: '#e75480' }}>+91 83072 33996</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <FloatingActionButton />

      <style>
        {`
          @media (max-width: 1100px) {
            main {
              max-width: 98vw !important;
            }
          }
          @media (max-width: 900px) {
            section {
              padding: 1.2rem !important;
            }
            header h1 {
              font-size: 2.1rem !important;
            }
          }
          @media (max-width: 700px) {
            main > section {
              max-width: 98vw !important;
              padding: 1rem !important;
            }
            section {
              margin-bottom: 1.2rem !important;
            }
          }
          @media (max-width: 600px) {
            header h1 {
              font-size: 1.5rem !important;
            }
            header p {
              font-size: 1rem !important;
            }
            section, .contact-address {
              padding: 0.7rem !important;
            }
            input, button {
              width: 100% !important;
              max-width: 100% !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Contact;
