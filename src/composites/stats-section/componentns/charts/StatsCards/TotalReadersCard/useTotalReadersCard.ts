import { Reader } from 'entities/reader/types';

export const useTotalReadersCard = (readers: Reader[]) => {
    return {
        total: readers.length,
    };
};
