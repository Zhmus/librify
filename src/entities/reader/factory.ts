import { Reader } from './types';

export function createReader(reader: Partial<Reader>): Reader {
    return {
        id: Math.floor(Math.random() * 1000000),
        name: reader.name || '',
        email: reader.email || '',
        registeredAt: new Date(),
    };
}
