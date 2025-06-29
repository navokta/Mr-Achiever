import React from "react";
import "./Team.css";

const team = () => {
  return (
    <section className="about-section">
      <div className="container">
        <h2>Who we are?</h2>
        <p className="about-description">
          Welcome to Navokta, a platform designed to uplift and share your
          stories, knowledge, and successes. We're building a vibrant community
          where your voice matters, your learning journey is supported, and your
          achievements inspire others to reach new heights.
        </p>

        <div className="team-grid">
          <div className="team-member">
            <div className="member-image">
              <img src="../../src/assets/bhavy.jpg" alt="Team Member 1" />
            </div>
            <h3>Bhavy Sharma</h3>
            <p>MERN Stack Developer</p>
            <p>
              We all gather unique learnings throughout our lives—experiences
              and insights worth sharing. These stories define us and hold the
              power to inspire, educate, and connect with others. Navokta
              understands this desire to share. We believe everyone has a
              narrative that deserves a platform. That's why we've created a
              space where you can articulate your journey, share your wisdom,
              and truly showcase who you are—the authentic self behind your
              achievements and the lessons learned.
            </p>
          </div>

          <div className="team-member">
            <div className="member-image">
              <img src="../../src/assets/Sakshi.png" alt="Team Member 2" />
            </div>
            <h3>Sakshi Jain</h3>
            <p>MERN Stack Developer</p>
            <p>
              Navokta's journey began with a different vision, one that
              ultimately didn't succeed. However, that initial setback was
              invaluable. Through that experience, we gained profound insights
              into what not to do, learning critical lessons that reshaped our
              understanding. Recognizing the power of this hard-won knowledge,
              we sought a platform to share these unique insights—not just our
              successes, but the wisdom gleaned from our challenges. When we
              couldn't find an existing space that truly fit this purpose, the
              idea for the Navokta you see today was born.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default team;
