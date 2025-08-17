import { transformBook } from './transform';
import { mockSingleRawBook, mockSingleTransformedBook } from './mock.mock';

describe('utils/transform', () => {
    it('should transform RawBook to Types correctly', () => {
        expect(transformBook(mockSingleRawBook)).toEqual(mockSingleTransformedBook);
    });
});
