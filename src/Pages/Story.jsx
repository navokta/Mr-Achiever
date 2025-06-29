import React, { useEffect, useState } from "react";
import "./Story.css";
import {
  FaThumbsUp,
  FaComment,
  FaShareAlt,
  FaUserCircle,
  FaEye,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Story = () => {
  const [stories, setStories] = useState([]);
  const [expandedStoryId, setExpandedStoryId] = useState(null);
  const [showCommentsId, setShowCommentsId] = useState(null);
  const [commentTextMap, setCommentTextMap] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/stories")
      .then((res) => res.json())
      .then((data) => {
        setStories(data.reverse()); // Show newest stories on top
      });
  }, []);

  const hasLiked = (id) => localStorage.getItem(`liked_${id}`) === "true";

  const handleLike = async (id) => {
    if (hasLiked(id)) return alert("You already liked this post!");
    const res = await fetch(`http://localhost:5000/api/stories/${id}/like`, {
      method: "PATCH",
    });
    const updated = await res.json();
    localStorage.setItem(`liked_${id}`, "true");
    setStories(stories.map((story) => (story._id === id ? updated : story)));
  };

  const handleView = async (id) => {
    const res = await fetch(`http://localhost:5000/api/stories/${id}/view`, {
      method: "PATCH",
    });
    const updated = await res.json();
    setStories(stories.map((story) => (story._id === id ? updated : story)));
  };

  const handleCommentSubmit = async (id) => {
    const text = commentTextMap[id];
    if (!text?.trim()) return;

    const res = await fetch(`http://localhost:5000/api/stories/${id}/comment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    const updated = await res.json();
    setStories(stories.map((story) => (story._id === id ? updated : story)));
    setCommentTextMap((prev) => ({ ...prev, [id]: "" }));
  };

  const handleShare = (id) => {
    if (id.length === 24) {
      const url = `${window.location.origin}/story/${id}`;
      navigator.clipboard.writeText(url);
      alert("🔗 Link copied to clipboard!");
    } else {
      alert("Invalid Story ID!");
    }
  };

  return (
    <div className="story-container">
      {stories.map((story) => (
        <div className="story-card" key={story._id}>
          <div className="story-header">
            <FaUserCircle className="user-icon" />
            <div className="user-info">
              <p>
                <strong>{story.name}</strong>
              </p>
              <p>
                <FaEye /> {story.views} Views
              </p>
            </div>
            <span className="story-date">
              {new Date(story.createdAt).toLocaleDateString()}
            </span>
          </div>

          <div className="story-body">
            <p>
              {expandedStoryId === story._id
                ? story.story
                : story.story.slice(0, 200) + "..."}
            </p>
            {story.story.length > 200 && (
              <button
                className="read-more"
                onClick={() => {
                  if (expandedStoryId !== story._id) {
                    handleView(story._id); // ✅ Count view only on first expand
                  }
                  setExpandedStoryId((prev) =>
                    prev === story._id ? null : story._id
                  );
                }}
              >
                {expandedStoryId === story._id ? "Hide" : "Read more"}
              </button>
            )}
          </div>

          <div className="story-actions">
            <button onClick={() => handleLike(story._id)}>
              <FaThumbsUp /> Like ({story.likes})
            </button>
            <button
              onClick={() =>
                setShowCommentsId((prev) =>
                  prev === story._id ? null : story._id
                )
              }
            >
              <FaComment /> Comment ({story.comments.length})
            </button>
            <button onClick={() => handleShare(story._id)}>
              <FaShareAlt /> Share
            </button>
            <button onClick={() => navigate(`/story/${story._id}`)}>
              🔎 View Page
            </button>
          </div>

          {showCommentsId === story._id && (
            <div className="comments-section">
              <ul>
                {story.comments.map((cmt, idx) => (
                  <li key={idx}>
                    {cmt.text}{" "}
                    <small>({new Date(cmt.date).toLocaleString()})</small>
                  </li>
                ))}
              </ul>
              <input
                type="text"
                placeholder="Write a comment..."
                value={commentTextMap[story._id] || ""}
                onChange={(e) =>
                  setCommentTextMap((prev) => ({
                    ...prev,
                    [story._id]: e.target.value,
                  }))
                }
              />
              <button onClick={() => handleCommentSubmit(story._id)}>
                Post Comment
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Story;
