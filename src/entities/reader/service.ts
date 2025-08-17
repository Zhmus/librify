import { RawReader, Reader } from './types';

import { mockServer } from 'shared/utils/mockServer';
import { handleResponse } from 'shared/utils/http/handleResponse';
import { transformReader, transformReaderToRaw } from './transform';

export const getReaders = async (): Promise<Reader[]> => {
    const response = await mockServer('readers', 'GET');
    const rawReaders: RawReader[] = await handleResponse(response);
    return rawReaders.map(transformReader);
};

export const addReader = async (reader: Reader): Promise<Reader> => {
    const raw = transformReaderToRaw(reader);
    const response = await mockServer('readers', 'POST', raw);
    const createdRaw: RawReader = await handleResponse(response);
    return transformReader(createdRaw);
};
