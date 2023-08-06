import React, { useEffect, useMemo } from "react";
import {
  $createLineBreakNode,
  $createTextNode,
  $isTextNode,
  $getNearestNodeFromDOMNode,
  $createParagraphNode,
  ElementNode,
  Klass,
  LexicalNode,
  TextFormatType,
  TextNode,
} from "lexical";
import {
  $createHeadingNode,
  $createQuoteNode,
  $isHeadingNode,
  $isQuoteNode,
  HeadingNode,
  QuoteNode,
} from "@lexical/rich-text";
import type { ElementTransformer } from "../Markdown";
import type { HeadingTagType } from "@lexical/rich-text";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $createCodeNode, $isCodeNode, CodeNode } from "@lexical/code";
import useModalState from "src/components/Modal/hooks/useModalState";
import { MODAL_INSERT_IMAGE } from "src/components/Modal/constants";

const BLOCK_MENU_CLASSNAME = "block-menu";

export function isOnBlockMenu(element: HTMLElement): boolean {
  return Boolean(element.closest(`.${BLOCK_MENU_CLASSNAME}`));
}

const createBlockNode = (
  createNode: () => ElementNode
): ElementTransformer["replace"] => {
  return (parentNode, children) => {
    const node = createNode();
    // node.append(...children);
    parentNode.replace(node);
    node.select(0, 0);
  };
};

const BlockMenu = ({ top, left, onClose, blockEl }) => {
  const [editor] = useLexicalComposerContext();
  const updateActiveModal = useModalState((state) => state.updateActiveModal);

  const blocks = useMemo(
    () => [
      {
        name: "Text",
        replace: createBlockNode(() => {
          return $createParagraphNode();
        }),
      },
      {
        name: "Heading 1",
        replace: createBlockNode(() => {
          return $createHeadingNode("h1");
        }),
      },
      {
        name: "Heading 2",
        replace: createBlockNode(() => {
          return $createHeadingNode("h2");
        }),
      },
      {
        name: "Heading 3",
        replace: createBlockNode(() => {
          return $createHeadingNode("h3");
        }),
      },
      {
        name: "Image",
        onClick: () => {
          updateActiveModal(MODAL_INSERT_IMAGE, {
            activeEditor: editor,
          });
        },
      },
      {
        name: "Code",
        replace: createBlockNode((match) => {
          return $createCodeNode(match ? match[1] : undefined);
        }),
      },
    ],
    [updateActiveModal]
  );

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <div
      className={`${BLOCK_MENU_CLASSNAME} bg-gray-800 py-3 max-h-48 w-full max-w-xs overflow-auto fixed z-10`}
      style={{
        top,
        left,
      }}
    >
      <div className="text-xs px-3 pb-1 text-gray-400">Blocks</div>
      <ul>
        {blocks.map((block) => (
          <li
            key={block.name}
            className="hover-menu cursor-pointer px-3"
            onClick={() => {
              editor.update(() => {
                const parentEl = $getNearestNodeFromDOMNode(blockEl);
                block?.replace?.(parentEl);
              });
              block?.onClick?.();
              onClose();
            }}
          >
            {block.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlockMenu;
