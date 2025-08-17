import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Modal from './Modal';

describe('Modal', () => {
    beforeEach(() => {
        const modalRoot = document.createElement('div');
        modalRoot.setAttribute('id', 'modal');
        document.body.appendChild(modalRoot);
    });

    afterEach(() => {
        const modalRoot = document.getElementById('modal');
        if (modalRoot) document.body.removeChild(modalRoot);
    });

    it('renders title when provided', () => {
        render(
            <Modal title="Test Title" onClose={() => {}}>
                <div>Content</div>
            </Modal>
        );
        expect(screen.getByText('Test Title')).toBeInTheDocument();
    });

    it('renders children content', () => {
        render(
            <Modal onClose={() => {}}>
                <div>Inner Content</div>
            </Modal>
        );
        expect(screen.getByText('Inner Content')).toBeInTheDocument();
    });

    it('calls onClose when close button is clicked', () => {
        const handleClose = jest.fn();
        render(
            <Modal title="Closable Modal" onClose={handleClose}>
                <div>Content</div>
            </Modal>
        );

        const closeButton = screen.getByRole('button');
        fireEvent.click(closeButton);

        expect(handleClose).toHaveBeenCalledTimes(1);
    });
});
