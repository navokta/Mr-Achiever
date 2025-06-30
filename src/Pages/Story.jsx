import React, { useEffect, useState } from "react";
import FloatingActionButton from '../Components/FloatingActionButton';
import "./Story.css";
import {
  FaWhatsapp, FaFacebook, FaTwitter, FaTelegram, FaLinkedin, FaLink,
  FaThumbsUp, FaComment, FaShareAlt, FaUserCircle, FaEye,
  FaRegComment, FaRegThumbsUp
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const BASE_URL = (import.meta.env.VITE_API_BASE || "https://mr-achiever.onrender.com").replace(/\/+$/, "");

const Story = () => {
  const [stories, setStories] = useState([]);
  const [expandedStoryId, setExpandedStoryId] = useState(null);
  const [showCommentsId, setShowCommentsId] = useState(null);
  const [commentTextMap, setCommentTextMap] = useState({});
  const [shareDropdownId, setShareDropdownId] = useState(null);
  const [hoveredStoryId, setHoveredStoryId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/stories`);
        const data = await res.json();
        setStories(data);
      } catch (error) {
        console.error("Error fetching stories:", error);
      }
    };
    fetchStories();
  }, []);

  const hasLiked = (id) => localStorage.getItem(`liked_${id}`) === "true";

  const handleLike = async (id) => {
    if (hasLiked(id)) return alert("You already liked this post!");
    const res = await fetch(`${BASE_URL}/api/stories/${id}/like`, { method: "PATCH" });
    const updated = await res.json();
    localStorage.setItem(`liked_${id}`, "true");
    setStories(stories.map(story => story._id === id ? updated : story));
  };

  const handleView = async (id) => {
    const res = await fetch(`${BASE_URL}/api/stories/${id}/view`, { method: "PATCH" });
    const updated = await res.json();
    setStories(stories.map(story => story._id === id ? updated : story));
  };

  const handleCommentSubmit = async (id) => {
    const text = commentTextMap[id];
    if (!text?.trim()) return;
    const res = await fetch(`${BASE_URL}/api/stories/${id}/comment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    const updated = await res.json();
    setStories(stories.map(story => story._id === id ? updated : story));
    setCommentTextMap(prev => ({ ...prev, [id]: "" }));
  };

  const handleShare = (platform, story) => {
    const url = `${window.location.origin}/story/${story._id}`;
    const text = `Read this beautiful story from Navokta "${story.name}"'s story:\n\n"${story.story.substring(0, 100)}..." \nRead more: ${url}`;
    let shareUrl = "";

    switch (platform) {
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
        break;
      case "telegram":
        shareUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case "copy":
        navigator.clipboard.writeText(url);
        alert("🔗 Link copied to clipboard!");
        return;
      default:
        return;
    }

    window.open(shareUrl, "_blank");
  };

  return (
    <div className="stories-container">
      <h1 className="stories-title">Navokta's Stories</h1>

      {stories.length === 0 ? (
        <div className="no-stories">
          <p>No stories yet. Be the first to share!</p>
          <button className="create-story-btn" onClick={() => navigate('/add-story')}>
            Create Your Story
          </button>
        </div>
      ) : (
        stories.map((story) => (
          <div
            className="story-card"
            key={story._id}
            onMouseEnter={() => setHoveredStoryId(story._id)}
            onMouseLeave={() => {
              setHoveredStoryId(null);
              setShareDropdownId(null);
            }}
          >
            <div className="story-header">
              <div className="author-info">
                <FaUserCircle className="author-avatar" />
                <div>
                  <h3 className="author-name">{story.name}</h3>
                  <p className="story-date">
                    {new Date(story.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
              <div className="story-views">
                <FaEye /> {story.views} views
              </div>
            </div>

            <div className="story-content">
              <p className={expandedStoryId === story._id ? "expanded" : "collapsed"}>
                {expandedStoryId === story._id
                  ? story.story
                  : `${story.story.substring(0, 200)}${story.story.length > 200 ? "..." : ""}`}
              </p>
              {story.story.length > 200 && (
                <button
                  className="read-more-btn"
                  onClick={() => {
                    if (expandedStoryId !== story._id) handleView(story._id);
                    setExpandedStoryId(prev => prev === story._id ? null : story._id);
                  }}
                >
                  {expandedStoryId === story._id ? "Show less" : "Read more"}
                </button>
              )}
            </div>

            <div className="story-actions">
              <button
                className={`action-btn like-btn ${hasLiked(story._id) ? "liked" : ""}`}
                onClick={() => handleLike(story._id)}
              >
                {hasLiked(story._id) ? <FaThumbsUp /> : <FaRegThumbsUp />}
                <span>{story.likes}</span>
              </button>

              <button
                className="action-btn comment-btn"
                onClick={() => setShowCommentsId(prev => prev === story._id ? null : story._id)}
              >
                {showCommentsId === story._id ? <FaComment /> : <FaRegComment />}
                <span>{story.comments.length}</span>
              </button>

              <div className="share-dropdown-wrapper">
                <button
                  className="action-btn share-btn"
                  onClick={() => setShareDropdownId(prev => prev === story._id ? null : story._id)}
                >
                  <FaShareAlt />
                </button>

                {shareDropdownId === story._id && hoveredStoryId === story._id && (
                  <div className="share-dropdown">
                    <button onClick={() => handleShare("whatsapp", story)}><FaWhatsapp /> WhatsApp</button>
                    <button onClick={() => handleShare("facebook", story)}><FaFacebook /> Facebook</button>
                    <button onClick={() => handleShare("telegram", story)}><FaTelegram /> Telegram</button>
                    <button onClick={() => handleShare("twitter", story)}><FaTwitter /> Twitter</button>
                    <button onClick={() => handleShare("linkedin", story)}><FaLinkedin /> LinkedIn</button>
                    <button onClick={() => handleShare("copy", story)}><FaLink /> Copy Link</button>
                  </div>
                )}
              </div>

              <button
                className="action-btn view-page-btn"
                onClick={() => navigate(`/story/${story._id}`)}
              >
                View Page
              </button>
            </div>

            {showCommentsId === story._id && (
              <div className="comments-section">
                <h4>Comments ({story.comments.length})</h4>
                {story.comments.length > 0 ? (
                  <ul className="comments-list">
                    {story.comments.map((cmt, idx) => (
                      <li key={idx} className="comment-item">
                        <div className="comment-content">
                          <p>{cmt.text}</p>
                          <small className="comment-date">{new Date(cmt.date).toLocaleString()}</small>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="no-comments">No comments yet</p>
                )}

                <div className="add-comment">
                  <input
                    type="text"
                    placeholder="Write a comment..."
                    value={commentTextMap[story._id] || ""}
                    onChange={(e) => setCommentTextMap(prev => ({
                      ...prev,
                      [story._id]: e.target.value,
                    }))}
                    className="comment-input"
                  />
                  <button className="post-comment-btn" onClick={() => handleCommentSubmit(story._id)}>
                    Post
                  </button>
                </div>
              </div>
            )}
          </div>
        ))
      )}
      <FloatingActionButton />
    </div>
  );
};

export default Story;
