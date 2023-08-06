import React, { useEffect } from "react";
import { $getRoot, $insertNodes } from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $generateNodesFromDOM, $generateHtmlFromNodes } from "@lexical/html";
import {
  $convertFromMarkdownString,
  $convertToMarkdownString,
  TRANSFORMERS,
} from "@lexical/markdown";

function saveFile(blob: Blob, filename: string) {
  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(blob, filename);
  } else {
    const a = document.createElement("a");
    document.body.appendChild(a);
    const url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = filename;
    a.click();
    setTimeout(() => {
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }, 0);
  }
}

const ExportPlugin = () => {
  const [editor] = useLexicalComposerContext();

  const exportMarkdown = (filename) => {
    editor.update(() => {
      const markdown = $convertToMarkdownString(TRANSFORMERS);
      const blob = new Blob([markdown], {
        type: "text/plain",
      });
      saveFile(blob, filename);
    });
  };

  const exportHtml = (filename) => {
    editor.update(() => {
      const htmlString = $generateHtmlFromNodes(editor, null);
      const blob = new Blob([htmlString], {
        type: "text/plain",
      });
      saveFile(blob, filename);
    });
  };

  const exportJson = (filename) => {
    editor.update(() => {
      const editorState = editor.getEditorState();
      const json = editorState.toJSON();
      // const json = {
      //   editorState,
      // };
      const blob = new Blob([JSON.stringify(json)], {
        type: "application/json",
      });
      saveFile(blob, filename);
    });
  };

  useEffect(() => {
    const handler = (event) => {
      const filename = event.detail?.name || "post";
      switch (event.detail?.type) {
        case "markdown": {
          exportMarkdown(`${filename}.md`);
          break;
        }
        case "html": {
          exportHtml(`${filename}.html`);
          break;
        }
        case "json": {
          exportJson(`${filename}.json`);
          break;
        }
      }
    };

    window.addEventListener("exportFile", handler);

    return () => {
      window.removeEventListener("exportFile", handler);
    };
  }, []);

  return null;
};

export default ExportPlugin;
