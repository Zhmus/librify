import { useReadersData } from 'composites/readers-section/hooks/useReadersData';
import { useReadersController } from 'features/browse-readers/hooks/useReadersController';

import { useReaderInfoModal } from 'features/reader-info/hooks/useReaderInfoModal';
import { useBookReturnModal } from 'features/return-book/hooks/useBookReturnModal';
import { useAddReaderModal } from 'features/add-reader/hooks/useAddReaderModal';
import { useAddReader } from 'features/add-reader/hooks/useAddReader';

import { FormTypes } from 'features/add-reader/form/types';

export function useReadersManager() {
    const { enrichedReaders, loading, error } = useReadersData();
    const { listState, resultItems } = useReadersController(enrichedReaders);

    const bookReturnModal = useBookReturnModal();
    const readerInfoModal = useReaderInfoModal();

    const addReader = useAddReader();
    const addReaderModal = useAddReaderModal({
        onSubmit: async (data: FormTypes) => {
            await addReader(data);
            listState.sortingState.setSorting({ field: 'registeredAt', order: 'desc' });
        },
    });

    return {
        loadStatus: { loading, error },
        list: { states: listState, items: resultItems },
        bookReturnModal,
        readerInfoModal,
        addReaderModal,
    };
}
