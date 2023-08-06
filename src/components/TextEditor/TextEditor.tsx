import { useCallback, useMemo, useState } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
// import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import LinkPlugin from "./plugins/LinkPlugin/LinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { MarkdownShortcutPlugin } from "./plugins/Markdown/MarkdownShortcutPlugin";
// import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { TRANSFORMERS } from "./plugins/Markdown";
// import { TRANSFORMERS } from "@lexical/markdown";
import { OnChangePlugin } from "./plugins/OnChangePlugin";
// import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";

import ListMaxIndentLevelPlugin from "./plugins/ListMaxIndentLevelPlugin";
import CodeHighlightPlugin from "./plugins/CodeHighlightPlugin";
import AutoLinkPlugin from "./plugins/AutoLinkPlugin";
import OnLoadFilePlugin from "./plugins/OnLoadFilePlugin";
// import FloatingLinkEditorPlugin from "./plugins/FloatingLinkEditorPlugin/FloatingLinkEditorPlugin";
import ExportPlugin from "./plugins/ExportPlugin";
import ClickableLinkPlugin from "./plugins/ClickableLinkPlugin";
// import ComponentPickerMenuPlugin from "./plugins/ComponentPickerPlugin/ComponentPickerPlugin";
import DraggableBlockPlugin from "./plugins/DraggableBlockPlugin/DraggableBlockPlugin";
import ImagesPlugin from "./plugins/ImagesPlugin/ImagesPlugin";
import FloatingTextFormatToolbarPlugin from "./plugins/FloatingTextFormatToolbarPlugin";
import DefaultValuePlugin from "./plugins/DefaultValuePlugin";
import { createInitialConfig } from "./config";

function Placeholder() {
  return <div className="editor-placeholder">Enter some text...</div>;
}

export default function TextEditor({
  id,
  defaultValue,
  onChange,
}: {
  id?: string;
  onChange?: any;
  defaultValue?: string;
}) {
  // const defaultConfigValue = useMemo(() => {
  //   try {
  //     if (typeof defaultValue === "string" && defaultValue !== "null") {
  //       JSON.parse(defaultValue);
  //       return defaultValue;
  //     }
  //     if (defaultValue?.root) {
  //       return JSON.stringify(defaultValue);
  //     }
  //   } catch (err) {
  //     return undefined;
  //   }
  // }, [defaultValue]);

  // const initialConfig = createInitialConfig(defaultConfigValue);
  const initialConfig = createInitialConfig();

  const [floatingAnchorElem, setFloatingAnchorElem] =
    useState<HTMLDivElement | null>(null);

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="editor-container">
        {/* <ToolbarPlugin /> */}
        <div className="editor-inner">
          <RichTextPlugin
            contentEditable={
              <div className="editor-scroller">
                <div className="editor" ref={onRef}>
                  <ContentEditable className="editor-input ContentEditable__root" />
                </div>
              </div>
            }
            placeholder={<Placeholder />}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          {/* <TreeViewPlugin /> */}
          <AutoFocusPlugin />
          <CodeHighlightPlugin />
          <DefaultValuePlugin defaultValue={defaultValue} />
          <ListPlugin />
          <LinkPlugin />
          <AutoLinkPlugin />
          <ClickableLinkPlugin />
          <ListMaxIndentLevelPlugin maxDepth={7} />
          <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
          {/* <ComponentPickerMenuPlugin /> */}
          {onChange && (
            <OnChangePlugin onChange={onChange} ignoreSelectionChange />
          )}
          {floatingAnchorElem && (
            <>
              <DraggableBlockPlugin anchorElem={floatingAnchorElem} />
              <FloatingTextFormatToolbarPlugin
                anchorElem={floatingAnchorElem}
              />
              {/* <FloatingLinkEditorPlugin anchorElem={floatingAnchorElem} /> */}
            </>
          )}
          {/* <OnLoadFilePlugin /> */}
          <ExportPlugin />
          <ImagesPlugin />
        </div>
      </div>
    </LexicalComposer>
  );
}
