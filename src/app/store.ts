import { configureStore } from '@reduxjs/toolkit';

import booksReducer from 'entities/book/redux/slice';
import readersReducer from 'entities/reader/redux/slice';
import loansReducer from 'entities/loan/redux/slice';

export const store = configureStore({
    reducer: {
        books: booksReducer,
        readers: readersReducer,
        loans: loansReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
