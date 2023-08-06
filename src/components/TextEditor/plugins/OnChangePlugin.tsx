/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { EditorState, LexicalEditor } from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect, useState } from "react";

export function OnChangePlugin({
  ignoreHistoryMergeTagChange = true,
  ignoreSelectionChange = false,
  onChange,
}: {
  ignoreHistoryMergeTagChange?: boolean;
  ignoreSelectionChange?: boolean;
  onChange: (editorState: EditorState, editor: LexicalEditor) => void;
}): null {
  const [editor] = useLexicalComposerContext();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // return () => console.log("onChangePlugin is unmounting");
  }, []);

  useEffect(() => {
    if (onChange) {
      return editor.registerUpdateListener(
        ({
          editorState,
          dirtyElements,
          dirtyLeaves,
          prevEditorState,
          tags,
        }) => {
          if (!isMounted) {
            return;
          }
          if (
            (ignoreSelectionChange &&
              dirtyElements.size === 0 &&
              dirtyLeaves.size === 0) ||
            (ignoreHistoryMergeTagChange && tags.has("history-merge")) ||
            prevEditorState.isEmpty()
          ) {
            return;
          }

          // not sure wtf this is but somehow seems to work
          if (dirtyElements.size === 1 && !dirtyElements.get("root")) {
            return;
          }

          onChange(editorState, editor);
        }
      );
    }
  }, [
    editor,
    ignoreHistoryMergeTagChange,
    ignoreSelectionChange,
    onChange,
    isMounted,
  ]);

  return null;
}
