import React, { FC, useCallback, useMemo, useState, useRef } from 'react';
import styles from './styles.less';
import classNames from 'classnames';
import { DropdownArrow, RelativeOverlayPortal } from '@equinor/fusion-components';
import { NavigationComponentProps } from '..';
import { getNavigationComponentForItem } from '../utils';
import CollapsedIcon from './CollapsedIcon';

const Section: FC<NavigationComponentProps> = ({ navigationItem, onChange, isCollapsed }) => {
    const { id, icon, isActive, title, onClick, navigationChildren, isOpen } = navigationItem;

    const containerClassNames = classNames(styles.container, styles.menuSection, {
        [styles.isActive]: isActive,
        [styles.isCollapsed]: isCollapsed,
    });

    const [showNavigationPopover, setShowNavigationPopover] = useState(false);
    const popoverRef = useRef(null);

    const navigationStructure = useMemo(
        () =>
            getNavigationComponentForItem(
                navigationChildren,
                {
                    onChange: onChange,
                    isCollapsed: isCollapsed,
                    icon: icon,
                },
                {
                    icon: icon,
                }
            ),
        [navigationChildren, onChange, isCollapsed, icon]
    );

    const change = useCallback(
        isCollapsed => {
            onChange && (isCollapsed ? onChange(id, false, true) : onChange(id, !isOpen, true));
            onClick && onClick();
        },
        [onClick, id, isOpen, isCollapsed, onChange]
    );

    const getCollapsedIcon = useCallback(
        () => (
            <>
            <CollapsedIcon onClick={() => setShowNavigationPopover(!showNavigationPopover)} title={title}>
                {icon}
            </CollapsedIcon>
            <RelativeOverlayPortal relativeRef={controllerRef} show={showNavigationPopover}>
            <div style={{position: "absolute", left:"100%", minWidth:"100%", }}>{getNavigationContent}</div>
        </RelativeOverlayPortal>
        </>
        ),
        [icon, onChange, title]
    );

    const getNavigationContent = useCallback(
        () => (
            <>
                <div className={styles.linkContainer} onClick={() => change(false)}>
                    {title}
                </div>
                <div
                    className={styles.toggleOpenContainer}
                    onClick={() => onChange && onChange(id, true, false)}
                >
                    <DropdownArrow cursor="pointer" isOpen={isOpen || false} />
                </div>
            </>
        ),
        [icon, title, isOpen, onChange]
    );

    return (
        <>
            <div className={containerClassNames}>
                {isCollapsed ? getCollapsedIcon() : getNavigationContent()}
                <div className={styles.visualOnClickContainer} />
            </div>
            {isOpen && navigationStructure}
        </>
    );
};

export default Section;
