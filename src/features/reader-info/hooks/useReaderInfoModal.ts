import { useState } from 'react';
import { ReaderEnriched } from 'entities/reader/types';

export function useReaderInfoModal() {
    const [selectedReader, setSelectedReader] = useState<ReaderEnriched | null>(null);

    const openModal = (selectedReader: ReaderEnriched) => setSelectedReader(selectedReader);
    const closeModal = () => setSelectedReader(null);

    return {
        selectedReader,
        openModal,
        closeModal,
    };
}
