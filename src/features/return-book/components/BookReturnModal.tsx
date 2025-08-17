import React, { FC, useEffect } from 'react';

import { ReaderEnriched } from 'entities/reader/types';
import { BookEnriched } from 'entities/book/types';

import Modal from 'shared/ui/Modal';
import { useBookReturn } from '../hooks/useBookReturn';

type BookReturnModalProps = {
    reader: ReaderEnriched;
    onClose: () => void;
};

const BookReturnModal: FC<BookReturnModalProps> = ({ reader, onClose }) => {
    const { confirmReturnBook, currentLoans } = useBookReturn(reader);

    useEffect(() => {
        if (currentLoans.length === 0) {
            onClose();
        }
    }, [currentLoans, onClose]);

    return (
        <Modal title={`Return books for ${reader.name}`} onClose={onClose}>
            {currentLoans.length === 0 ? (
                <p>No books on loan.</p>
            ) : (
                <div className="list-group">
                    {currentLoans.map((book: BookEnriched) => (
                        <button
                            key={book.loanId}
                            type="button"
                            className="list-group-item list-group-item-action"
                            onClick={() => confirmReturnBook(book.loanId)}
                        >
                            #{book.id} – {book.title}
                        </button>
                    ))}
                </div>
            )}
        </Modal>
    );
};

export default BookReturnModal;
