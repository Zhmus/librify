import React from 'react';
import { Line } from 'react-chartjs-2';
import { ChartOptions, ChartData } from 'chart.js';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface Props {
    labels: string[];
    data: number[];
    title?: string;
    borderColor?: string;
    backgroundColor?: string;
}

export const LineChart: React.FC<Props> = ({
    labels,
    data,
    title,
    borderColor,
    backgroundColor,
}) => {
    const chartData: ChartData<'line'> = {
        labels,
        datasets: [
            {
                label: title,
                data,
                borderColor: borderColor || 'rgba(54, 162, 235, 0.8)',
                backgroundColor: backgroundColor || 'rgba(54, 162, 235, 0.4)',
                tension: 0.4,
                fill: true,
                pointRadius: 4,
                pointHoverRadius: 6,
            },
        ],
    };

    const dataLabelsPlugin = {
        id: 'dataLabels',
        afterDatasetsDraw(chart: any) {
            const ctx = chart.ctx;
            chart.data.datasets.forEach((dataset: any, datasetIndex: number) => {
                const meta = chart.getDatasetMeta(datasetIndex);
                meta.data.forEach((point: any, index: number) => {
                    const value = dataset.data[index];
                    ctx.save();
                    ctx.fillStyle = '#000';
                    ctx.font = '12px sans-serif';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'bottom';
                    ctx.fillText(value.toString(), point.x, point.y - 6); // сдвиг над точкой
                    ctx.restore();
                });
            });
        },
    };

    const options: ChartOptions<'line'> = {
        responsive: true,
        maintainAspectRatio: false,
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
                offset: true,
                suggestedMax: Math.max(...data) * 1.1,
            },
        },
    };

    return (
        <div className="card">
            <div className="card-body">
                {title && <h5 className="card-title">{title}</h5>}
                <div style={{ maxHeight: 300 }}>
                    <Line data={chartData} options={options} plugins={[dataLabelsPlugin]} />
                </div>
            </div>
        </div>
    );
};
