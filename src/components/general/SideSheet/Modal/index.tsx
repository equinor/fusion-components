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

type ModalSideSheetProps = {
    children: ReactNode;
    header?: string;
    show?: boolean;
    onClose?: () => void;
    headerIcons?: ReactNode[];
};

const ModalSideSheet: FC<ModalSideSheetProps> = ({
    children,
    header,
    show,
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
        useComponentDisplayClassNames(styles),
        {
            [styles.show]: isShowing,
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

export default ModalSideSheet;
