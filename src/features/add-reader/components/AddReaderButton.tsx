import React, { FC } from 'react';

type AddReaderButtonProps = {
    onClick: () => void;
};

const AddReaderButton: FC<AddReaderButtonProps> = ({ onClick }) => {
    return (
        <button type="button" className="btn btn-primary mb-4" onClick={onClick}>
            Add reader
        </button>
    );
};

export default AddReaderButton;
