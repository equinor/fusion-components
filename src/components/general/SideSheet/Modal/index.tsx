import React, { ReactNode, useCallback, useMemo, useState, useEffect } from 'react';
import styles from './styles.less';
import classNames from 'classnames';
import {
    useComponentDisplayClassNames,
    useNotificationCenter,
    NotificationContextProvider,
} from '@equinor/fusion';
import useResizablePanel, { ResizablePaneOptions } from '../useResizablePanel';
import BannerPresenter from './BannerPresenter';
import SnackbarPresenter from './SnackbarPresenter';
import useElevationClassName from 'hooks/useElevationClassName';
import OverlayPortal from 'components/utils/OverlayPortal';
import Scrim from 'components/general/Scrim';
import PaginationArrow from 'components/icons/components/navigation/PaginationArrow';
import IconButton from 'components/general/IconButton';
import CloseIcon from 'components/icons/components/navigation/CloseIcon';

type SideSheetSize = 'fullscreen' | 'xlarge' | 'large' | 'medium' | 'small';

type ModalSideSheetProps = ResizablePaneOptions & {
    children: ReactNode;
    header?: string;
    show?: boolean;
    onClose?: () => void;
    headerIcons?: ReactNode[];
    size?: SideSheetSize;
    safeClose?: boolean;
    safeCloseTitle?: string;
    safeCloseConfirmLabel?: string;
    safeCloseCancelLabel?: string;
};

export default ({
    children,
    header,
    show,
    onClose,
    headerIcons,
    size = 'large',
    safeClose,
    safeCloseTitle,
    safeCloseConfirmLabel,
    safeCloseCancelLabel,
    isResizable = false,
    id = '',
    minWidth,
    maxWidth,
}: ModalSideSheetProps) => {
    const [isShowing, setIsShowing] = useState(false);
    const sendNotification = useNotificationCenter();

    useEffect(() => {
        if (!isShowing && show) {
            setIsShowing(true);
        }
    }, [show]);

    const closeSafe = useCallback(async () => {
        const response = await sendNotification({
            level: 'high',
            title: safeCloseTitle || '',
            confirmLabel: safeCloseConfirmLabel || 'Confirm',
            cancelLabel: safeCloseCancelLabel || 'Cancel',
        });
        if (response.confirmed || response.dismissed) {
            setIsShowing(false);
        }
    }, [sendNotification, safeCloseTitle]);

    const { resizedSize, isResizing, onResizeStart } = useResizablePanel(
        {
            isResizable,
            id,
            minWidth,
            maxWidth,
        },
        [size, show]
    );

    const close = useCallback(() => {
        if (isResizing) {
            return;
        }

        if (safeClose) {
            return closeSafe();
        }
        setIsShowing(false);
    }, [safeClose, isResizing]);

    const content = useMemo(() => {
        if (!show) {
            return null;
        }
        return <div className={styles.content}>{children}</div>;
    }, [children, show]);

    const modalSideSheetClassNames = classNames(
        styles.modalSideSheet,
        useElevationClassName(16),
        useComponentDisplayClassNames(styles),
        {
            [styles.show]: isShowing,
            [styles.fullscreen]: size === 'fullscreen',
            [styles.xlarge]: size === 'xlarge',
            [styles.large]: size === 'large',
            [styles.medium]: size === 'medium',
            [styles.small]: size === 'small',
            [styles.isResizing]: isResizing,
        }
    );

    const resizeIndicatorClassNames = classNames(styles.indicator, useElevationClassName(1));

    return (
        <OverlayPortal show={show}>
            <Scrim onClick={close} show={isShowing}>
                <NotificationContextProvider>
                    <div
                        style={{ ...resizedSize }}
                        className={modalSideSheetClassNames}
                        onClick={e => e.stopPropagation()}
                        onTransitionEnd={() => {
                            !isShowing && onClose && onClose();
                        }}
                    >
                        {isResizable && (
                            <div className={styles.resizeHandle} onMouseDown={onResizeStart}>
                                <div className={styles.bar} />
                                <div className={resizeIndicatorClassNames}>
                                    <PaginationArrow prev />
                                    <PaginationArrow next />
                                </div>
                            </div>
                        )}
                        <BannerPresenter />
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
                        <SnackbarPresenter />
                    </div>
                </NotificationContextProvider>
            </Scrim>
        </OverlayPortal>
    );
};
