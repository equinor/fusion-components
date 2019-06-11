import React from 'react';

type NextPageButtonProps = {
    onClick: () => void;
    disabled: boolean;
};

const NextPageButton = ({ onClick, disabled }: NextPageButtonProps) => (
    <button onClick={onClick} disabled={disabled}>
        {'>'}
    </button>
);

export default NextPageButton;
