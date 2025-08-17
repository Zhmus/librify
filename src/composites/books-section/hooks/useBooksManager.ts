import { useBooksData } from 'composites/books-section/hooks/useBooksData';
import { useBooksController } from 'features/browse-books/hooks/useBooksController';
import { useBookCheckoutModal } from 'features/checkout-book/hooks/useBookCheckoutModal';

export function useBooksManager() {
    const { enrichedBooks, loading, error } = useBooksData();
    const { categories, listState, resultItems } = useBooksController(enrichedBooks);
    const bookCheckoutModal = useBookCheckoutModal();

    return {
        loadStatus: { loading, error },
        list: { uiState: listState, displayItems: resultItems, categories },
        bookCheckoutModal,
    };
}
