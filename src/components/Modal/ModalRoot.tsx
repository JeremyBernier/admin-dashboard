import React from "react";
import useModalState from "./hooks/useModalState";
import { ModalMap } from "./constants";

const ModalRoot = () => {
  const activeModal = useModalState((state) => state.activeModal);
  const modalProps = useModalState((state) => state.modalProps);
  const updateActiveModal = useModalState((state) => state.updateActiveModal);

  const modalObj = activeModal && ModalMap[activeModal];
  const Component = modalObj || {};

  const onCloseModal = () => {
    updateActiveModal(undefined);
  };

  if (activeModal && Component) {
    return <Component onClose={onCloseModal} {...modalProps} />;
  }
  return <></>;
};

export default ModalRoot;
