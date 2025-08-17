import { createAsyncThunk } from '@reduxjs/toolkit';
import { Book } from 'entities/book/types';
import { getBooks } from 'entities/book/service';

export const loadBooks = createAsyncThunk<Book[]>('books/loadBooks', async () => {
    return await getBooks();
});
