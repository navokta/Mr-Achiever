import React, { useState } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getRoot, $createParagraphNode, $createTextNode } from "lexical";
import { useNavigate } from "react-router-dom";
import "./StoryEditor.css";
import toast from "react-hot-toast";

const BASE_URL = (import.meta.env.VITE_API_BASE || "https://mr-achiever.onrender.com").replace(/\/+$/, "");

const editorConfig = {
  namespace: "StoryEditor",
  theme: {
    paragraph: "editor-paragraph",
    text: {
      bold: "editor-text-bold",
      italic: "editor-text-italic",
      underline: "editor-text-underline",
    },
  },
  onError(error) {
    console.error(error);
  },
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRephrasing, setIsRephrasing] = useState(false);

  const wordCount = story.trim().split(/\s+/).filter(Boolean).length;
  const isReady = wordCount >= 100;

  const handleChange = (editorState) => {
    editorState.read(() => {
      const root = $getRoot();
      setStory(root.getTextContent());
    });
  };

  const handleSubmit = async () => {
    if (!isReady || !name.trim()) return;
    setIsSubmitting(true);
    try {
      const res = await fetch(`${BASE_URL}/api/stories`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          story: story.trim(),
          createdAt: new Date().toISOString(),
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Submission failed");
      }

      toast.success("Story submitted successfully!");
      navigate("/story");
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit story. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRephrase = async () => {
    if (!isReady || !editorInstance) return;
    setIsRephrasing(true);
    try {
      const res = await fetch(`${BASE_URL}/api/rephrase`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: story }),
      });

      if (!res.ok) throw new Error("Server error during rephrase");

      const data = await res.json();

      editorInstance.update(() => {
        const root = $getRoot();
        root.clear();
        const para = $createParagraphNode();
        para.append($createTextNode(data.rephrased || "No rephrased result"));
        root.append(para);
      });
    } catch (err) {
      console.error(err);
      toast.error("AI Rephrase failed. Try again.");
    } finally {
      setIsRephrasing(false);
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

        <p className="word-count">
          📝 Word Count: {wordCount} (Write at least 100 words to enable rephrase & submit)
        </p>

        <div className="story-editor-actions">
          <button
            className="story-editor-button rephrase-btn"
            disabled={!isReady || isRephrasing}
            onClick={handleRephrase}
          >
            {isRephrasing ? "✨ Rephrasing..." : "✨ Rephrase with AI"}
          </button>

          <button
            className="story-editor-button submit-btn"
            disabled={!isReady || isSubmitting}
            onClick={handleSubmit}
          >
            {isSubmitting ? "📤 Submitting..." : "📤 Submit Story"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoryEditor;
