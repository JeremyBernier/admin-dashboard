import React from "react";
import Modal from "../containers/Modal";
// import EmailSignupForm from "src/components/EmailSignupForm";

const SignupModal = ({ onClose }) => {
  return (
    <Modal onClose={onClose}>
      <div>Sample modal</div>
      {/* <EmailSignupForm onClose={onClose} /> */}
    </Modal>
  );
};

export default SignupModal;
