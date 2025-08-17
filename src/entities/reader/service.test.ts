import { getReaders } from './service';

import { mockServer } from 'shared/utils/mockServer';
import { handleResponse } from 'shared/utils/http/handleResponse';
import { transformReader } from './transform';

import { mockRawReaders } from './mock.mock';

jest.mock('shared/utils/mockServer');
jest.mock('shared/utils/http/handleResponse');
jest.mock('./transform');

describe('getReaders', () => {
    it('fetches readers and transforms them', async () => {
        (mockServer as jest.Mock).mockResolvedValue({
            ok: true,
            status: 200,
            json: async () => mockRawReaders,
        });
        (handleResponse as jest.Mock).mockImplementation(async resp => resp.json());
        (transformReader as jest.Mock).mockImplementation(reader => ({ id: reader.id }));

        const result = await getReaders();

        expect(mockServer).toHaveBeenCalledWith('readers', 'GET');
        expect(handleResponse).toHaveBeenCalled();
        expect(transformReader).toHaveBeenCalledTimes(mockRawReaders.length);
        expect(result).toEqual(mockRawReaders.map(r => ({ id: r.id })));
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

        await expect(getReaders()).rejects.toThrow('fail');
    });
});
