import { useState } from "react";

export const useModal = initialContent => {
  const [showModal, setShowModal] = useState(false);
  const [contentModal, setContentModal] = useState(initialContent);

  const handleCloseModal = () => {
    setShowModal(false);
    setContentModal(initialContent);
  };

  const handleShowModal = () => setShowModal(true);

  return {
    showModal,
    contentModal,
    setContentModal,
    handleShowModal,
    handleCloseModal
  };
};
