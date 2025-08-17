import React from 'react';
import { Loan } from 'entities/loan/model';
import { useLoansByMonth } from 'composites/stats-section/componentns/charts/LoansByMonthChart/useLoansByMonth';
import { LineChart } from 'shared/ui/charts/LineChart/LineChart';

interface Props {
    loans: Loan[];
}

export const LoansByMonthChart: React.FC<Props> = ({ loans }) => {
    const { labels, data } = useLoansByMonth(loans);

    return (
        <LineChart
            labels={labels}
            data={data}
            title="Loans by Month"
            borderColor="rgba(51, 61, 76, 0.8)"
            backgroundColor="rgba(51, 61, 76, 0.8)"
        />
    );
};
