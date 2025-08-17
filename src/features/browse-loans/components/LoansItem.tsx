import { LoanEnriched } from 'entities/loan/types';
import { FC } from 'react';

interface LoansItemProps {
    loan: LoanEnriched;
    index: number;
}

const LoansItem: FC<LoansItemProps> = ({ loan, index }) => {
    return (
        <>
            <td>{index}</td>
            <td>{loan.userName}</td>
            <td>{loan.bookAuthor}</td>
            <td>{loan.bookTitle}</td>
            <td className="text-center">{loan.loanDate}</td>
            <td className="text-center">{loan.returnDate}</td>
            <td className="text-end">{loan.isLoaned ? 'Current' : 'Archived'}</td>
        </>
    );
};

export default LoansItem;
