import React, { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  const backdropStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  };

  const modalStyle: React.CSSProperties = {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    minWidth: '300px',
    maxWidth: '90%',
    boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
    position: 'relative',
  };

  const closeButtonStyle: React.CSSProperties = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'transparent',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
  };

  return (
    <div style={backdropStyle} onClick={onClose}>
      <div
        style={modalStyle}
        onClick={e => e.stopPropagation()} // prevent closing when clicking inside modal
      >
        <button
          style={closeButtonStyle}
          onClick={onClose}
          aria-label="Close modal"
          type="button"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
