import { renderHook } from '@testing-library/react';
import { useCategories } from './useCategories';
import { mockTransformedBooks, mockEmptyRawBooks } from 'entities/book/mock.mock';

type TestCase = {
    description: string;
    inputBooks: any[];
    field: keyof (typeof mockTransformedBooks)[0];
    expected: string[];
};

const testCases: TestCase[] = [
    {
        description: 'return unique categories based on genre',
        inputBooks: mockTransformedBooks,
        field: 'genre',
        expected: ['Non-fiction', 'Programming'],
    },
    {
        description: 'return unique categories based on author',
        inputBooks: mockTransformedBooks,
        field: 'author',
        expected: ['Johnny Mcmahon', 'Robert C. Martin', 'Andrew Hunt'],
    },
    {
        description: 'return empty array if field values are missing',
        inputBooks: mockEmptyRawBooks,
        field: 'genre',
        expected: [],
    },
    {
        description: 'handle duplicate genres and return only unique values',
        inputBooks: [...mockTransformedBooks, mockTransformedBooks[1]],
        field: 'genre',
        expected: ['Non-fiction', 'Programming'],
    },
    {
        description: 'ignore falsy field values like null or undefined',
        inputBooks: [
            { ...mockTransformedBooks[0], genre: null },
            { ...mockTransformedBooks[1], genre: undefined },
        ],
        field: 'genre',
        expected: [],
    },
    {
        description: 'treat similar-looking genres as different if normalization is disabled',
        inputBooks: [
            { title: 'Types A', genre: 'Non-fiction' },
            { title: 'Types B', genre: 'Non fiction' },
        ],
        field: 'genre',
        expected: ['Non-fiction', 'Non fiction'],
    },
];

describe('useCategories', () => {
    testCases.forEach(({ description, inputBooks, field, expected }) => {
        it(`should ${description}`, () => {
            const { result } = renderHook(() => useCategories(inputBooks, field));
            expect(result.current).toEqual(expected);
        });
    });
});
