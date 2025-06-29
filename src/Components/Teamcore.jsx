import React, { useState } from 'react';
import './Teamcore.css';
import mamImg from '../assets/mam.jpg';
import bhavyImg from '../assets/bhavy.jpg';
import sakshiImg from '../assets/Sakshi.png';
import bhumiImg from '../assets/bhumi.png';
import kratakshiImg from '../assets/kratakshi.png';
import fazalImg from '../assets/fazal.png'
import abhinavImg from '../assets/Abhinav.jpg';

// const placeholderImg = 'https://via.placeholder.com/150';

const Teamcore = () => {
  const [activeProfile, setActiveProfile] = useState(null);

  const teamMembers = [
    {
      id: 1,
      name: "Richa Dixit",
      position: " Our Mentor",
      image: mamImg,
      summary: "Tarot Card Reader",
      fullDescription: "I believe ma’am recognized my potential right from the first semester. She noticed that I had a unique way of doing things. In fact, I even shared a few shayaris with her back then, and she appreciated some of them. She has always supported me wholeheartedly. The initial push for Veda Verse came because of her encouragement. Honestly, if she hadn’t been a part of my journey, I don’t think I would’ve come this far. Her presence has had a significant impact on my life.She has always been supportive—both personally and professionally. I’ve always looked up to her with the same respect and love as I have for my own mother. And she, in return, has never made me feel like anything less than a son. I’m genuinely proud and grateful to have her in my life."
    },
    {
      id: 2,
      name: "Bhavy Sharma",
      position: "Coder Shab",
      image: bhavyImg,
      summary: "Problem Solver",
      fullDescription: "Hi, I’m Bhavy Sharma — also known as Coder Shab. You’ve probably already read my story in the section above, but let me reintroduce myself. I’m someone who turns code into real-world solutions. I strongly believe in my potential to build meaningful things — and I actually do. One unique strength I have is what I call my “secret power”: whenever I talk to someone, I understand their psychology deeply and leave a lasting impression. So if you’re reading this, I’m quite sure you won’t forget me easily. Let’s keep this bond growing — and I promise to keep bringing you projects and ideas that make a difference."
    },
    {
      id: 3,
      name: "Sakshi Jain",
      position: "Strategic Wellbeing Partner",
      image: sakshiImg,
      summary: "MERN Stack Developver",
      fullDescription: "Sakshi is one of my closest friends and has been a huge support in building projects like Navokta. If I ever have to bet on someone’s skills, it would be her — because I know exactly what she's capable of. Interestingly, we met by chance — there was a typo in one of my PDFs, and that small interaction turned into a meaningful conversation. Since then, we’ve been working together. Ours is a very natural and genuine bond, and I truly pray that it lasts a lifetime. Sakshi is incredibly talented — she just needs someone who understands and believes in her. And I genuinely believe I’m that person.Wishing her all the success and happiness in her journey ahead."
    },
    {
      id: 4,
      name: "Bhumi Singhal",
      position: "Emotional Intelligence Advisor",
      image: bhumiImg,
      summary: "Web Developer",
      fullDescription: "My coordination with Bhumi has always been effortless. She understands the context without needing too many explanations — it’s like we’re always on the same wavelength. We often have separate conversations that go beyond team matters — a sign of the trust and clarity between us. She has been a strong emotional pillar throughout my journey. We’ve anchored together at the Fresher’s Farewell and the Women’s Day celebration, and those experiences only deepened our understanding and teamwork. Beyond events, we’ve also learned web development side by side — encouraging and pushing each other to grow. What sets Bhumi apart is her sensitivity combined with silent strength. She supports quietly but powerfully — and I know she’ll achieve whatever she sets her heart on. I truly believe in her. Bhumi, I want you to know — I’ll always be there for you, just like you’ve been for me. This bond we share is not just friendship — it’s a shared journey of trust, respect, and growth. You’re not just part of the team — you’re part of my story."
    },
    {
      id: 5,
      name: "Abhinav Kaushik",
      position: "Singer ji",
      image: abhinavImg,
      summary: "The Artist",
      fullDescription: "Abhinav has been with me since the very beginning. He has a unique personality — full of energy, positivity, and that rare spark that keeps everyone around him engaged and uplifted. He never lets things get dull, and that’s something truly special. What I admire most about him is his helpful and always-available nature. He genuinely cares for those who matter to him, and that makes him not just a great teammate, but a wonderful human being. Beyond that, Abhinav is also a talented singer and someone who brings a friendly, warm vibe wherever he goes. He knows how to connect with people, and his support has meant a lot to me over time. Yes, in the past there were things I didn’t completely agree with, but we’ve moved past that. We’ve grown, matured, and today I can proudly say that Abhinav is one of my closest and most dependable friends."
    },
    {
      id: 6,
      name: "Kratakshi Bhardwaj",
      position: "Personal Advisor",
      image: kratakshiImg,
      summary: "Web Developer",
      fullDescription: "Kratakshi and I have known each other since the Clueless Coder days—that's where our friendship truly began. Over time, we became close friends. She’s innocent, a bit of a foodie (though she doesn’t eat much!), and someone I occasionally get upset with—but thankfully, I also know exactly how to cheer her up. Right, Kratakshi? 😄.  What makes her truly special is her lack of jealousy—she's genuinely supportive of everyone and impresses people effortlessly. Yes, she can get a little lazy sometimes when it comes to work, but if not for that, she’d be number one at everything! When I’m overwhelmed with Navokta’s responsibilities, she’s the one I turn to. She calms me down, helps me get back on track, and quietly supports the tasks behind the scenes. She’s nurturing and caring, almost like a second mother in the group. Kratakshi, I’ll always be there for you, just like you’ve been there for me. I truly wish you all the success and happiness ahead, and I hope our bond continues to grow stronger with time."
    },
     {
      id: 7,
      name: "Mohd. Fazal Ali",
      position: "Core team Member",
      image: fazalImg,
      summary: "MERN Stack Developer",
      fullDescription: "I first met Fazal around Diwali, and from our very first conversation, I realized he had some solid skills. Sure, he might cut a few corners here and there, but he always completes the work—one way or another! What I admire about Fazal is that he doesn't feel the need to showcase his progress to everyone. He recently worked on some projects without even mentioning them—quietly getting things done. He’s a good guy, no doubt about it. Sometimes, he may come off as giving off a bit of negative energy, but when you really get to know him, you understand that it’s just a part of the personality he’s crafted for himself—intentionally. Beneath that exterior, there’s a focused, capable person who knows what he’s doing. Fazal might not always be expressive, but he's dependable—and that's what matters most."
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