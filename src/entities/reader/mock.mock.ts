import { RawReader, Reader } from './types';

export const mockSingleRawReader: RawReader = {
    id: 1,
    name: 'Elizabeth Ewing',
    email: 'richard63@gmail.com',
    registered_at: '2024-10-23',
};

export const mockSingleTransformedReader: Reader = {
    id: 1,
    name: 'Elizabeth Ewing',
    email: 'richard63@gmail.com',
    registeredAt: new Date('2024-10-23'),
};

export const mockRawReaders: RawReader[] = [
    mockSingleRawReader,
    { id: 2, name: 'John Smith', email: 'john.smith@example.com', registered_at: '2024-06-15' },
    { id: 3, name: 'Jane Doe', email: 'jane.doe@example.com', registered_at: '2024-01-10' },
];

export const mockTransformedReaders: Reader[] = mockRawReaders.map(r => ({
    id: r.id,
    name: r.name,
    email: r.email,
    registeredAt: new Date(r.registered_at),
}));
