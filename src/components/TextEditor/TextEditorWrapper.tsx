"use client";

import { useEffect } from "react";
import { EMPTY_CONTENT } from "./constants";
import TextEditor from "./TextEditor";
import { createInitialConfig } from "./config";

// value must be Lexical json object
export default function TextEditorWrapper({ id, onChange, value }) {
  let isJSON = false;

  try {
    if (value !== "null") {
      JSON.parse(value);
      isJSON = true;
    }
  } catch (err) {}

  const initialConfig = createInitialConfig(isJSON ? value : EMPTY_CONTENT);

  // const initialConfig = createInitialConfig(
  //   currentFile?.content || EMPTY_CONTENT
  // );

  return (
    <TextEditor
      id={id}
      onChange={onChange}
      initialConfig={initialConfig}
      defaultValue={value}
    />
  );
}
