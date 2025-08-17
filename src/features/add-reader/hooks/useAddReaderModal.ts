import { useState } from 'react';
import { FormTypes } from 'features/add-reader/form/types';

interface UseAddReaderModalProps {
    onSubmit?: (data: FormTypes) => Promise<void>;
}

export function useAddReaderModal({ onSubmit }: UseAddReaderModalProps = {}) {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const submitModal = async (data: FormTypes) => {
        if (onSubmit) {
            await onSubmit(data);
        }
        closeModal();
    };

    return { isOpen, openModal, closeModal, submitModal };
}
