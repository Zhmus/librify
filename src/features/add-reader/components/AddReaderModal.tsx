import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Modal from 'shared/ui/Modal';
import { validationSchema } from 'features/add-reader/form/validationSchema';
import { FormTypes } from 'features/add-reader/form/types';

interface AddReaderModalProps {
    onClose: () => void;
    onSubmit: (data: FormTypes) => void;
}

const AddReaderModal: FC<AddReaderModalProps> = ({ onClose, onSubmit }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormTypes>({
        defaultValues: { firstName: '', lastName: '', email: '' },
        resolver: yupResolver(validationSchema),
    });

    const submitHandler = (data: FormTypes) => {
        onSubmit(data);
        reset();
    };

    return (
        <Modal title="Add New Reader" onClose={onClose}>
            <form onSubmit={handleSubmit(submitHandler)} noValidate>
                <div className="mb-3 d-flex gap-2">
                    <div className="flex-grow-1">
                        <label className="form-label">First Name</label>
                        <input
                            className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                            {...register('firstName')}
                        />
                        {errors.firstName && (
                            <div className="invalid-feedback">{errors.firstName.message}</div>
                        )}
                    </div>

                    <div className="flex-grow-1">
                        <label className="form-label">Last Name</label>
                        <input
                            className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                            {...register('lastName')}
                        />
                        {errors.lastName && (
                            <div className="invalid-feedback">{errors.lastName.message}</div>
                        )}
                    </div>
                </div>

                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="text"
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        {...register('email')}
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                </div>

                <div className="d-flex justify-content-end gap-2">
                    <button type="button" className="btn btn-secondary" onClick={onClose}>
                        Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                        Add Reader
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default AddReaderModal;
