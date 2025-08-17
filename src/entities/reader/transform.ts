import { RawReader, Reader } from './types';

export const transformReader = (raw: RawReader): Reader => ({
    id: raw.id,
    name: raw.name,
    email: raw.email,
    registeredAt: new Date(raw.registered_at),
});

export const transformReaderToRaw = (reader: Reader): RawReader => ({
    id: reader.id,
    name: reader.name,
    email: reader.email,
    registered_at: reader.registeredAt.toISOString().slice(0, 10),
});
