import React, { FC } from 'react';
import styles from './styles.less';
import classNames from 'classnames';
import { useComponentDisplayClassNames } from '@equinor/fusion';

type ChildProps = {
    title: string;
    key: string;
    onClick?: () => void;
    active?: boolean;
};

const Child: FC<ChildProps> = ({ title, key, onClick, active }) => {
    const containerClassNames = classNames(
        styles.container,
        useComponentDisplayClassNames(styles),
        {
            [styles.menuChild]: true,
            [styles.isActive]: active,
        }
    );

    return (
        <div key={key} onClick={onClick} className={containerClassNames}>
            <a className={styles.linkContainer}>
                <div className={styles.title}>{title}</div>
            </a>
        </div>
    );
};

export default Child;
