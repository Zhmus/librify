import React from 'react';
import { Pie } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';

interface Props {
    labels: string[];
    data: number[];
    backgroundColor?: string[];
    title?: string;
}

export const PieChart: React.FC<Props> = ({ labels, data, backgroundColor, title }) => {
    const chartData: ChartData<'pie'> = {
        labels,
        datasets: [
            {
                data,
                backgroundColor: backgroundColor || [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                ],
            },
        ],
    };

    const options: ChartOptions<'pie'> = {
        responsive: true,
        plugins: {
            legend: { position: 'bottom' },
            title: { display: false },
        },
    };

    return (
        <div className="card">
            <div className="card-body">
                {title && <h5 className="card-title">{title}</h5>}
                <div className="d-flex justify-content-center" style={{ maxHeight: 350 }}>
                    <Pie data={chartData} options={options} />
                </div>
            </div>
        </div>
    );
};
