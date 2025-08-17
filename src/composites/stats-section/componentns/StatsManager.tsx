import React, { FC } from 'react';
import AsyncWrapper from 'shared/ui/AsyncWrapper';

import { useStatsManager } from '../hooks/useStatsManager';

import { TotalBooksCard } from 'composites/stats-section/componentns/charts/StatsCards/TotalBooksCard/TotalBooksCard';
import { ActiveLoansCard } from 'composites/stats-section/componentns/charts/StatsCards/ActiveLoansCard/ActiveLoansCard';
import { OverdueLoansCard } from 'composites/stats-section/componentns/charts/StatsCards/OverdueLoansCard/OverdueLoansCard';
import { AverageLoanDurationCard } from 'composites/stats-section/componentns/charts/StatsCards/AverageLoanDurationCard/AverageLoanDurationCard';
import { TotalReadersCard } from 'composites/stats-section/componentns/charts/StatsCards/TotalReadersCard/TotalReadersCard';

import { TopBooksChart } from 'composites/stats-section/componentns/charts/TopCharts/TopBooksChart/TopBooksChart';
import { TopReadersChart } from 'composites/stats-section/componentns/charts/TopCharts/TopReadersChart/TopReadersChart';
import { LoansByMonthChart } from 'composites/stats-section/componentns/charts/LoansByMonthChart/LoansByMonthChart';
import { LoanReturnPieChart } from 'composites/stats-section/componentns/charts/LoanReturnPieChart/LoanReturnPieChart';
import { GenrePopularityPieChart } from 'composites/stats-section/componentns/charts/GenrePopularityPieChart/GenrePopularityPieChart';

const StatsManager: FC = () => {
    const { loadStatus, stats } = useStatsManager();

    return (
        <AsyncWrapper loading={loadStatus.loading} error={loadStatus.error}>
            <div className="d-flex flex-wrap gap-3 mb-3">
                <div style={{ minWidth: 200, flex: '1 1 200px' }} className="d-flex">
                    <TotalBooksCard books={stats.books} />
                </div>
                <div style={{ minWidth: 200, flex: '1 1 200px' }} className="d-flex">
                    <ActiveLoansCard loans={stats.loans} />
                </div>
                <div style={{ minWidth: 200, flex: '1 1 200px' }} className="d-flex">
                    <OverdueLoansCard loans={stats.loans} />
                </div>
                <div style={{ minWidth: 200, flex: '1 1 200px' }} className="d-flex">
                    <AverageLoanDurationCard loans={stats.loans} />
                </div>
                <div style={{ minWidth: 200, flex: '1 1 200px' }} className="d-flex">
                    <TotalReadersCard readers={stats.readers} />
                </div>
            </div>
            <div className="d-flex flex-wrap gap-3 mb-3">
                <div style={{ minWidth: 300, flex: '1 1 300px' }}>
                    <TopBooksChart books={stats.books} loans={stats.loans} />
                </div>
                <div style={{ minWidth: 300, flex: '1 1 300px' }}>
                    <TopReadersChart readers={stats.readers} loans={stats.loans} />
                </div>
            </div>
            <div className="d-flex flex-wrap gap-3 mb-3">
                <div style={{ minWidth: 300, flex: '1 1 300px' }}>
                    <LoansByMonthChart loans={stats.loans}></LoansByMonthChart>
                </div>
            </div>
            <div className="d-flex flex-wrap gap-3 mb-3">
                <div style={{ minWidth: 300, flex: '1 1 300px' }}>
                    <LoanReturnPieChart loans={stats.loans}></LoanReturnPieChart>
                </div>
                <div style={{ minWidth: 300, flex: '1 1 300px' }}>
                    <GenrePopularityPieChart loans={stats.loans} books={stats.books} />
                </div>
            </div>
        </AsyncWrapper>
    );
};

export default StatsManager;
