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
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getRoot,
  $createParagraphNode,
  $createTextNode
} from "lexical";
import "./StoryEditor.css";
import { useNavigate } from 'react-router-dom';


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

// ✅ Separate plugin to access editor instance
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
  const res = await fetch("http://localhost:5000/api/stories", { // ✅ make sure full URL
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      story,
      createdAt: new Date().toISOString()
    })
  });

  const data = await res.json(); // ← capture response
  console.log("Server response:", data); // ✅ log result

if (res.ok) {
  alert("Story submitted!");
  navigate("/Story"); // ✅ lowercase, and correctly invoked
} else {
  alert("Failed to submit story.");
}
};



  const handleRephrase = async () => {
    try {
      const res = await fetch("/api/rephrase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: story }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Server error (${res.status}): ${errorText}`);
      }

      const data = await res.json();
      if (!data.rephrased) throw new Error("AI response missing `rephrased` text");

      // ✅ Actually update Lexical content
      if (editorInstance) {
        editorInstance.update(() => {
          const root = $getRoot();
          root.clear();
          const para = $createParagraphNode();
          para.append($createTextNode(data.rephrased));
          root.append(para);
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
      <LexicalComposer initialConfig={editorConfig}>
        <EditorRefPlugin setEditor={setEditorInstance} />
        <RichTextPlugin
          contentEditable={<ContentEditable className="editor-input" />}
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
