import { Loan } from 'entities/loan/model';
import { Book } from 'entities/book/types';

export const useGenrePopularityStats = (loans: Loan[], books: Book[], topN = 5) => {
    const bookById = books.reduce<Record<string, Book>>((acc, book) => {
        acc[book.id] = book;
        return acc;
    }, {});

    const genreCounts = loans.reduce<Record<string, number>>((acc, loan) => {
        const book = bookById[loan.bookId];
        if (!book) return acc;

        const genre = book.genre || 'Unknown';
        acc[genre] = (acc[genre] || 0) + 1;
        return acc;
    }, {});

    const sortedGenres = Object.entries(genreCounts) as [string, number][];

    const topGenres = sortedGenres.slice(0, topN);
    const rest = sortedGenres.slice(topN);

    const otherCount = rest.reduce((sum, [, count]) => sum + count, 0);
    const finalGenres: [string, number][] =
        otherCount > 0 ? [...topGenres, ['Other', otherCount]] : topGenres;

    return {
        labels: finalGenres.map(([genre]) => genre),
        data: finalGenres.map(([, count]) => count),
    };
};
