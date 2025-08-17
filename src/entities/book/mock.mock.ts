import { Book, BookEnriched, RawBook } from './types';

export const mockRawBooks: RawBook[] = [
    {
        id: 1,
        title: 'Court control',
        author: 'Johnny Mcmahon',
        genre: 'Non-fiction',
        published_year: 1995,
    },
    {
        id: 2,
        title: 'Clean Code',
        author: 'Robert C. Martin',
        genre: 'Programming',
        published_year: 2008,
    },
    {
        id: 3,
        title: 'The Pragmatic Programmer',
        author: 'Andrew Hunt',
        genre: 'Programming',
        published_year: 1999,
    },
];

export const mockTransformedBooks: Book[] = mockRawBooks.map(b => ({
    id: b.id,
    title: b.title,
    author: b.author,
    genre: b.genre,
    publishedYear: b.published_year,
}));

export const mockEmptyRawBooks: RawBook[] = [];

export const mockSingleRawBook: RawBook = {
    id: 3,
    title: 'The Pragmatic Programmer',
    author: 'Andrew Hunt',
    genre: 'Programming',
    published_year: 1999,
};

export const mockSingleTransformedBook: Book = {
    id: 3,
    title: 'The Pragmatic Programmer',
    author: 'Andrew Hunt',
    genre: 'Programming',
    publishedYear: 1999,
};

export const mockEnrichedBook: BookEnriched = {
    id: 1,
    title: 'Court control',
    author: 'Johnny Mcmahon',
    genre: 'Non-fiction',
    publishedYear: 1995,
    isLoaned: false,
    loanId: '',
};

export const mockLoanedEnrichedBook: BookEnriched = {
    id: 2,
    title: 'Clean Code',
    author: 'Robert C. Martin',
    genre: 'Programming',
    publishedYear: 2008,
    isLoaned: true,
    loanId: '1',
};

export const mockAnotherLoanedBook: BookEnriched = {
    id: 3,
    title: 'The Pragmatic Programmer',
    author: 'Andrew Hunt',
    genre: 'Programming',
    publishedYear: 1999,
    isLoaned: true,
    loanId: '2',
};

export const mockBooksEnriched: BookEnriched[] = [
    mockEnrichedBook,
    mockLoanedEnrichedBook,
    mockAnotherLoanedBook,
];
