import React, { useState } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getRoot, $createParagraphNode, $createTextNode } from "lexical";
import "./StoryEditor.css";
import { useNavigate } from 'react-router-dom';

const editorConfig = {
  namespace: "StoryEditor",
  theme: {
    paragraph: "editor-paragraph",
    text: {
      bold: "editor-text-bold",
      italic: "editor-text-italic",
      underline: "editor-text-underline"
    }
  },
  onError(error) {
    console.error(error);
  }
};

const EditorRefPlugin = ({ setEditor }) => {
  const [editor] = useLexicalComposerContext();
  React.useEffect(() => {
    setEditor(editor);
  }, [editor]);
  return null;
};

const StoryEditor = () => {
  const navigate = useNavigate();
  const [story, setStory] = useState("");
  const [name, setName] = useState("");
  const [editorInstance, setEditorInstance] = useState(null);

  const handleChange = (editorState) => {
    editorState.read(() => {
      const root = $getRoot();
      setStory(root.getTextContent());
    });
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/stories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          story,
          createdAt: new Date().toISOString()
        })
      });

      const data = await res.json();
      
      if (res.ok) {
        alert("Story submitted successfully!");
        navigate("/story");
      } else {
        throw new Error(data.message || "Failed to submit story");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert(error.message);
    }
  };

  const handleRephrase = async () => {
    if (!story.trim()) {
      alert("Please write something first!");
      return;
    }

    try {
      const res = await fetch("/api/rephrase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: story }),
      });

      if (!res.ok) throw new Error(`Server error: ${res.status}`);

      const data = await res.json();
      
      editorInstance?.update(() => {
        const root = $getRoot();
        root.clear();
        const para = $createParagraphNode();
        para.append($createTextNode(data.rephrased || data.text));
        root.append(para);
      });
    } catch (error) {
      console.error("Rephrase error:", error);
      alert("Failed to rephrase. Please try again.");
    }
  };

  return (
    <div className="story-editor-container">
      <div className="story-editor-card">
        <h2 className="story-editor-title">Share Your Story</h2>
        
        <input
          type="text"
          placeholder="Your Name"
          className="story-editor-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        
        <div className="story-editor-wrapper">
          <LexicalComposer initialConfig={editorConfig}>
            <EditorRefPlugin setEditor={setEditorInstance} />
            <RichTextPlugin
              contentEditable={
                <ContentEditable className="story-editor-content" />
              }
              placeholder={
                <div className="story-editor-placeholder">
                  Write your story here...
                </div>
              }
            />
            <OnChangePlugin onChange={handleChange} />
            <HistoryPlugin />
          </LexicalComposer>
        </div>
        
        <div className="story-editor-actions">
          <button 
            className="story-editor-button rephrase-btn"
            onClick={handleRephrase}
          >
            ✨ Rephrase with AI
          </button>
          <button 
            className="story-editor-button submit-btn"
            onClick={handleSubmit}
          >
            📤 Submit Story
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoryEditor;