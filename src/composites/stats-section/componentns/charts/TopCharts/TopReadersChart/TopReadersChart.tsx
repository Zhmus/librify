import React from 'react';
import { Reader } from 'entities/reader/types';
import { Loan } from 'entities/loan/model';
import { useTopReaders } from './useTopReaders';
import { BarChart } from 'shared/ui/charts/BarChart/BarChart';

interface Props {
    readers: Reader[];
    loans: Loan[];
}

export const TopReadersChart: React.FC<Props> = ({ readers, loans }) => {
    const topReaders = useTopReaders(readers, loans);

    return (
        <BarChart
            labels={topReaders.map(r => r.name)}
            data={topReaders.map(r => r.count)}
            title="Top 5 Readers"
            backgroundColor="rgba(61, 122, 129, 0.8)"
        />
    );
};
