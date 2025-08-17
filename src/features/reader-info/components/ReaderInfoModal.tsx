import React, { FC } from 'react';

import Modal from 'shared/ui/Modal';
import { ReaderEnriched } from 'entities/reader/types';

type Props = { reader: ReaderEnriched; onClose: () => void };

const ReaderInfoModal: FC<Props> = ({ reader, onClose }) => {
    return (
        <Modal title={`Return books for ${reader.name}`} onClose={onClose}>
            <div className="mb-3">
                <p>
                    <strong>Name:</strong> {reader.name}
                </p>
                <p>
                    <strong>Email:</strong> {reader.email}
                </p>
                <p>
                    <strong>Registered:</strong>{' '}
                    {new Date(reader.registeredAt).toLocaleDateString()}
                </p>
            </div>

            {reader.currentLoans.length > 0 && (
                <div className="mb-3">
                    <h6>Current Loans</h6>
                    <ul className="list-group">
                        {reader.currentLoans.map(book => (
                            <li key={book.id} className="list-group-item">
                                {book.title}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {reader.loanHistory.length > 0 && (
                <div className="mb-3">
                    <h6>Loan History</h6>
                    <ul className="list-group">
                        {reader.loanHistory.map(book => (
                            <li key={book.id} className="list-group-item">
                                {book.title}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </Modal>
    );
};

export default ReaderInfoModal;
