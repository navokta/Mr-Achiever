import React, { useState } from "react";
import {
  LexicalComposer
} from "@lexical/react/LexicalComposer";
import {
  RichTextPlugin
} from "@lexical/react/LexicalRichTextPlugin";
import {
  ContentEditable
} from "@lexical/react/LexicalContentEditable";
import {
  HistoryPlugin
} from "@lexical/react/LexicalHistoryPlugin";
import {
  OnChangePlugin
} from "@lexical/react/LexicalOnChangePlugin";
import { $getRoot, $setSelection, $createParagraphNode } from "lexical";
import { $createTextNode } from "lexical"; // add this import at top
import "./StoryEditor.css";

const editorConfig = {
  namespace: "StoryEditor",
  theme: {
    paragraph: "editor-paragraph",
    text: {
      bold: "editor-bold",
      italic: "editor-italic"
    }
  },
  onError(error) {
    throw error;
  }
};

const StoryEditor = () => {
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
    const res = await fetch("/api/stories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        story,
        createdAt: new Date().toISOString()
      })
    });
    alert("Story submitted!");
  };

 const handleRephrase = async () => {
  try {
    const res = await fetch("/api/rephrase", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: story }),
    });

    if (!res.ok) {
      const errorText = await res.text(); // Read raw error (not JSON)
      throw new Error(`Server error (${res.status}): ${errorText}`);
    }

    const data = await res.json(); // Only parse if safe

    if (!data.rephrased) throw new Error("AI response missing `rephrased` text");

    if (editorInstance) {
      editorInstance.update(() => {
        const root = $getRoot();
        root.clear();
        root.append($createParagraphNode().append(data.rephrased));
      });
    }
  } catch (err) {
    console.error("Rephrase error:", err);
    alert("AI failed to rephrase. See console for details.");
  }
};


  return (
    <div className="editor-container">
      <h2>Tell Your Story</h2>
      <input
        type="text"
        placeholder="Your Name"
        className="editor-name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <LexicalComposer
        initialConfig={{
          ...editorConfig,
          editor__DEPRECATED: setEditorInstance
        }}
      >
        <RichTextPlugin
          contentEditable={<ContentEditable className="editor-input" />}
          placeholder={
            <div className="editor-placeholder">Write your story...</div>
          }
        />
        <OnChangePlugin onChange={handleChange} />
        <HistoryPlugin />
      </LexicalComposer>

      <div className="btns">
        <button onClick={handleRephrase}>Rephrase with AI</button>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};
 
export default StoryEditor;
