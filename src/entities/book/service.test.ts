import { getBooks } from './service';

import { mockServer } from 'shared/utils/mockServer';
import { handleResponse } from 'shared/utils/http/handleResponse';
import { transformBook } from './transform';

import { mockRawBooks } from './mock.mock';

jest.mock('shared/utils/mockServer');
jest.mock('shared/utils/http/handleResponse');
jest.mock('./transform');

describe('getBooks', () => {
    it('fetches books and transforms them', async () => {
        (mockServer as jest.Mock).mockResolvedValue({
            ok: true,
            status: 200,
            json: async () => mockRawBooks,
        });
        (handleResponse as jest.Mock).mockImplementation(async resp => resp.json());
        (transformBook as jest.Mock).mockImplementation(book => ({ id: book.id }));

        const result = await getBooks();

        expect(mockServer).toHaveBeenCalledWith('books', 'GET');
        expect(handleResponse).toHaveBeenCalled();
        expect(transformBook).toHaveBeenCalledTimes(mockRawBooks.length);
        expect(result).toEqual(mockRawBooks.map(b => ({ id: b.id })));
    });

    it('throws error if fetch fails', async () => {
        (mockServer as jest.Mock).mockResolvedValue({
            ok: false,
            status: 500,
            json: async () => ({ message: 'fail' }),
        });
        (handleResponse as jest.Mock).mockImplementation(() => {
            throw new Error('fail');
        });

        await expect(getBooks()).rejects.toThrow('fail');
    });
});
