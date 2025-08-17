import React from 'react';
import { Bar } from 'react-chartjs-2';
import { ChartOptions, ChartData, Plugin } from 'chart.js';

interface Props {
    labels: string[];
    data: number[];
    title?: string;
    backgroundColor?: string;
}

export const BarChart: React.FC<Props> = ({ labels, data, title, backgroundColor }) => {
    const chartData: ChartData<'bar'> = {
        labels,
        datasets: [
            {
                data,
                backgroundColor: backgroundColor || 'rgba(54, 162, 235, 0.6)',
                borderRadius: 4,
                barPercentage: 0.8,
                categoryPercentage: 0.5,
            },
        ],
    };

    const dataLabelsPlugin: Plugin<'bar'> = {
        id: 'dataLabels',
        afterDatasetsDraw(chart) {
            const ctx = chart.ctx;
            chart.data.datasets.forEach((dataset, i) => {
                const meta = chart.getDatasetMeta(i);
                meta.data.forEach((bar, index) => {
                    const value = dataset.data[index] as number;
                    ctx.save();
                    ctx.fillStyle = '#000';
                    ctx.font = '12px sans-serif';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'bottom';
                    ctx.fillText(value.toString(), bar.x, bar.y - 4);
                    ctx.restore();
                });
            });
        },
    };

    const options: ChartOptions<'bar'> = {
        responsive: true,
        animation: {
            duration: 1000,
            easing: 'easeOutQuart',
        },
        plugins: {
            legend: { display: false },
            title: { display: false },
        },
        scales: {
            x: {
                ticks: { autoSkip: false },
                grid: {
                    drawTicks: false,
                    drawOnChartArea: false,
                },
            },
            y: {
                display: false,
                suggestedMax: Math.max(...data) * 1.1,
            },
        },
    };

    return (
        <div className="card">
            <div className="card-body">
                {title && <h5 className="card-title">{title}</h5>}
                <Bar data={chartData} options={options} plugins={[dataLabelsPlugin]} />
            </div>
        </div>
    );
};
