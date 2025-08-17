import { Book } from 'entities/book/types';

export type BookState = {
    items: Book[];
    loading: boolean;
    error: Error | null;
};
