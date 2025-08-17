import React, { FC } from 'react';
import { Book } from 'entities/book/types';

import { useTotalBooksCard } from './useTotalBooksCard';
import { CardStat } from 'shared/ui/charts/CardStat/CardStat';

interface Props {
    books: Book[];
}

export const TotalBooksCard: FC<Props> = ({ books }) => {
    const { total } = useTotalBooksCard(books);
    return <CardStat title="Total Books" value={total} />;
};
