import React from 'react';
import { Loan } from 'entities/loan/model';
import { useLoanReturnStats } from './useLoanReturnStats';
import { PieChart } from 'shared/ui/charts/PieChart/PieChart';

interface Props {
    loans: Loan[];
}

export const LoanReturnPieChart: React.FC<Props> = ({ loans }) => {
    const { onTime, overdue } = useLoanReturnStats(loans);

    const labels = ['On time', 'Overdue'];
    const data = [onTime, overdue];
    const colors = ['rgba(252, 146, 49, .8)', 'rgba(240, 61, 61, .8)'];

    return (
        <PieChart
            labels={labels}
            data={data}
            backgroundColor={colors}
            title="Return on Time vs Overdue"
        />
    );
};
