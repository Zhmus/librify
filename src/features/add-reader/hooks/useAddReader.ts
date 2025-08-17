import { useDispatch } from 'react-redux';
import { AppDispatch } from 'app/store';

import { createReader as createReaderFactory } from 'entities/reader/factory';
import { createReader as createReaderThunk } from 'entities/reader/redux/thunks';

import { FormTypes } from 'features/add-reader/form/types';

export function useAddReader() {
    const dispatch = useDispatch<AppDispatch>();
    return async (formData: FormTypes) => {
        try {
            const newReader = createReaderFactory({
                name: `${formData.firstName} ${formData.lastName}`,
                email: formData.email,
            });

            await dispatch(createReaderThunk(newReader)).unwrap();
            return true;
        } catch (error) {
            console.error('Failed to add reader:', error);
            return false;
        }
    };
}
