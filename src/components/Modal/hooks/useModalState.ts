import type { ModalType } from "../constants";
import { create } from "zustand";

interface ModalState {
  activeModal?: ModalType;
  modalProps: any;
  updateActiveModal: (activeModal?: ModalType, props?: any) => void;
}

/** State */

const stateFn: (set: any, get: any) => ModalState = (set, get) => ({
  activeModal: undefined,
  modalProps: {},
  updateActiveModal: async (activeModal?: ModalType, props?: any) => {
    set((state) => ({
      activeModal,
      modalProps: {
        ...props,
      },
    }));
  },
});

const useModalState = create<ModalState>(stateFn);

export default useModalState;
