import { useState } from 'react';

export function useBookCheckoutModal() {
    const [selectedBookId, setSelectedBookId] = useState<number | null>(null);

    const openModal = (bookId: number) => setSelectedBookId(bookId);
    const closeModal = () => setSelectedBookId(null);

    return {
        selectedBookId,
        openModal,
        closeModal,
    };
}
