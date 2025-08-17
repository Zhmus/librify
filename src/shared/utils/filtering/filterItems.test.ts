import filterItems, { FilterType } from './filterItems';

type Book = {
    title: string;
    genre: string;
    available: boolean;
};

const items: Book[] = [
    { title: 'Harry Potter', genre: 'Fantasy', available: true },
    { title: 'Clean Code', genre: 'Programming', available: false },
    { title: 'Hobbit', genre: 'Fantasy', available: true },
    { title: 'The Pragmatic Programmer', genre: 'Programming', available: true },
];

describe('filterItems', () => {
    it('returns all items when no filters are provided', () => {
        const result = filterItems(items, {}, {});
        expect(result).toEqual(items);
    });

    it('filters by exact genre', () => {
        const filters = { genre: 'Fantasy' };
        const config = { genre: { type: FilterType.EXACT } };
        const result = filterItems(items, filters, config);
        expect(result).toEqual([
            { title: 'Harry Potter', genre: 'Fantasy', available: true },
            { title: 'Hobbit', genre: 'Fantasy', available: true },
        ]);
    });

    it('filters by substring in title', () => {
        const filters = { title: 'code' };
        const config = { title: { type: FilterType.SUBSTRING } };
        const result = filterItems(items, filters, config);
        expect(result).toEqual([{ title: 'Clean Code', genre: 'Programming', available: false }]);
    });

    it('filters by boolean exact match', () => {
        const filters = { available: true };
        const config = { available: { type: FilterType.EXACT } };
        const result = filterItems(items, filters, config);
        expect(result).toEqual([
            { title: 'Harry Potter', genre: 'Fantasy', available: true },
            { title: 'Hobbit', genre: 'Fantasy', available: true },
            { title: 'The Pragmatic Programmer', genre: 'Programming', available: true },
        ]);
    });

    it('ignores empty string in filters (treats as "not set")', () => {
        const filters = { genre: '' };
        const config = { genre: { type: FilterType.EXACT } };
        const result = filterItems(items, filters, config);
        expect(result).toEqual(items);
    });

    it('ignores undefined in filters (treats as "not set")', () => {
        const filters = { genre: undefined };
        const config = { genre: { type: FilterType.EXACT } };
        const result = filterItems(items, filters, config);
        expect(result).toEqual(items);
    });

    it('ignores null in filters (treats as "not set")', () => {
        const filters = { genre: null };
        const config = { genre: { type: FilterType.EXACT } };
        const result = filterItems(items, filters as any, config);
        expect(result).toEqual(items);
    });

    it('returns empty array if no match', () => {
        const filters = { genre: 'Nonexistent' };
        const config = { genre: { type: FilterType.EXACT } };
        const result = filterItems(items, filters, config);
        expect(result).toEqual([]);
    });
});
