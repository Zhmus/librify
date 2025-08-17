import React, { FC, useEffect, useState } from 'react';

import Modal from 'shared/ui/Modal';
import AsyncWrapper from 'shared/ui/AsyncWrapper';

import { useReadersData } from 'features/checkout-book/hooks/useReadersData';
import { useReadersFilters } from 'features/checkout-book/hooks/useReadersFilters';
import { useListController } from 'shared/hooks/lists/useListController';
import { useBookCheckout } from 'features/checkout-book/hooks/useBookCheckout';

type BookCheckoutModalProps = {
    bookId: number;
    onClose: () => void;
};

const BookCheckoutModal: FC<BookCheckoutModalProps> = ({ bookId, onClose }) => {
    const { readers, loading, error } = useReadersData();
    const { resultItems: filteredReaders, filtersState } = useReadersFilters(readers);
    const { resultItems: paginatedReaders } = useListController(filteredReaders, filtersState, 10);

    const { uiFilters, setUiFilters } = filtersState;
    const { confirmCheckout } = useBookCheckout(bookId);

    const [checkedOutReaderId, setCheckedOutReaderId] = useState<number | null>(null);

    useEffect(() => {
        if (checkedOutReaderId !== null) {
            onClose();
        }
    }, [checkedOutReaderId, onClose]);

    const handleCheckout = async (readerId: number) => {
        const success = await confirmCheckout(readerId);
        if (success) setCheckedOutReaderId(readerId);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUiFilters({ ...uiFilters, [name]: value });
    };

    return (
        <Modal title={`Checkout Book #${bookId}`} onClose={onClose}>
            <input
                type="text"
                className="form-control mb-3"
                placeholder="Search by name"
                name="name"
                value={uiFilters.name}
                onChange={handleChange}
            />

            <AsyncWrapper loading={loading} error={error}>
                <div className="list-group">
                    {paginatedReaders.map(reader => (
                        <button
                            key={reader.id}
                            type="button"
                            className="list-group-item list-group-item-action"
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleCheckout(reader.id)}
                        >
                            #{reader.id} – {reader.name}
                        </button>
                    ))}
                </div>
            </AsyncWrapper>
        </Modal>
    );
};

export default BookCheckoutModal;
