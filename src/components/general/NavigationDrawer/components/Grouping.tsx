import React, { FC, useMemo, useCallback, useEffect, useState } from 'react';
import styles from './styles.less';
import { DropdownArrow } from '@equinor/fusion-components';
import { getNavigationComponentForItem } from '../utils';
import { NavigationComponentProps } from '..';
import NavigationPopover from './NavigationPopover';
import NavigationItem from './NavigationItem';
import { useTooltipRef } from '@equinor/fusion-components';

const Grouping: FC<NavigationComponentProps> = ({ navigationItem, onChange, isCollapsed }) => {
    const { id, icon, title, onClick, navigationChildren, isActive, isOpen } = navigationItem;
    const [shouldHaveTooltip, setShouldHaveTooltip] = useState(false);
    const tooltipRef = useTooltipRef(title, 'right');
    const textRef = React.useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (textRef.current) {
            const isOverflowing = textRef.current.offsetWidth < textRef.current.scrollWidth;
            setShouldHaveTooltip(isOverflowing);
        }
    }, [textRef])

    const navigationStructure = useMemo(
        () =>
            getNavigationComponentForItem(navigationChildren, {
                onChange: onChange,
                isCollapsed: isCollapsed,
            }),
        [navigationChildren, onChange, isCollapsed]
    );

    const change = useCallback(() => {
        onChange && onChange(id, !isOpen, true);
        onClick && onClick();
    }, [onClick, id, isOpen, onChange]);

    const navigationContent = useMemo(
        () => (
            <div className={styles.groupingContainer} ref={shouldHaveTooltip ? tooltipRef : null}>
                <div className={styles.linkContainer} onClick={change}>
                    <div className={styles.navigationIcon}>{icon}</div>
                    <span className={styles.linkText} ref={textRef}>{title}</span>
                </div>
                <div
                    className={styles.toggleOpenContainer}
                    onClick={() => onChange && onChange(id, true, false)}
                >
                    {!isCollapsed && navigationChildren && navigationChildren.length > 0 && (
                        <DropdownArrow cursor="pointer" isOpen={isOpen || false} />
                    )}
                </div>
            </div>
        ),
        [icon, title, isOpen, onChange, navigationChildren]
    );

    const getNavigationContent = useCallback(() => navigationContent, [navigationContent]);

    const collapsedContent = useMemo(
        () => (
            <NavigationPopover
                icon={icon}
                navigationStructure={navigationStructure}
                navigationChildren={navigationChildren}
                groupingComponent={getNavigationContent}
                isActive={isActive}
            />
        ),
        [icon, navigationStructure, getNavigationContent, navigationChildren, isActive]
    );

    if (isCollapsed) {
        return collapsedContent;
    }

    return (
        <>
            <NavigationItem isActive={isActive} type="grouping" isCollapsed={isCollapsed}>
                {navigationContent}
            </NavigationItem>
            {isOpen && navigationStructure}
        </>
    );
};

export default Grouping;
