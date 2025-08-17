import React from 'react';
import { Loan } from 'entities/loan/model';
import { Book } from 'entities/book/types';

import { PieChart } from 'shared/ui/charts/PieChart/PieChart';
import { useGenrePopularityStats } from './useGenrePopularityStats';

interface Props {
    loans: Loan[];
    books: Book[];
}

export const GenrePopularityPieChart: React.FC<Props> = ({ loans, books }) => {
    const { labels, data } = useGenrePopularityStats(loans, books);

    const colors = [
        'rgba(240, 61, 61, .8)',
        'rgba(216, 81, 81, .8)',
        'rgba(252, 146, 49, .8)',
        'rgba(61, 122, 129, .8)',
        'rgba(51, 179, 107, .8)',
        'rgba(51, 61, 76, .8)',
    ];

    return (
        <PieChart
            labels={labels}
            data={data}
            backgroundColor={colors}
            title="Most Popular Genres"
        />
    );
};
