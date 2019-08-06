import React, { FC, ReactNode, useEffect, useState, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';
import styles from './styles.less';
import { IconButton, useRootContainer } from '@equinor/fusion-components';

type SideSheetProps = {
    children: ReactNode;
    show?: boolean;
    scrollable?: boolean;
    onClose?: () => void;
};

const SideSheet: FC<SideSheetProps> = ({ children, show, scrollable, onClose }) => {
    const [isShowing, setIsShowing] = useState(false);

    useEffect(() => {
        if (!isShowing && show) {
            setIsShowing(true);
        }
    }, [show]);

    const close = useCallback(() => {
        setIsShowing(false);
    }, []);

    const sideSheetClassNames = classNames(styles.sideSheet, {
        [styles.show]: isShowing,
    });
    const content = useMemo(() => {
        if (!show) {
            return null;
        }

        if (scrollable) {
            return (
                <div className={styles.scrollContainer}>
                    <div className={styles.content}>{children}</div>
                </div>
            );
        }

        return <div className={styles.content}>{children}</div>;
    }, [children, scrollable, show]);

    return (
        <SideSheetOverlay>
            <div
                className={sideSheetClassNames}
                onClick={e => e.stopPropagation()}
                onTransitionEnd={() => {
                    !isShowing && onClose && onClose();
                }}
            >
                {onClose ? (
                    <div className={styles.closeButton}>
                        <IconButton onClick={close}>X</IconButton>
                    </div>
                ) : null}

                {content}
            </div>
        </SideSheetOverlay>
    );
};

const SideSheetOverlay = ({ children }) => {
    const rootContainer = useRootContainer();
    const element = document.createElement('div');

    useEffect(() => {
        rootContainer && rootContainer.appendChild(element);

        return () => {
            rootContainer && rootContainer.removeChild(element);
        };
    }, []);

    return rootContainer && createPortal(children, rootContainer);
};

export default SideSheet;
