import { handleResponse } from './handleResponse';

describe('handleResponse', () => {
    it('returns data when response.ok is true', async () => {
        const mockData = { message: 'ok' };
        const mockResponse = {
            ok: true,
            status: 200,
            json: async () => mockData,
        };

        const result = await handleResponse<typeof mockData>(mockResponse);
        expect(result).toEqual(mockData);
    });

    it('throws an error when response.ok is false with message from JSON', async () => {
        const errorMsg = 'Bad request error';
        const mockResponse = {
            ok: false,
            status: 400,
            json: async () => ({ message: errorMsg }),
        };

        await expect(handleResponse(mockResponse)).rejects.toThrow(errorMsg);
    });

    it('throws an error with generic message if response.ok is false and json parse fails', async () => {
        const mockResponse = {
            ok: false,
            status: 500,
            json: async () => {
                throw new Error('parse fail');
            },
        };

        await expect(handleResponse(mockResponse)).rejects.toThrow('HTTP error 500');
    });
});
