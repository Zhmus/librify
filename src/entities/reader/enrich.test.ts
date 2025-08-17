import { ReaderEnriched } from 'entities/reader/types';
import { enrichReaders } from 'entities/reader/enrich';
import { mockTransformedReaders } from 'entities/reader/mock.mock';
import { mockTransformedBooks } from 'entities/book/mock.mock';
import { mockTransformedLoans } from 'entities/loan/mock.mock';

describe('enrichReaders', () => {
    it('enriches readers with current loans and loan history', () => {
        const result: ReaderEnriched[] = enrichReaders(
            mockTransformedReaders,
            mockTransformedBooks,
            mockTransformedLoans
        );

        const reader1 = result.find(r => r.id === 1)!;
        expect(reader1.hasCurrentLoan).toBe(true);
        expect(reader1.currentLoans).toHaveLength(1);
        expect(reader1.currentLoans[0].id).toBe(2);
        expect(reader1.loanHistory.length).toBeGreaterThanOrEqual(1);

        const reader2 = result.find(r => r.id === 2)!;
        expect(reader2.hasCurrentLoan).toBe(true);
        expect(reader2.currentLoans[0].id).toBe(3);
        expect(reader2.loanHistory.length).toBe(1);

        const reader3 = result.find(r => r.id === 3)!;
        expect(reader3.hasCurrentLoan).toBe(false);
        expect(reader3.currentLoans).toHaveLength(0);
        expect(reader3.loanHistory.length).toBe(1);
    });

    it('handles empty readers list', () => {
        const result: ReaderEnriched[] = enrichReaders(
            [],
            mockTransformedBooks,
            mockTransformedLoans
        );
        expect(result).toEqual([]);
    });

    it('handles readers with no loans', () => {
        const result: ReaderEnriched[] = enrichReaders(
            mockTransformedReaders,
            mockTransformedBooks,
            []
        );

        result.forEach(r => {
            expect(r.hasCurrentLoan).toBe(false);
            expect(r.currentLoans).toHaveLength(0);
            expect(r.loanHistory).toHaveLength(0);
        });
    });
});
