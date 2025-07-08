import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './StoryDetail.css';

const BASE_URL = (import.meta.env.VITE_API_BASE || "https://mr-achiever.onrender.com").replace(/\/+$/, "");

const StoryDetail = () => {
  const { id } = useParams();
  const [story, setStory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [isLiking, setIsLiking] = useState(false);
  const [hasLiked, setHasLiked] = useState(false); // New state

  const fetchStory = () => {
    fetch(`${BASE_URL}/api/stories/${id}`)
      .then(res => res.json())
      .then(data => {
        setStory(data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  };

  useEffect(() => {
    // Increase view count
    fetch(`${BASE_URL}/api/stories/${id}/view`, { method: 'PATCH' });

    // Check if user already liked
    const likedStories = JSON.parse(localStorage.getItem("likedStories") || "[]");
    setHasLiked(likedStories.includes(id));
    setIsLiking(likedStories.includes(id)); // disable button if already liked

    setIsLoading(true);
    fetchStory();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const response = await fetch(`${BASE_URL}/api/stories/${id}/comment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: newComment })
    });

    if (response.ok) {
      setNewComment('');
      fetchStory(); // Refresh comments
    }
  };

  const handleLike = async () => {
    if (hasLiked) return;

    const res = await fetch(`${BASE_URL}/api/stories/${id}/like`, {
      method: 'PATCH'
    });

    if (res.ok) {
      const likedStories = JSON.parse(localStorage.getItem("likedStories") || "[]");
      likedStories.push(id);
      localStorage.setItem("likedStories", JSON.stringify(likedStories));
      setHasLiked(true);
      setIsLiking(true);
      fetchStory(); // Refresh likes
    } else {
      const data = await res.json();
      alert(data.message || "You already liked this story.");
    }
  };

  if (isLoading) {
    return <div className="story-detail-loading"><div className="loading-text">Loading story...</div></div>;
  }

  if (!story) {
    return <div className="story-detail-loading"><div className="not-found-text">Story not found</div></div>;
  }

  return (
    <div className="story-detail-container">
      <div className="story-content">
        {/* Header */}
        <div className="story-header">
          <h2 className="story-title">{story.name}</h2>
          <div className="views-count">
            <svg className="views-icon" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span>{story.views} views</span>
          </div>

          <button className="like-button" onClick={handleLike} disabled={isLiking}>
            ❤️ {story.likes || 0} Likes
          </button>
        </div>

        {/* Content */}
        <div className="story-text">
          <p>{story.story}</p>
        </div>

        {/* Comments */}
        <div className="comments-section">
          <h3 className="comments-title">
            <svg className="comments-icon" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            Comments
          </h3>

          {story.comments.length > 0 ? (
            <ul className="comments-list">
              {story.comments.map((c, i) => (
                <li key={i} className="comment-item">
                  <p className="comment-text">{c.text}</p>
                  <div className="comment-date">
                    <svg className="date-icon" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{new Date(c.date).toLocaleString()}</span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-comments">No comments yet. Be the first to comment!</p>
          )}

          {/* Comment Input */}
          <form className="comment-form" onSubmit={handleCommentSubmit}>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              rows="3"
              required
            />
            <button type="submit">Post Comment</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StoryDetail;
