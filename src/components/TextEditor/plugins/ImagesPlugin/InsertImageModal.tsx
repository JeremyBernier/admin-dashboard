import type { InsertImagePayload } from "./ImagesPlugin";
import {
  $createParagraphNode,
  $createRangeSelection,
  $getSelection,
  $insertNodes,
  $isNodeSelection,
  $isRootOrShadowRoot,
  $setSelection,
  COMMAND_PRIORITY_EDITOR,
  COMMAND_PRIORITY_HIGH,
  COMMAND_PRIORITY_LOW,
  createCommand,
  DRAGOVER_COMMAND,
  DRAGSTART_COMMAND,
  DROP_COMMAND,
  LexicalCommand,
  LexicalEditor,
} from "lexical";
import { useEffect, useRef, useState } from "react";
import { DialogButtonsList } from "../../ui/Dialog/Dialog";
import Button from "../../ui/Button/Button";
import {
  INSERT_IMAGE_COMMAND,
  InsertImageUriDialogBody,
  InsertImageUploadedDialogBody,
} from "./ImagesPlugin";

import landscapeImage from "../../images/landscape.jpg";
import yellowFlowerImage from "../../images/yellow-flower.jpg";

export default function InsertImageDialog({
  activeEditor,
  onClose,
}: {
  activeEditor: LexicalEditor;
  onClose: () => void;
}): JSX.Element {
  const [mode, setMode] = useState<null | "url" | "file">(null);
  const hasModifier = useRef(false);

  useEffect(() => {
    hasModifier.current = false;
    const handler = (e: KeyboardEvent) => {
      hasModifier.current = e.altKey;
    };
    document.addEventListener("keydown", handler);
    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, [activeEditor]);

  const onClick = (payload: InsertImagePayload) => {
    activeEditor.dispatchCommand(INSERT_IMAGE_COMMAND, payload);
    onClose();
  };

  return (
    <>
      {!mode && (
        <DialogButtonsList>
          {/* <Button
            data-test-id="image-modal-option-sample"
            onClick={() =>
              onClick(
                hasModifier.current
                  ? {
                      altText:
                        "Daylight fir trees forest glacier green high ice landscape",
                      src: landscapeImage,
                    }
                  : {
                      altText: "Yellow flower in tilt shift lens",
                      src: yellowFlowerImage,
                    }
              )
            }
          >
            Sample
          </Button> */}
          <Button
            data-test-id="image-modal-option-url"
            onClick={() => setMode("url")}
          >
            URL
          </Button>
          <Button
            data-test-id="image-modal-option-file"
            onClick={() => setMode("file")}
          >
            File
          </Button>
        </DialogButtonsList>
      )}
      {mode === "url" && <InsertImageUriDialogBody onClick={onClick} />}
      {mode === "file" && <InsertImageUploadedDialogBody onClick={onClick} />}
    </>
  );
}
