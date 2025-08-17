import React from 'react';
import { Book } from 'entities/book/types';
import { Loan } from 'entities/loan/model';
import { useTopBooks } from './useTopBooks';
import { BarChart } from 'shared/ui/charts/BarChart/BarChart';

interface Props {
    books: Book[];
    loans: Loan[];
}

export const TopBooksChart: React.FC<Props> = ({ books, loans }) => {
    const topBooks = useTopBooks(books, loans);

    return (
        <BarChart
            labels={topBooks.map(b => b.title)}
            data={topBooks.map(b => b.count)}
            title="Top 5 Books"
            backgroundColor="rgba(252, 146, 49, 0.8)"
        />
    );
};
