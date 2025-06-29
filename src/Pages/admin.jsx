import React, { useState } from 'react';
import './Admin.css';

const BASE_URL = import.meta.env.VITE_API_BASE || "https://mr-achiever.onrender.com";

const Admin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (res.ok) {
        setIsAuthenticated(true);
        fetchStories();
      } else {
        alert('❌ Invalid credentials');
      }
    } catch (err) {
      console.error("Login failed:", err);
      alert('❌ Server error');
    }
  };

  const fetchStories = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/admin/stories`);
      const data = await res.json();
      setStories(data);
    } catch (err) {
      console.error("Failed to fetch stories:", err);
      alert("Failed to fetch stories");
    }
    setLoading(false);
  };

  const deleteStory = async (id) => {
    await fetch(`${BASE_URL}/api/admin/stories/${id}`, {
      method: 'DELETE'
    });
    fetchStories();
  };

  const updateStory = async (id) => {
    const newName = prompt('Enter new name:');
    const newStory = prompt('Enter new story:');
    if (newName && newStory) {
      await fetch(`${BASE_URL}/api/admin/stories/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName, story: newStory })
      });
      fetchStories();
    }
  };

  const updateView = async (id) => {
    const newViews = parseInt(prompt('Enter new view count:'), 10);
    if (!isNaN(newViews)) {
      await fetch(`${BASE_URL}/api/admin/stories/${id}/view`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ views: newViews })
      });
      fetchStories();
    }
  };

  const updateComment = async (storyId, index) => {
    const newText = prompt('Edit comment:');
    if (newText?.trim()) {
      await fetch(`${BASE_URL}/api/admin/stories/${storyId}/comments/${index}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: newText })
      });
      fetchStories();
    }
  };

  const deleteComment = async (storyId, index) => {
    await fetch(`${BASE_URL}/api/admin/stories/${storyId}/comments/${index}`, {
      method: 'DELETE'
    });
    fetchStories();
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-login">
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin} className="admin-form">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <h2>🛠️ Admin Dashboard</h2>
      {loading && <p>Loading stories...</p>}
      {stories.map((story) => (
        <div key={story._id} className="story-box">
          <h3>{story.name}</h3>
          <p>{story.story}</p>
          <p><strong>Views:</strong> {story.views}</p>

          <div className="story-actions">
            <button onClick={() => updateStory(story._id)}>✏️ Edit Story</button>
            <button onClick={() => deleteStory(story._id)}>🗑️ Delete Story</button>
            <button onClick={() => updateView(story._id)}>👁️ Edit Views</button>
          </div>

          <h4>📝 Comments</h4>
          <ul>
            {story.comments.map((comment, idx) => (
              <li key={idx}>
                {comment.text} <small>({new Date(comment.date).toLocaleString()})</small>
                <button onClick={() => updateComment(story._id, idx)}>✏️</button>
                <button onClick={() => deleteComment(story._id, idx)}>🗑️</button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Admin;
