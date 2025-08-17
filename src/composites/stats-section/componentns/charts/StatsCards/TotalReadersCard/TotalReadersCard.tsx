import React, { FC } from 'react';
import { Reader } from 'entities/reader/types';

import { useTotalReadersCard } from './useTotalReadersCard';
import { CardStat } from 'shared/ui/charts/CardStat/CardStat';

interface Props {
    readers: Reader[];
}

export const TotalReadersCard: FC<Props> = ({ readers }) => {
    const { total } = useTotalReadersCard(readers);
    return <CardStat title="Total Readers" value={total} />;
};
