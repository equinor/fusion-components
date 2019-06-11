import React from 'react';

type PrevPageButtonProps = {
    onClick: () => void;
    disabled: boolean;
};

const PrevPageButton = ({ onClick, disabled }: PrevPageButtonProps) => (
    <button onClick={onClick} disabled={disabled}>
        {'<'}
    </button>
);

export default PrevPageButton;
