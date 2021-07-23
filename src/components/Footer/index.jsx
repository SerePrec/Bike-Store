import React from "react";
import FooterInfo from "../FooterInfo";
import FooterNewsletter from "../FooterNewsletter";
import FooterSocial from "../FooterSocial";
import TermsModal from "../TermsModal";
import UserModal from "../UserModal";
import { useModal } from "../../hooks/useModal";
import { infoModalMessages } from "../../utils/modalMessages.js";
import "./Footer.scss";

const Footer = () => {
  const {
    showModal: showTermsModal,
    handleShowModal: handleShowTermsModal,
    handleCloseModal: handleCloseTermsModal
  } = useModal(null);
  const {
    showModal: showUserModal,
    contentModal: contentUserModal,
    setContentModal: setContentUserModal,
    handleShowModal: handleShowUserModal,
    handleCloseModal: handleCloseUserModal
  } = useModal(infoModalMessages[0]);

  return (
    <footer>
      <div className="footerContent">
        <FooterInfo />
        <FooterNewsletter
          handleShowTermsModal={handleShowTermsModal}
          handleShowUserModal={handleShowUserModal}
          setContentUserModal={setContentUserModal}
        />
        <FooterSocial />
      </div>
      <address>
        <p className="font-italic">Copyright &copy; 2021 SerE PreC </p>
      </address>
      <TermsModal
        showModal={showTermsModal}
        handleCloseModal={handleCloseTermsModal}
      ></TermsModal>
      <UserModal
        showModal={showUserModal}
        handleCloseModal={handleCloseUserModal}
        contentModal={contentUserModal}
        noLink
      ></UserModal>
    </footer>
  );
};

export default Footer;
