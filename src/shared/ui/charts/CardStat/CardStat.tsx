import React from 'react';
import { useCountUp } from 'shared/ui/charts/CardStat/useCountUp';

interface Props {
    title: string;
    value: number;
    className?: string;
    duration?: number;
}

export const CardStat: React.FC<Props> = ({ title, value, className, duration }) => {
    const displayValue = useCountUp(value, duration);

    return (
        <div className={`card text-center h-100 w-100 ${className || ''}`}>
            <div className="card-body d-flex flex-column justify-content-center">
                <p className="card-text display-4 text-primary">{displayValue}</p>
                <div
                    className="d-flex flex-column justify-content-center"
                    style={{ minHeight: '60px' }}
                >
                    <h5 className="card-title">{title}</h5>
                </div>
            </div>
        </div>
    );
};
