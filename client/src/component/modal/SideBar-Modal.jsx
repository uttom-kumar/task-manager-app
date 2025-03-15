import React, {useEffect} from 'react';
import {IoCloseSharp} from "react-icons/io5";

const SideBarModal = ({ isVisible, onClose, children }) => {
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isVisible]);

  const handleClose = (e) => {
    if (e.target.id === 'wrapper') onClose();
  };

  if (!isVisible) return null;


  return (
    <div className="block md:hidden">
      <div
        className="fixed inset-0 flex flex-col justify-center items-start mt-[72px] z-50"
        id="wrapper"
        onClick={handleClose}
        style={{background:"rgba(0, 0, 0, 0.2)"}}
      >
        <div
          className="h-screen rounded z-[99999]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default SideBarModal;