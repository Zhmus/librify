import { FC } from 'react';
import { Loan } from 'entities/loan/model';
import { CardStat } from 'shared/ui/charts/CardStat/CardStat';
import { useActiveLoansCard } from './useActiveLoansCard';

interface Props {
    loans: Loan[];
}

export const ActiveLoansCard: FC<Props> = ({ loans }) => {
    const { total } = useActiveLoansCard(loans);
    return <CardStat title="Active Loans" value={total} />;
};
