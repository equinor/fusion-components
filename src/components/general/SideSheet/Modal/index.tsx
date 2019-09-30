import React, { ReactNode, FC, useCallback, useMemo, useState, useEffect } from 'react';
import styles from './styles.less';
import classNames from 'classnames';
import {
    IconButton,
    CloseIcon,
    useElevationClassName,
    OverlayPortal,
    Scrim,
} from '@equinor/fusion-components';
import { useComponentDisplayClassNames } from '@equinor/fusion';

export type SideSheetSize = 'xlarge' | 'large' | 'medium' | 'small';

type ModalSideSheetProps = {
    children: ReactNode;
    header?: string;
    show?: boolean;
    onClose?: () => void;
    headerIcons?: ReactNode[];
    size?: SideSheetSize;
};

export default ({
    children,
    header,
    show,
    onClose,
    headerIcons,
    size = 'xlarge',
}: ModalSideSheetProps) => {
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
        useComponentDisplayClassNames(styles),
        {
            [styles.show]: isShowing,
            [styles.xlarge]: size === 'xlarge',
            [styles.large]: size === 'large',
            [styles.medium]: size === 'medium',
            [styles.small]: size === 'small',
        }
    );

    const content = useMemo(() => {
        if (!show) {
            return null;
        }
        return <div className={styles.content}>{children}</div>;
    }, [children, show]);

    return (
        <OverlayPortal show={show}>
            <Scrim onClick={close} show={isShowing}>
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
            </Scrim>
        </OverlayPortal>
    );
};
