import React, { FC } from 'react';
import { ReaderEnriched } from 'entities/reader/types';

interface ReadersItemProps {
    reader: ReaderEnriched;
    index: number;
    actions?: {
        onReturnBook?: (reader: ReaderEnriched) => void;
        onShowInfo?: (reader: ReaderEnriched) => void;
    };
}

const ReadersItem: FC<ReadersItemProps> = ({ reader, index, actions }) => {
    return (
        <>
            <td>{index}</td>
            <td>{reader.name}</td>
            <td>{reader.email}</td>
            <td className="text-center">{new Date(reader.registeredAt).toLocaleDateString()}</td>
            <td className="text-end text-nowrap">
                {reader.hasCurrentLoan && (
                    <button
                        className="btn btn-sm btn-primary me-3"
                        onClick={() => actions?.onReturnBook?.(reader)}
                    >
                        Return book
                    </button>
                )}
                <button
                    className="btn btn-sm btn-secondary"
                    onClick={() => actions?.onShowInfo?.(reader)}
                >
                    Info
                </button>
            </td>
        </>
    );
};

export default ReadersItem;
