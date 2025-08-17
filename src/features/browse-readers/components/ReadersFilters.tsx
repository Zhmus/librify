import React, { FC } from 'react';
import { ReaderUiFilters } from '../hooks/useReadersFilters';

export interface ReadersFiltersProps {
    filtersState: {
        uiFilters: ReaderUiFilters;
        setUiFilters: (filters: ReaderUiFilters) => void;
    };
}

const ReadersFilters: FC<ReadersFiltersProps> = ({ filtersState }) => {
    const { uiFilters, setUiFilters } = filtersState;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
                        name="name"
                        className="form-control"
                        placeholder="Search by name"
                        value={uiFilters.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-md-3">
                    <input
                        type="text"
                        name="email"
                        className="form-control"
                        placeholder="Search by email"
                        value={uiFilters.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-md-3">
                    <input
                        type="date"
                        name="registeredAt"
                        className="form-control"
                        placeholder="Registered after"
                        value={uiFilters.registeredAt}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-md-3 d-flex align-items-center">
                    <div className="form-check">
                        <input
                            type="checkbox"
                            name="hasCurrentLoans"
                            id="hasCurrentLoans"
                            className="form-check-input"
                            checked={uiFilters.hasCurrentLoans}
                            onChange={handleChange}
                        />
                        <label htmlFor="hasCurrentLoans" className="form-check-label">
                            Has current loans
                        </label>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default ReadersFilters;
