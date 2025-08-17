import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BooksItem from './BooksItem';
import { mockEnrichedBook, mockLoanedEnrichedBook } from 'entities/book/mock.mock';

describe('BooksItem', () => {
    it('renders book info', () => {
        render(
            <table>
                <tbody>
                    <tr>
                        <BooksItem book={mockEnrichedBook} actions={{ onLoan: jest.fn() }} />
                    </tr>
                </tbody>
            </table>
        );

        expect(screen.getByText(mockEnrichedBook.title)).toBeInTheDocument();
        expect(screen.getByText(mockEnrichedBook.author)).toBeInTheDocument();
        expect(screen.getByText(mockEnrichedBook.genre)).toBeInTheDocument();
        expect(screen.getByText('Available')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /checkout/i })).toBeInTheDocument();
    });

    it('does not show checkout button if book is loaned', () => {
        render(
            <table>
                <tbody>
                    <tr>
                        <BooksItem book={mockLoanedEnrichedBook} actions={{ onLoan: jest.fn() }} />
                    </tr>
                </tbody>
            </table>
        );

        expect(screen.getByText('Checked out')).toBeInTheDocument();
        expect(screen.queryByRole('button', { name: /checkout/i })).not.toBeInTheDocument();
    });

    it('calls onLoan with book id when checkout button is clicked', () => {
        const onLoanMock = jest.fn();
        render(
            <table>
                <tbody>
                    <tr>
                        <BooksItem book={mockEnrichedBook} actions={{ onLoan: onLoanMock }} />
                    </tr>
                </tbody>
            </table>
        );

        fireEvent.click(screen.getByRole('button', { name: /checkout/i }));
        expect(onLoanMock).toHaveBeenCalledWith(mockEnrichedBook.id);
        expect(onLoanMock).toHaveBeenCalledTimes(1);
    });
});
