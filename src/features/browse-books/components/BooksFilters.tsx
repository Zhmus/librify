import React, { FC } from 'react';
import { BookUiFilters } from '../hooks/useBooksFilters';
import { Category } from 'shared/hooks/lists/useCategories';

export interface BooksFiltersProps {
    filtersState: {
        uiFilters: BookUiFilters;
        setUiFilters: (filters: BookUiFilters) => void;
    };
    genres: Category[];
}

const BooksFilters: FC<BooksFiltersProps> = ({ filtersState, genres }) => {
    const { uiFilters, setUiFilters } = filtersState;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

        setUiFilters({
            ...uiFilters,
            [name]: newValue,
        });
    };

    return (
        <form className="mb-4">
            <div className="row g-3">
                <div className="col-md-3">
                    <input
                        type="text"
                        name="title"
                        className="form-control"
                        placeholder="Search by title"
                        value={uiFilters.title}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-md-3">
                    <input
                        type="text"
                        name="author"
                        className="form-control"
                        placeholder="Search by author"
                        value={uiFilters.author}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-md-3">
                    <select
                        name="genre"
                        className="form-select"
                        value={uiFilters.genre}
                        onChange={handleChange}
                    >
                        <option value="">All genres</option>
                        {genres.map(genre => (
                            <option key={genre} value={genre}>
                                {genre}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="col-md-3 d-flex align-items-center">
                    <div className="form-check">
                        <input
                            type="checkbox"
                            name="hideLoaned"
                            id="hideLoaned"
                            className="form-check-input"
                            checked={uiFilters.hideLoaned}
                            onChange={handleChange}
                        />
                        <label htmlFor="hideLoaned" className="form-check-label">
                            Hide loaned books
                        </label>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default BooksFilters;
