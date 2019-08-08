import React, { ReactNode, FC, useCallback, useMemo, useState, useEffect } from 'react';
import styles from './styles.less';
import classNames from 'classnames';
import {
    IconButton,
    CloseIcon,
    useElevationClassName,
    useOverlayContainer,
} from '@equinor/fusion-components';
import { useComponentDisplayClassNames } from '@equinor/fusion';
import { createPortal } from 'react-dom';

type ModalSideSheetProps = {
    children: ReactNode;
    header?: string;
    show?: boolean;
    scrollable?: boolean;
    onClose?: () => void;
    headerIcons?: ReactNode[];
};

const ModalSideSheet: FC<ModalSideSheetProps> = ({
    children,
    header,
    show,
    scrollable,
    onClose,
    headerIcons,
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

    const modalSideSheetClassNames = classNames(
        styles.modalSideSheet,
        useElevationClassName(16),
        useComponentDisplayClassNames(styles)
    );

    const containerClassName = classNames(styles.container, {
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
        <Overlay show={show}>
            <div className={containerClassName} onClick={close}>
                <div
                    className={modalSideSheetClassNames}
                    onClick={e => e.stopPropagation()}
                    onTransitionEnd={() => {
                        !isShowing && onClose && onClose();
                    }}
                >
                    <header className={styles.header}>
                        <div className={styles.closeButton}>
                            <IconButton onClick={close}>
                                <CloseIcon />
                            </IconButton>
                        </div>
                        <div className={styles.headerContent}>
                            <div className={styles.headerTitle}>{header}</div>
                            <div className={styles.headerIcons}>{headerIcons}</div>
                        </div>
                    </header>
                    {content}
                </div>
            </div>
        </Overlay>
    );
};

const Overlay = ({ children, show }) => {
    const overlayContainer = useOverlayContainer();
    if (show == false || !overlayContainer) {
        return null;
    }
    return overlayContainer && createPortal(children, overlayContainer);
};

export default ModalSideSheet;
