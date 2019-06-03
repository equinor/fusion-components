import * as React from 'react';

import Button from '../../../general/Button';
import Spinner from '../../../feedback/Spinner';

import styles from '../styles/index.less';

type InfoToolbarProps = {
    dataCount: number,
    onReset: () => void,
    canReset: boolean,
    isFetching: boolean,
};

const InfoToolbar: React.FC<InfoToolbarProps> = ({ dataCount, onReset, canReset, isFetching }) => (
    <div>
        <div>
            {dataCount} items{' '}
            {isFetching && (
                <span>
                    {' '}
                    <Spinner inline size={11} />
                </span>
            )}
        </div>
        <div>
            <Button signal frameless onClick={onReset} disabled={!canReset}>
                Reset
            </Button>
        </div>
    </div>
);

export default InfoToolbar;
