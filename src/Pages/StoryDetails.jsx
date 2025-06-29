import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const StoryDetail = () => {
  const { id } = useParams();
  const [story, setStory] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/stories/${id}`)
      .then(res => res.json())
      .then(data => setStory(data));
  }, [id]);

  if (!story) return <p>Loading...</p>;

  return (
    <div className="story-detail">
      <h2>{story.name}</h2>
      <p><strong>Views:</strong> {story.views}</p>
      <p>{story.story}</p>
      <h3>Comments</h3>
      <ul>
        {story.comments.map((c, i) => (
          <li key={i}>{c.text} ({new Date(c.date).toLocaleString()})</li>
        ))}
      </ul>
    </div>
  );
};

export default StoryDetail;
