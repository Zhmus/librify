import { Loan } from './model';

import { mockServer } from 'shared/utils/mockServer';
import { handleResponse } from 'shared/utils/http/handleResponse';
import { addLoan, getLoans, updateLoan } from 'entities/loan/service';

import { mockRawLoans, mockSingleActiveLoan } from 'entities/loan/mock.mock';

jest.mock('shared/utils/mockServer');
jest.mock('shared/utils/http/handleResponse');

const mockServerMock = mockServer as jest.Mock;
const handleResponseMock = handleResponse as jest.Mock;

describe('Loan Service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getLoans', () => {
        it('should fetch loans and transform them into Loan instances', async () => {
            mockServerMock.mockResolvedValueOnce('server-response');
            handleResponseMock.mockResolvedValueOnce(mockRawLoans);

            const result = await getLoans();

            expect(mockServerMock).toHaveBeenCalledWith('loans', 'GET');
            expect(handleResponseMock).toHaveBeenCalledWith('server-response');
            expect(result).toHaveLength(mockRawLoans.length);
            result.forEach(loan => {
                expect(loan).toBeInstanceOf(Loan);
            });
        });

        it('should throw an error if the server does not return an array', async () => {
            mockServerMock.mockResolvedValueOnce('server-response');
            handleResponseMock.mockResolvedValueOnce({ not: 'an array' });

            await expect(getLoans()).rejects.toThrow('Expected an array of loans');
        });
    });

    describe('addLoan', () => {
        it('should send a Loan instance to the server and return the created loan', async () => {
            mockServerMock.mockResolvedValueOnce('server-response');
            handleResponseMock.mockResolvedValueOnce(mockRawLoans[0]);

            const result = await addLoan(mockSingleActiveLoan);

            expect(mockServerMock).toHaveBeenCalledWith(
                'loans',
                'POST',
                expect.objectContaining({
                    id: mockSingleActiveLoan.id,
                    book_id: mockSingleActiveLoan.bookId,
                })
            );
            expect(result).toBeInstanceOf(Loan);
        });
    });

    describe('updateLoan', () => {
        it('should send only provided changes to the server and return the updated loan', async () => {
            const changes: Partial<Loan> = { returnDate: '2025-08-14' };

            mockServerMock.mockResolvedValueOnce('server-response');
            handleResponseMock.mockResolvedValueOnce({
                ...mockRawLoans[1],
                return_date: '2025-08-14',
            });

            const result = await updateLoan('2', changes);

            expect(mockServerMock).toHaveBeenCalledWith(
                'loans',
                'PUT',
                expect.objectContaining({
                    where: { id: '2' },
                    changes: { return_date: '2025-08-14' },
                })
            );
            expect(result).toBeInstanceOf(Loan);
            expect(result.returnDate).toBe('2025-08-14');
        });
    });
});
