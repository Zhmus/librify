import React, { FC, ReactNode } from 'react';
import { createPortal } from 'react-dom';

type ModalProps = {
    title?: string;
    onClose: () => void;
    children: ReactNode;
};

const Modal: FC<ModalProps> = ({ title, onClose, children }) => {
    const modalRoot = document.getElementById('modal');
    if (!modalRoot) return null;

    return createPortal(
        <div
            className="modal show d-block"
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        {title && <h5 className="modal-title">{title}</h5>}
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">{children}</div>
                </div>
            </div>
        </div>,
        modalRoot
    );
};

export default Modal;
