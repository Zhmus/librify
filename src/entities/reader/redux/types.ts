import { Reader } from '../types';

export type ReaderState = {
    items: Reader[];
    loading: boolean;
    error: Error | null;
};
