import React, { EventHandler, SyntheticEvent } from 'react';

import styles from './styles.less';

type PageButtonProps = {
    pageIndex: number;
    currentPageIndex: number;
    onClick: EventHandler<SyntheticEvent>;
};

const PageButton = ({ pageIndex, currentPageIndex, onClick }: PageButtonProps) => (
    <button className={currentPageIndex === pageIndex ? styles.current : null} onClick={onClick}>
        {pageIndex + 1}
    </button>
);

export default PageButton;
