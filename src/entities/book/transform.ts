import { RawBook, Book } from './types';

export const transformBook = (raw: RawBook): Book => {
    return {
        id: raw.id,
        title: raw.title,
        author: raw.author,
        genre: raw.genre,
        publishedYear: raw.published_year,
    };
};
