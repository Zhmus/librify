import React, { FC } from 'react';

export interface LoadMoreButtonProps {
    onClick: () => void;
    loading: boolean;
}

const LoadMoreButton: FC<LoadMoreButtonProps> = ({ onClick, loading }) => {
    return (
        <div className="text-center">
            <button className="btn btn-outline-primary" onClick={onClick} disabled={loading}>
                {loading ? 'Loading...' : 'Load more'}
            </button>
        </div>
    );
};

export default LoadMoreButton;
