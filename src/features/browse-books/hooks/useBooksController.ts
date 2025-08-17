import { BookEnriched } from 'entities/book/types';

import { useCategories } from 'shared/hooks/lists/useCategories';
import { useBooksFilters } from 'features/browse-books/hooks/useBooksFilters';
import { useListController } from 'shared/hooks/lists/useListController';

export const useBooksController = (books: BookEnriched[]) => {
    const genres = useCategories(books, 'genre');

    const { filtersState, resultItems: filteredItems } = useBooksFilters(books);

    const { resultItems, listState } = useListController<BookEnriched, typeof filtersState>(
        filteredItems,
        filtersState
    );

    return {
        categories: { genres },
        listState,
        resultItems,
    };
};
