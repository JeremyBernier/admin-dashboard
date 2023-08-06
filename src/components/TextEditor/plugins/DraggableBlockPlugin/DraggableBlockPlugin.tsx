/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { eventFiles } from "@lexical/rich-text";
import { mergeRegister } from "@lexical/utils";
import {
  $getSelection,
  $isRangeSelection,
  $getNearestNodeFromDOMNode,
  $getNodeByKey,
  $getRoot,
  COMMAND_PRIORITY_HIGH,
  COMMAND_PRIORITY_LOW,
  DRAGOVER_COMMAND,
  DROP_COMMAND,
  LexicalEditor,
  RangeSelection,
} from "lexical";
import * as React from "react";
import {
  DragEvent as ReactDragEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

import { isHTMLElement } from "../../utils/guard";
import PlusSign from "src/icons/plus.svg";
import getBlockElement from "./getBlockElement";
import BlockMenu, { isOnBlockMenu } from "./BlockMenu";
import {
  LexicalTypeaheadMenuPlugin,
  useBasicTypeaheadTriggerMatch,
} from "@lexical/react/LexicalTypeaheadMenuPlugin";

const SPACE = -12;
const TARGET_LINE_HALF_HEIGHT = 2;
const DRAGGABLE_BLOCK_MENU_CLASSNAME = "draggable-block-menu";
const DRAG_DATA_FORMAT = "application/x-lexical-drag-block";
const TEXT_BOX_HORIZONTAL_PADDING = 28;

function isOnMenu(element: HTMLElement): boolean {
  return Boolean(element.closest(`.${DRAGGABLE_BLOCK_MENU_CLASSNAME}`));
}

function getTextUpToAnchor(selection: RangeSelection): string | null {
  const anchor = selection.anchor;
  if (anchor.type !== "text") {
    return null;
  }
  const anchorNode = anchor.getNode();
  if (!anchorNode.isSimpleText()) {
    return null;
  }
  const anchorOffset = anchor.offset;
  return anchorNode.getTextContent().slice(0, anchorOffset);
}

function getQueryTextForSearch(editor: LexicalEditor): string | null {
  let text: string | null = null;
  editor.getEditorState().read(() => {
    const selection = $getSelection();
    if (!$isRangeSelection(selection)) {
      return;
    }
    text = getTextUpToAnchor(selection);
  });
  return text;
}

function setMenuPosition(
  targetElem: HTMLElement | null,
  floatingElem: HTMLElement,
  anchorElem: HTMLElement
) {
  if (!targetElem) {
    floatingElem.style.opacity = "0";
    floatingElem.style.transform = "translate(-10000px, -10000px)";
    return;
  }

  const targetRect = targetElem.getBoundingClientRect();
  const targetStyle = window.getComputedStyle(targetElem);
  const floatingElemRect = floatingElem.getBoundingClientRect();
  const anchorElementRect = anchorElem.getBoundingClientRect();

  const top =
    targetRect.top +
    (parseInt(targetStyle.lineHeight, 10) - floatingElemRect.height) / 2 -
    anchorElementRect.top;

  const left = SPACE;

  floatingElem.style.opacity = "1";
  floatingElem.style.transform = `translate(${left}px, ${top}px)`;
}

function setDragImage(
  dataTransfer: DataTransfer,
  draggableBlockElem: HTMLElement
) {
  const { transform } = draggableBlockElem.style;

  // Remove dragImage borders
  draggableBlockElem.style.transform = "translateZ(0)";
  dataTransfer.setDragImage(draggableBlockElem, 0, 0);

  setTimeout(() => {
    draggableBlockElem.style.transform = transform;
  });
}

function setTargetLine(
  targetLineElem: HTMLElement,
  targetBlockElem: HTMLElement,
  mouseY: number,
  anchorElem: HTMLElement
) {
  const targetStyle = window.getComputedStyle(targetBlockElem);
  const { top: targetBlockElemTop, height: targetBlockElemHeight } =
    targetBlockElem.getBoundingClientRect();
  const { top: anchorTop, width: anchorWidth } =
    anchorElem.getBoundingClientRect();

  let lineTop = targetBlockElemTop;
  // At the bottom of the target
  if (mouseY - targetBlockElemTop > targetBlockElemHeight / 2) {
    lineTop += targetBlockElemHeight + parseFloat(targetStyle.marginBottom);
  } else {
    lineTop -= parseFloat(targetStyle.marginTop);
  }

  const top = lineTop - anchorTop - TARGET_LINE_HALF_HEIGHT;
  const left = TEXT_BOX_HORIZONTAL_PADDING - SPACE;

  targetLineElem.style.transform = `translate(${left}px, ${top}px)`;
  targetLineElem.style.width = `${
    anchorWidth - (TEXT_BOX_HORIZONTAL_PADDING - SPACE) * 2
  }px`;
  targetLineElem.style.opacity = ".4";
}

function hideTargetLine(targetLineElem: HTMLElement | null) {
  if (targetLineElem) {
    targetLineElem.style.opacity = "0";
    targetLineElem.style.transform = "translate(-10000px, -10000px)";
  }
}

function useDraggableBlockMenu(
  editor: LexicalEditor,
  anchorElem: HTMLElement,
  isEditable: boolean
): JSX.Element {
  const scrollerElem = anchorElem.parentElement;

  // const checkForTriggerMatch = useBasicTypeaheadTriggerMatch("/", {
  //   minLength: 0,
  // });

  const menuRef = useRef<HTMLDivElement>(null);
  const targetLineRef = useRef<HTMLDivElement>(null);
  const [draggableBlockElem, setDraggableBlockElem] =
    useState<HTMLElement | null>(null);

  const [showCreateBlock, setShowCreateBlock] = useState(false);
  const [componentMenuCoords, setComopnentMenuCoords] = useState([null, null]);

  useEffect(() => {
    if (showCreateBlock) {
      const onMouseDown = (event) => {
        if (!isOnBlockMenu(event.target) && !isOnMenu(event.target)) {
          // event.preventDefault();
          // event.stopPropagation();
          setShowCreateBlock(false);
        }
      };

      window.addEventListener("mousedown", onMouseDown);

      return () => {
        window.removeEventListener("mousedown", onMouseDown);
      };
    }
    function onMouseMove(event: MouseEvent) {
      const target = event.target;
      if (!isHTMLElement(target) && !(target instanceof SVGElement)) {
        setDraggableBlockElem(null);
        return;
      }

      if (isOnMenu(target)) {
        return;
      }

      const _draggableBlockElem = getBlockElement(anchorElem, editor, event);

      setDraggableBlockElem(_draggableBlockElem);
    }

    function onMouseLeave() {
      setDraggableBlockElem(null);
    }

    scrollerElem?.addEventListener("mousemove", onMouseMove);
    scrollerElem?.addEventListener("mouseleave", onMouseLeave);

    return () => {
      scrollerElem?.removeEventListener("mousemove", onMouseMove);
      scrollerElem?.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [scrollerElem, anchorElem, editor, showCreateBlock]);

  useEffect(() => {
    if (menuRef.current) {
      setMenuPosition(draggableBlockElem, menuRef.current, anchorElem);
    }
  }, [anchorElem, draggableBlockElem]);

  useEffect(() => {
    function onDragover(event: DragEvent): boolean {
      const [isFileTransfer] = eventFiles(event);
      if (isFileTransfer) {
        return false;
      }
      const { pageY, target } = event;
      if (!isHTMLElement(target)) {
        return false;
      }
      const targetBlockElem = getBlockElement(anchorElem, editor, event);
      const targetLineElem = targetLineRef.current;
      if (targetBlockElem === null || targetLineElem === null) {
        return false;
      }
      setTargetLine(targetLineElem, targetBlockElem, pageY, anchorElem);
      // Prevent default event to be able to trigger onDrop events
      event.preventDefault();
      return true;
    }

    function onDrop(event: DragEvent): boolean {
      const [isFileTransfer] = eventFiles(event);
      if (isFileTransfer) {
        return false;
      }
      const { target, dataTransfer, pageY } = event;
      const dragData = dataTransfer?.getData(DRAG_DATA_FORMAT) || "";
      const draggedNode = $getNodeByKey(dragData);
      if (!draggedNode) {
        return false;
      }
      if (!isHTMLElement(target)) {
        return false;
      }
      const targetBlockElem = getBlockElement(anchorElem, editor, event);
      if (!targetBlockElem) {
        return false;
      }
      const targetNode = $getNearestNodeFromDOMNode(targetBlockElem);
      if (!targetNode) {
        return false;
      }
      if (targetNode === draggedNode) {
        return true;
      }
      const { top, height } = targetBlockElem.getBoundingClientRect();
      const shouldInsertAfter = pageY - top > height / 2;
      if (shouldInsertAfter) {
        targetNode.insertAfter(draggedNode);
      } else {
        targetNode.insertBefore(draggedNode);
      }
      setDraggableBlockElem(null);

      return true;
    }

    return mergeRegister(
      editor.registerCommand(
        DRAGOVER_COMMAND,
        (event) => {
          return onDragover(event);
        },
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand(
        DROP_COMMAND,
        (event) => {
          return onDrop(event);
        },
        COMMAND_PRIORITY_HIGH
      )
    );
  }, [anchorElem, editor]);

  // useEffect(() => {
  //   const updateListener = () => {
  //     editor.getEditorState().read(() => {
  //       const range = document.createRange();
  //       const selection = $getSelection();
  //       const text = getQueryTextForSearch(editor);

  //       console.log("text", text);

  //       if (text === "/") {
  //         setShowCreateBlock(true);
  //       } else {
  //         setShowCreateBlock(false);
  //       }

  //       // if (
  //       //   !$isRangeSelection(selection) ||
  //       //   !selection.isCollapsed() ||
  //       //   text === null ||
  //       //   range === null
  //       // ) {
  //       //   setShowCreateBlock(false);
  //       //   // closeTypeahead();
  //       //   return;
  //       // }

  //       // const match = checkForTriggerMatch(text, editor);
  //       // onQueryChange(match ? match.matchingString : null);

  //       // if (
  //       //   match !== null &&
  //       //   !isSelectionOnEntityBoundary(editor, match.leadOffset)
  //       // ) {
  //       //   const isRangePositioned = tryToPositionRange(match.leadOffset, range);
  //       //   if (isRangePositioned !== null) {
  //       //     startTransition(() =>
  //       //       openTypeahead({
  //       //         getRect: () => range.getBoundingClientRect(),
  //       //         match,
  //       //       })
  //       //     );
  //       //     return;
  //       //   }
  //       // }
  //       // closeTypeahead();
  //     });
  //   };

  //   const removeUpdateListener = editor.registerUpdateListener(updateListener);

  //   return () => {
  //     removeUpdateListener();
  //   };
  // }, []);

  function onDragStart(event: ReactDragEvent<HTMLDivElement>): void {
    const dataTransfer = event.dataTransfer;
    if (!dataTransfer || !draggableBlockElem) {
      return;
    }
    setDragImage(dataTransfer, draggableBlockElem);
    let nodeKey = "";
    editor.update(() => {
      const node = $getNearestNodeFromDOMNode(draggableBlockElem);
      if (node) {
        nodeKey = node.getKey();
      }
    });
    dataTransfer.setData(DRAG_DATA_FORMAT, nodeKey);
  }

  function onDragEnd(): void {
    hideTargetLine(targetLineRef.current);
  }

  const draggableBlockCoords = draggableBlockElem?.getBoundingClientRect?.();

  return createPortal(
    <>
      {showCreateBlock && (
        <BlockMenu
          top={draggableBlockCoords?.top + 30}
          left={draggableBlockCoords?.left}
          onClose={() => setShowCreateBlock(false)}
          blockEl={draggableBlockElem}
        />
      )}
      <div
        className={`icon ${DRAGGABLE_BLOCK_MENU_CLASSNAME}`}
        // className="icon draggable-block-menu flex items-center"
        ref={menuRef}
        draggable={true}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        <button
          className="text-white opacity-30 cursor-pointer"
          onClick={(event) => {
            // event.preventDefault();
            // event.stopPropagation();
            setShowCreateBlock(!showCreateBlock);
          }}
        >
          <PlusSign className="theme-text-color" />
        </button>
        <div className={isEditable ? "icon" : ""} />
      </div>
      <div className="draggable-block-target-line" ref={targetLineRef} />
    </>,
    anchorElem
  );
}

export default function DraggableBlockPlugin({
  anchorElem = document.body,
}: {
  anchorElem?: HTMLElement;
}): JSX.Element {
  const [editor] = useLexicalComposerContext();
  return useDraggableBlockMenu(editor, anchorElem, editor._editable);
}
