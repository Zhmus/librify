import React, { FC } from 'react';
import { LoanUiFilters } from 'features/browse-loans/hooks/useLoansFilters';

export interface LoansFiltersProps {
    filtersState: {
        uiFilters: LoanUiFilters;
        setUiFilters: (filters: LoanUiFilters) => void;
    };
}

const LoansFilters: FC<LoansFiltersProps> = ({ filtersState }) => {
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
                        name="userName"
                        className="form-control"
                        placeholder="Search by reader"
                        value={uiFilters.userName}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-md-3">
                    <input
                        type="text"
                        name="bookAuthor"
                        className="form-control"
                        placeholder="Search by author"
                        value={uiFilters.bookAuthor}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-md-3">
                    <input
                        type="text"
                        name="bookTitle"
                        className="form-control"
                        placeholder="Search by book"
                        value={uiFilters.bookTitle}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-md-3 d-flex align-items-center">
                    <div className="form-check">
                        <input
                            type="checkbox"
                            name="showLoaned"
                            id="showLoaned"
                            className="form-check-input"
                            checked={uiFilters.showLoaned}
                            onChange={handleChange}
                        />
                        <label htmlFor="showLoaned" className="form-check-label">
                            Show current loans
                        </label>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default LoansFilters;
