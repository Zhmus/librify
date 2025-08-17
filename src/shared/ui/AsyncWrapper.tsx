import React, { FC } from 'react';

export interface AsyncWrapperProps {
    loading: boolean;
    error?: Error | null;
    children: React.ReactNode;
}

const AsyncWrapper: FC<AsyncWrapperProps> = ({ loading, error, children }) => {
    if (error) return <p>Error: {error.message}</p>;
    if (loading) return <p>Loading...</p>;

    return <>{children}</>;
};

export default AsyncWrapper;
