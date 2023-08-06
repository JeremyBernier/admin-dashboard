import ExampleTheme from "./themes/ExampleTheme";
import { HeadingNode, QuoteNode, registerRichText } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { ImageNode } from "./ui/ImageNode/ImageNode";

export const createInitialConfig = (content?: any) => ({
  namespace: "AdminDashboard",
  // The editor theme
  theme: ExampleTheme,
  // editorState: prepopulatedRichText,
  ...(content && { editorState: content }),
  // Handling of errors during update
  onError(error) {
    throw error;
  },
  // Any custom nodes go here
  nodes: [
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    CodeNode,
    CodeHighlightNode,
    TableNode,
    TableCellNode,
    TableRowNode,
    AutoLinkNode,
    LinkNode,
    ImageNode,
  ],
});
