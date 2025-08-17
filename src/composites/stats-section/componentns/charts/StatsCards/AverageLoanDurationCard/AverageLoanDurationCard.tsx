import { FC } from 'react';
import { Loan } from 'entities/loan/model';
import { CardStat } from 'shared/ui/charts/CardStat/CardStat';
import { useAverageLoanDurationCard } from './useAverageLoanDurationCard';

interface Props {
    loans: Loan[];
}

export const AverageLoanDurationCard: FC<Props> = ({ loans }) => {
    const { total } = useAverageLoanDurationCard(loans);
    return <CardStat title="Average Loan Duration (days)" value={total} />;
};
