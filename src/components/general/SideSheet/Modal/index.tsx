import { ReactNode, useCallback, useMemo, useState, useEffect, useRef } from 'react';
import { useStyles } from './Modal.style';
import classNames from 'classnames';
import {
    IconButton,
    CloseIcon,
    useElevationClassName,
    OverlayPortal,
    Scrim,
    PaginationArrow,
} from '@equinor/fusion-components';
import {
    useComponentDisplayClassNames,
    useNotificationCenter,
    NotificationContextProvider,
} from '@equinor/fusion';
import useResizablePanel, { ResizablePaneOptions } from '../useResizablePanel';
import BannerPresenter from './BannerPresenter';
import SnackbarPresenter from './SnackbarPresenter';
import Overlay from '../../ApplicationGuidance/components/Overlay';

type SideSheetSize = 'fullscreen' | 'xxlarge' | 'xlarge' | 'large' | 'medium' | 'small';

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
    const styles = useStyles();
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

    const contentRef = useRef<HTMLDivElement>(null);
    const content = useMemo(() => {
        if (!show) {
            return null;
        }
        return (
            <div data-cy="modal-content" ref={contentRef} className={styles.content}>
                <Overlay>{children}</Overlay>
            </div>
        );
    }, [children, show, contentRef]);

    useEffect(() => {
        const el = contentRef.current;
        if (!el) return;

        const setMaxHeight = () => {
            const rects = el.getBoundingClientRect();
            el.style.maxHeight = `calc(100% - ${rects.top}px)`;
        };
        setMaxHeight();

        window.addEventListener('resize', setMaxHeight, { passive: true });
        return () => window.removeEventListener('resize', setMaxHeight);
    }, [contentRef.current]);

    const modalSideSheetClassNames = classNames(
        styles.modalSideSheet,
        useElevationClassName(16),
        useComponentDisplayClassNames(styles),
        {
            [styles.show]: isShowing,
            [styles.fullscreen]: size === 'fullscreen',
            [styles.xxlarge]: size === 'xxlarge',
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
                        id={id}
                        style={{ ...resizedSize }}
                        className={modalSideSheetClassNames}
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
                        <Overlay fixed>
                            <header className={styles.header}>
                                <div className={styles.closeButton}>
                                    <IconButton id="close-btn" onClick={close}>
                                        <CloseIcon />
                                    </IconButton>
                                </div>
                                <div className={styles.headerContent}>
                                    <div className={styles.headerTitle}>{header}</div>
                                    <div className={styles.headerIcons}>{headerIcons}</div>
                                </div>
                            </header>
                        </Overlay>
                        <SnackbarPresenter />
                        {content}
                    </div>
                </NotificationContextProvider>
            </Scrim>
        </OverlayPortal>
    );
};
