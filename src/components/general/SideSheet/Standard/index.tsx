import React, { FC, useState, useCallback, useRef, useEffect, ReactNode } from 'react';
import classNames from 'classnames';
import { useComponentDisplayClassNames } from '@equinor/fusion';
import styles from './styles.less';
import CollapseExpandButton from './CollapseExpandButton';
import { OverlayPortal, styling } from '@equinor/fusion-components';

export type StandardSideSheetProps = {
    id: string;
    title?: string;
    isOpen: boolean;
    onClose: (isOpen: boolean) => void;
    screenPlacement?: 'right' | 'left';
    children: ReactNode;
};

const SideSheet: React.FC<StandardSideSheetProps> = ({
    id,
    title,
    isOpen,
    onClose,
    children,
    screenPlacement = 'right',
}) => {
    const toggleOpen = useCallback(() => {
        onClose(!isOpen);
    }, [isOpen]);

    const containerClassNames = classNames(
        styles.container,
        useComponentDisplayClassNames(styles),
        {
            [styles.isCollapsed]: !isOpen,
            [styles.screenPlacementLeft]: screenPlacement === 'left',
        }
    );

    return (
        <div className={containerClassNames} key={id}>
            <div className={styles.header}>
                <div className={styles.collapseButtonContainer}>
                    <CollapseExpandButton
                        isOpen={isOpen}
                        onClick={toggleOpen}
                        screenPlacement={screenPlacement}
                    />
                </div>
                {isOpen && title && <div className={styles.title}>{title}</div>}
            </div>
            {isOpen && <div>{children}</div>}
        </div>
    );
};

const StandardSideSheet: FC<StandardSideSheetProps> = ({
    id,
    title,
    isOpen,
    onClose,
    children,
}) => {
    const [windowWidth, setWindowWidth] = useState<Number>(0);
    const rootElement = document.getElementById('root');

    useEffect(() => {
        let animationFrame = 0;

        const checkResize = () => {
            if (rootElement) {
                const width = rootElement.clientWidth;

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
        <SideSheet id={id} title={title} isOpen={isOpen} onClose={onClose}>
            {children}
        </SideSheet>
    );

    const mobileMaxWidth = styling.mobileWidth();

    if (isOpen && windowWidth < parseInt(mobileMaxWidth)) {
        return <OverlayPortal show={isOpen}>{sideSheet}</OverlayPortal>;
    }

    return sideSheet;
};

export default StandardSideSheet;
