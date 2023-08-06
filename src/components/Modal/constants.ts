import SignupModal from "./modals/SignupModal";

export const MODAL_SIGNUP = "MODAL_SIGNUP";
export const MODAL_INSERT_IMAGE = "MODAL_INSERT_IMAGE";

export type ModalType = typeof MODAL_SIGNUP | typeof MODAL_INSERT_IMAGE;

export const MODAL_TYPES = {
  MODAL_SIGNUP,
  MODAL_INSERT_IMAGE,
};

export const ModalMap = {
  [MODAL_TYPES.MODAL_SIGNUP]: SignupModal,
  [MODAL_TYPES.MODAL_INSERT_IMAGE]: SignupModal,
};
