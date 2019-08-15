import React, { FC, useRef, useMemo, useState, useEffect } from 'react';
import classNames from 'classnames';
import styles from './styles.less';
import { SortIcon } from '@equinor/fusion-components';

type AccordionProps = {
    isOpen?: boolean;
    disabled?: boolean;
    onChange?: () => void;
    children?: any;
    label: string;
    actionDirection?: 'left' | 'right';
};

const Accordion: FC<AccordionProps> = ({
    isOpen,
    onChange,
    children,
    disabled,
    label,
    actionDirection,
}) => {
    const headerClassNames = classNames(styles.header, {
        [styles.isOpen]: isOpen,
        [styles.disabled]: disabled,
        [styles.rightAction]: actionDirection && actionDirection === 'right',
    });
    const contentRef = useRef<HTMLDivElement>(null);
    const [contentHeight, setContentHeight] = useState<number>(0);

    useEffect(() => {
        if (contentRef && contentRef.current) {
            setContentHeight(contentRef.current.offsetHeight + contentRef.current.scrollHeight);
        }
    }, [contentRef]);

    return (
        <div className={styles.container}>
            <div className={headerClassNames} onClick={onChange}>
                <div className={styles.label}>{label}</div>
                <div className={styles.collapseIcon}>
                    <SortIcon direction={isOpen ? 'asc' : 'desc'} />
                </div>
            </div>
            <div
                className={styles.contentContainer}
                ref={contentRef}
                style={{ maxHeight: isOpen ? contentHeight : 0 }}
            >
                <div className={styles.content}>{children}</div>
            </div>
        </div>
    );
};

export default Accordion;
