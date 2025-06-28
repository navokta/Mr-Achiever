import React, { useEffect, useState } from 'react';
import './Story.css';
import { FaThumbsUp, FaComment, FaShareAlt, FaUserCircle } from 'react-icons/fa';

const Story = () => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/stories")
      .then(res => res.json())
      .then(data => {
        console.log("Stories from DB:", data);
        setStories(data);
      });
  }, []);

  return (
    <div className="story-container">
      {stories.length === 0 ? (
        <p>No stories found</p>
      ) : (
        stories.map((story) => (
          <div className="story-card" key={story._id}>
            <div className="story-header">
              <FaUserCircle className="user-icon" />
              <div className="user-info">
                <p><strong>Name:</strong> {story.name}</p>
                <p><strong>Views:</strong> {story.views}</p>
              </div>
              <span className="story-date">
                {new Date(story.createdAt).toLocaleDateString()}
              </span>
            </div>

            <div className="story-body">
              <p>
                {story.story.length > 200
                  ? story.story.slice(0, 200) + "..."
                  : story.story}
              </p>
              {story.story.length > 200 && (
                <button className="read-more">Read more</button>
              )}
            </div>

            <div className="story-actions">
              <button><FaThumbsUp /> Like</button>
              <button><FaComment /> Comment</button>
              <button><FaShareAlt /> Share</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Story;
