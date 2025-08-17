export interface RawBook {
    id: number;
    title: string;
    author: string;
    genre: string;
    published_year: number;
}

export interface Book {
    id: number;
    title: string;
    author: string;
    genre: string;
    publishedYear: number;
}

export interface BookEnriched extends Book {
    isLoaned: boolean;
    loanId: string;
}
