import { Book } from 'entities/book/types';

export const useTotalBooksCard = (books: Book[]) => {
    return {
        total: books.length,
    };
};
