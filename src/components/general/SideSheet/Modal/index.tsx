import React, { ReactNode, FC, useCallback, useMemo, useState, useEffect } from 'react';
import styles from './styles.less';
import classNames from 'classnames';
import {
    IconButton,
    CloseIcon,
    useElevationClassName,
    useOverlayContainer,
} from '@equinor/fusion-components';
import { createPortal } from 'react-dom';

type ModalSideSheetProps = {
    children: ReactNode;
    header?: string;
    show?: boolean;
    scrollable?: boolean;
    onClose?: () => void;
};

const ModalSideSheet: FC<ModalSideSheetProps> = ({
    children,
    header,
    show,
    scrollable,
    onClose,
}) => {

    const [isShowing, setIsShowing] = useState(false);

    useEffect(() => {
        if (!isShowing && show) {
            setIsShowing(true);
        }
    }, [show]);

    const close = useCallback(() => {
        setIsShowing(false);
    }, []);

    const modalSideSheetClassNames = classNames(styles.modalSideSheet, useElevationClassName(16));

    const containerClassName = classNames(styles.container, {
        [styles.show]: isShowing,
        [styles.hasHeader]: header,
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
        <Overlay>
            <div className={containerClassName} onClick={close}>
                <div
                    className={modalSideSheetClassNames}
                    onClick={e => e.stopPropagation()}
                    onTransitionEnd={() => {
                        !isShowing && onClose && onClose();
                    }}
                >
                    {onClose ? (
                        <div className={styles.closeButton}>
                            <IconButton onClick={close}>
                                <CloseIcon />
                            </IconButton>
                        </div>
                    ) : null}

                    {header && <header className={styles.header}>{header}</header>}
                    {content}
                </div>
            </div>
        </Overlay>
    );
};

const Overlay = ({ children }) => {
    const overlayContainer = useOverlayContainer();
    const element = document.createElement('div');

    useEffect(() => {
        overlayContainer && overlayContainer.appendChild(element);

        return () => {
            overlayContainer && overlayContainer.removeChild(element);
        };
    }, []);

    return overlayContainer && createPortal(children, overlayContainer);
};

export default ModalSideSheet;
