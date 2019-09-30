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

    const [contentHeight, setContentHeight] = useState<number>(0);

    useEffect(() => {
        let animationFrame = 0;

        const checkHeight = () => {
            if (contentRef.current) {
                const height = contentRef.current.getBoundingClientRect().height;

                if (height !== contentHeight) {
                    setContentHeight(height);
                }
            }

            animationFrame = window.requestAnimationFrame(checkHeight);
        };

        checkHeight();

        return () => window.cancelAnimationFrame(animationFrame);
    }, [contentRef.current, contentHeight]);

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
            >
                <div ref={contentRef} className={styles.content}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AccordionItem;
