import * as yup from 'yup';

export const validationSchema = yup.object({
    firstName: yup.string().trim().required('First name is required'),
    lastName: yup.string().trim().required('Last name is required'),
    email: yup.string().trim().email('Invalid email').required('Email is required'),
});
