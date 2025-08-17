import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState, AppDispatch } from 'app/store';
import { loadReaders } from 'entities/reader/redux/thunks';

export function useReadersData() {
    const dispatch = useDispatch<AppDispatch>();
    const readers = useSelector((state: RootState) => state.readers.items);
    const loading = useSelector((state: RootState) => state.readers.loading);
    const error = useSelector((state: RootState) => state.readers.error);

    useEffect(() => {
        if (!readers.length) dispatch(loadReaders());
    }, [dispatch, readers.length]);

    return { readers, loading, error };
}
