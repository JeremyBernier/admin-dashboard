import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { EMPTY_CONTENT } from "../constants";
import usePostState from "src/zustand/usePostState";
import { getPostIdFromPid } from "src/utils/utils";

export default function OnLoadFilePlugin() {
  const hasMounted = useRef(false);
  const router = useRouter();
  const { pid } = router.query;
  const postId = getPostIdFromPid(pid);
  const pidPrevious = useRef(postId);
  const [editor] = useLexicalComposerContext();
  const postMap = usePostState((state) => state.postMap);

  useEffect(() => {
    editor.update(() => {
      const postId = getPostIdFromPid(pid);
      const post = postMap[postId];

      if (pidPrevious.current === postId && hasMounted.current) {
        return;
      }
      pidPrevious.current = postId;

      let editorState;
      try {
        editorState = editor.parseEditorState(post?.content || EMPTY_CONTENT);
      } catch (err) {
        editorState = editor.parseEditorState(EMPTY_CONTENT);
      }
      editor.setEditorState(editorState);
      hasMounted.current = true;
    });
  }, [pid, postId, editor]);

  return null;
}
