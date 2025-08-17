import { enrichBooks } from './enrich';
import { mockTransformedBooks } from 'entities/book/mock.mock';
import { mockTransformedLoans, mockSingleActiveLoan } from 'entities/loan/mock.mock';

describe('enrichBooks', () => {
    it('marks books as loaned if they have active loans', () => {
        const result = enrichBooks(mockTransformedBooks, [mockSingleActiveLoan]);
        expect(result).toEqual([
            { ...mockTransformedBooks[0], isLoaned: false, loanId: '' },
            { ...mockTransformedBooks[1], isLoaned: false, loanId: '' },
            { ...mockTransformedBooks[2], isLoaned: true, loanId: mockSingleActiveLoan.id },
        ]);
    });

    it('marks books correctly according to active and returned loans', () => {
        const result = enrichBooks(mockTransformedBooks, mockTransformedLoans);
        expect(result).toEqual([
            { ...mockTransformedBooks[0], isLoaned: false, loanId: '' },
            { ...mockTransformedBooks[1], isLoaned: true, loanId: '1' },
            { ...mockTransformedBooks[2], isLoaned: true, loanId: '2' },
        ]);
    });

    it('handles empty loans list', () => {
        const result = enrichBooks(mockTransformedBooks, []);
        expect(result.every(b => !b.isLoaned && b.loanId === '')).toBe(true);
    });

    it('handles empty books list', () => {
        const result = enrichBooks([], mockTransformedLoans);
        expect(result).toEqual([]);
    });

    it('handles empty books and loans lists', () => {
        const result = enrichBooks([], []);
        expect(result).toEqual([]);
    });
});
