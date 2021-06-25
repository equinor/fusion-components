import { FC, useState, useCallback, useEffect, ReactNode, useMemo } from 'react';

import classNames from 'classnames';
import { useComponentDisplayClassNames, useFusionContext } from '@equinor/fusion';
import styles from './styles.less';
import CollapseExpandButton from './CollapseExpandButton';
import {
    OverlayPortal,
    styling,
    PaginationArrow,
    useElevationClassName,
} from '@equinor/fusion-components';
import useResizablePanel, { ResizablePaneOptions } from '../useResizablePanel';

type SideSheetSize = 'xlarge' | 'large' | 'medium' | 'small';

export type StandardSideSheetProps = ResizablePaneOptions & {
    id: string;
    title?: string;
    isOpen: boolean;
    onClose: (isOpen: boolean) => void;
    screenPlacement?: 'right' | 'left';
    size?: SideSheetSize;
    children: ReactNode;
    headerContent?: ReactNode;
};

const SideSheet: FC<StandardSideSheetProps> = ({
    id,
    title,
    isOpen,
    onClose,
    size = 'medium',
    children,
    screenPlacement = 'right',
    isResizable,
    minWidth,
    maxWidth,
    headerContent,
}) => {
    const toggleOpen = useCallback(() => {
        onClose(!isOpen);
    }, [isOpen]);

    const windowWidth = (window.innerWidth / 3) * 2;
    const { resizedSize, isResizing, onResizeStart } = useResizablePanel(
        {
            isResizable: isOpen && isResizable,
            id,
            minWidth,
            maxWidth: Math.min(maxWidth || windowWidth, windowWidth),
            screenPlacement,
        },
        [size, isOpen]
    );

    const containerClassNames = classNames(
        styles.container,
        useComponentDisplayClassNames(styles),
        {
            [styles.isCollapsed]: !isOpen,
            [styles.screenPlacementLeft]: screenPlacement === 'left',
            [styles.xlarge]: size === 'xlarge',
            [styles.large]: size === 'large',
            [styles.medium]: size === 'medium',
            [styles.small]: size === 'small',
            [styles.isResizing]: isResizing,
        }
    );

    const resizeIndicatorClassNames = classNames(styles.indicator, useElevationClassName(1));

    return (
        <div className={containerClassNames} key={id} style={{ ...resizedSize }}>
            {isResizable && isOpen && (
                <div className={styles.resizeHandle} onMouseDown={onResizeStart}>
                    <div className={styles.bar} />
                    <div className={resizeIndicatorClassNames}>
                        <PaginationArrow prev />
                        <PaginationArrow next />
                    </div>
                </div>
            )}
            <div className={styles.header}>
                <div className={styles.collapseButtonContainer}>
                    <CollapseExpandButton
                        isOpen={isOpen}
                        onClick={toggleOpen}
                        screenPlacement={screenPlacement}
                    />
                </div>
                {isOpen && title && <div className={styles.title}>{title}</div>}
                {isOpen && headerContent && (
                    <div className={styles.headerContent}>{headerContent}</div>
                )}
            </div>
            {isOpen && <div className={styles.content}>{children}</div>}
        </div>
    );
};

const StandardSideSheet: FC<StandardSideSheetProps> = ({
    id,
    title,
    isOpen,
    onClose,
    size,
    screenPlacement,
    isResizable,
    minWidth,
    maxWidth,
    children,
    headerContent,
}) => {
    const [windowWidth, setWindowWidth] = useState<number>(0);
    const fusionContext = useFusionContext();
    const rootElement = fusionContext.refs.root;

    useEffect(() => {
        let animationFrame = 0;

        const checkResize = () => {
            if (rootElement && rootElement.current) {
                const width = rootElement.current.clientWidth;

                if (width != windowWidth) {
                    setWindowWidth(width);
                }
            }
            animationFrame = window.requestAnimationFrame(checkResize);
        };
        checkResize();

        return () => window.cancelAnimationFrame(animationFrame);
    }, [rootElement, windowWidth]);

    const sideSheet = (
        <SideSheet
            id={id}
            title={title}
            isOpen={isOpen}
            size={size}
            onClose={onClose}
            screenPlacement={screenPlacement}
            isResizable={isResizable}
            minWidth={minWidth}
            maxWidth={maxWidth}
            headerContent={headerContent}
        >
            {children}
        </SideSheet>
    );

    const mobileMaxWidth = useMemo(() => styling.mobileWidth(), [windowWidth]);

    if (isOpen && windowWidth < parseInt(mobileMaxWidth)) {
        return <OverlayPortal show={isOpen}>{sideSheet}</OverlayPortal>;
    }

    return sideSheet;
};

export default StandardSideSheet;
