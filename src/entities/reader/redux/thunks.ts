import { createAsyncThunk } from '@reduxjs/toolkit';
import { Reader } from '../types';
import * as readersService from '../service';

export const loadReaders = createAsyncThunk<Reader[]>('readers/loadReaders', async () => {
    return await readersService.getReaders();
});

export const createReader = createAsyncThunk<Reader, Reader>(
    'readers/createReader',
    async reader => {
        return await readersService.addReader(reader);
    }
);
