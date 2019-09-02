import React, { FC, useRef, useState, useEffect } from 'react';
import classNames from 'classnames';
import styles from './styles.less';
import { SortIcon } from '@equinor/fusion-components';
import { useComponentDisplayClassNames } from '@equinor/fusion';

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
    const contentRef = useRef<HTMLDivElement>(null);
    const currentContentHeight =
        contentRef && contentRef.current
            ? contentRef.current.offsetHeight + contentRef.current.scrollHeight
            : 0;

    const [contentHeight, setContentHeight] = useState<number>(0);

    useEffect(() => {
        if (contentRef && contentRef.current) {
            setContentHeight(contentRef.current.offsetHeight + contentRef.current.scrollHeight);
        }
    }, [currentContentHeight]);

    return (
        <div className={styles.accordion}>
            <div className={headerClassNames} onClick={onChange}>
                <div className={styles.label}>{label}</div>
                <div className={styles.collapseIcon}>
                    <SortIcon direction={isOpen ? 'asc' : 'desc'} />
                </div>
            </div>
            <div
                className={styles.contentContainer}
                style={{ maxHeight: isOpen ? contentHeight : 0 }}
                ref={contentRef}
            >
                <div className={styles.content}>{children}</div>
            </div>
        </div>
    );
};

export default AccordionItem;
