import React from "react";
import {
  FORMAT_TEXT_COMMAND,
  FORMAT_ELEMENT_COMMAND
} from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

export const ToolbarPlugin = () => {
  const [editor] = useLexicalComposerContext();

  return (
    <div className="toolbar">
      <button onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}>B</button>
      <button onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")}>I</button>
      <button onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "h1")}>H1</button>
      <button onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "h2")}>H2</button>
    </div>
  );
};
