import { transformReader } from './transform';
import { mockSingleRawReader, mockSingleTransformedReader } from './mock.mock';

describe('utils/transform', () => {
    it('should transform RawReader to Reader correctly', () => {
        expect(transformReader(mockSingleRawReader)).toEqual(mockSingleTransformedReader);
    });
});
