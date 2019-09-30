import React, { FC } from 'react';
import styles from './styles.less';
import { NavigationComponentProps } from '..';
import classNames from 'classnames';

const Label: FC<NavigationComponentProps> = ({ navigationItem, isCollapsed }) => {
    const { id, title } = navigationItem;

    const labelTitle = isCollapsed ? title.charAt(0) : title;

    const labelClassNames = classNames(styles.label, {
        [styles.isCollapsed]: isCollapsed,
    });

    return (
        <div className={labelClassNames} key={id}>
            <div className={styles.divider} />
            <div className={styles.title}>{labelTitle}</div>
        </div>
    );
};

export default Label;
