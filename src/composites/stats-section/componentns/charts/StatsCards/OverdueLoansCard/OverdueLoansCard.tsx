import { FC } from 'react';
import { Loan } from 'entities/loan/model';
import { CardStat } from 'shared/ui/charts/CardStat/CardStat';
import { useOverdueLoansCard } from './useOverdueLoansCard';

interface Props {
    loans: Loan[];
}

export const OverdueLoansCard: FC<Props> = ({ loans }) => {
    const { total } = useOverdueLoansCard(loans);
    return <CardStat title="Overdue Loans" value={total} />;
};
