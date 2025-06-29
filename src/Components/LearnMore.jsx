import React from 'react';
import './LearnMore.css'; // Import the CSS file

const LearnMore = () => {
  return (
    <div className="learnmore-container">
      <div className="learnmore-card">
        <h1 className="learnmore-title">Disclaimer</h1>

        <section className="learnmore-section">
          <h2>Welcome to Navokta</h2>
          <p>
            Please read this disclaimer carefully before using our platform.
          </p>
        </section>

        <section className="learnmore-section">
          <h2>User-Generated Content</h2>
          <p>
            The stories, experiences, and narratives published on Navokta are user-generated. While we encourage authenticity and thoughtful sharing, Navokta does not verify the factual accuracy of user submissions. Some stories may be fictional, exaggerated, or interpreted subjectively by the authors. We do not claim ownership or endorse any content shared by users.
          </p>
        </section>

        <section className="learnmore-section">
          <h2>Creative Freedom & Expression</h2>
          <p>
            Content on Navokta may reflect personal opinions, beliefs, or creative interpretations. Readers are advised to view all stories as expressions of individual perspectives and not as verified facts. Interpret responsibly.
          </p>
        </section>

        <section className="learnmore-section">
          <h2>Data Privacy</h2>
          <p>
            Navokta respects your privacy. We do not collect or access your personal data without consent. Any information you choose to share publicly on your profile or in a story is at your discretion and may remain accessible to others. Please avoid posting sensitive personal information.
          </p>
        </section>

        <section className="learnmore-section">
          <h2>Content Permanence</h2>
          <p>
            By publishing content on Navokta, you acknowledge that your submission may remain on the platform indefinitely. While users may request edits or removals, permanent deletion is not guaranteed, especially if the content has been shared, quoted, or archived elsewhere.
          </p>
        </section>

        <section className="learnmore-section">
          <h2>Intellectual Property</h2>
          <p>
            You retain full rights to the content you create and share. However, by posting on Navokta, you grant us a non-exclusive license to display, distribute, and promote your content on our platform and affiliated channels, always with attribution to you.
          </p>
        </section>

        <section className="learnmore-section">
          <h2>Community Responsibility</h2>
          <p>
            Users are solely responsible for the content they share. Navokta reserves the right to remove or restrict access to any content that violates community guidelines, promotes harm, or infringes on the rights of others.
          </p>
        </section>

        <section className="learnmore-section">
          <h2>No Liability</h2>
          <p>
            Navokta, its team, and affiliates shall not be held liable for any consequences arising from the use of this platform, the interpretation of content, or any reliance on information shared by other users.
          </p>
        </section>
      </div>
    </div>
  );
};

export default LearnMore;
