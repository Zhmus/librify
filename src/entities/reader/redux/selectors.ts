import { RootState } from 'app/store';
import { createSelector } from '@reduxjs/toolkit';

export const selectReadersState = (state: RootState) => state.readers;

export const selectAllReaders = createSelector(
    selectReadersState,
    readersState => readersState.items
);

export const selectReaderById = (id: number) =>
    createSelector(selectAllReaders, readers => readers.find(reader => reader.id === id));
