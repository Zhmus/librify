import React, { FC } from 'react';
import { BookEnriched } from 'entities/book/types';

interface BooksItemProps {
    book: BookEnriched;
    actions?: {
        onLoan?: (bookId: number) => void;
    };
}

const BooksItem: FC<BooksItemProps> = ({ book, actions }) => {
    return (
        <>
            <td>{book.id}</td>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>{book.genre}</td>
            <td className="text-center">{book.isLoaned ? 'Checked out' : 'Available'}</td>
            <td className="text-end">
                {!book.isLoaned && (
                    <button
                        className="btn btn-sm btn-primary"
                        onClick={() => actions?.onLoan?.(book.id)}
                    >
                        Checkout
                    </button>
                )}
            </td>
        </>
    );
};

export default BooksItem;
