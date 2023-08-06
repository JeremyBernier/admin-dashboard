import React, { useEffect, useRef } from "react";
import { $getRoot } from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { EMPTY_CONTENT } from "../constants";

const DefaultValuePlugin = ({
  defaultValue,
}: // id,
{
  // id?: string;
  defaultValue?: string;
}): null => {
  // const idRef = useRef(id);
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    // if (idRef.current !== id) {
    editor.update(() => {
      let editorState;
      try {
        const editorStateToParse =
          defaultValue == null
            ? EMPTY_CONTENT
            : typeof defaultValue === "string"
            ? defaultValue
            : JSON.stringify(defaultValue);

        editorState = editor.parseEditorState(editorStateToParse);
        editor.setEditorState(editorState);
      } catch (err) {
        console.error(err);
      }
    });
    // }
    // idRef.current = id;
  }, [defaultValue, editor]);

  return null;
};

export default DefaultValuePlugin;
