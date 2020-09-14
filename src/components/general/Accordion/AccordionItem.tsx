import React, { FC } from 'react';
import classNames from 'classnames';
import styles from './styles.less';
import { useComponentDisplayClassNames } from '@equinor/fusion';
import SortIcon from 'components/icons/components/action/SortIcon';

type AccordionItemProps = {
    isOpen?: boolean;
    disabled?: boolean;
    onChange?: () => void;
    children?: any;
    label: string;
    actionDirection?: 'left' | 'right';
};

const AccordionItem: FC<AccordionItemProps> = ({
    isOpen,
    onChange,
    children,
    disabled,
    label,
    actionDirection,
}) => {
    const headerClassNames = classNames(styles.header, useComponentDisplayClassNames(styles), {
        [styles.isOpen]: isOpen,
        [styles.disabled]: disabled,
        [styles.rightAction]: actionDirection && actionDirection === 'right',
    });

    const contentContainerClassNames = classNames(styles.contentContainer, {
        [styles.isOpen]: isOpen,
    });

    return (
        <div className={styles.accordion}>
            <div className={headerClassNames} onClick={onChange}>
                <div className={styles.label}>{label}</div>
                <div className={styles.collapseIcon}>
                    <SortIcon direction={isOpen ? 'asc' : 'desc'} />
                </div>
            </div>
            <div className={contentContainerClassNames}>
                <div className={styles.content}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AccordionItem;
