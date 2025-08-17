import { RawBook, Book } from './types';

import { mockServer } from 'shared/utils/mockServer';
import { handleResponse } from 'shared/utils/http/handleResponse';
import { transformBook } from './transform';

export const getBooks = async (): Promise<Book[]> => {
    const response = await mockServer('books', 'GET');
    const rawBooks: RawBook[] = await handleResponse(response);
    return rawBooks.map(transformBook);
};
