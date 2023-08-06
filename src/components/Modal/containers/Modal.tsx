import { ReactNode } from "react";
import CloseIcon from "src/icons/close.svg";

const Modal = ({
  children,
  onClose,
  closeOnOutsideClick = true,
}: {
  children: ReactNode;
  onClose?: any;
  closeOnOutsideClick?: boolean;
}) => {
  return (
    <div
      className="fixed inset-0 z-30"
      style={{
        backgroundColor: "hsla(0,0%,0%,.5)",
      }}
      onClick={closeOnOutsideClick ? onClose : null}
    >
      <div
        className="modal-container"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <div className="flex justify-end p-4">
          <button
            type="button"
            onClick={onClose}
            className="transition duration-150 opacity-50 hover:opacity-100"
          >
            <CloseIcon />
          </button>
        </div>
        <div className="modal-content-inner">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
