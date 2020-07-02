import React, { FC, useMemo, useCallback, useEffect, useState } from 'react';
import styles from './styles.less';
import { getNavigationComponentForItem } from '../utils';
import { NavigationComponentProps } from '..';
import NavigationPopover from './NavigationPopover';
import NavigationItem from './NavigationItem';
import classNames from 'classnames';
import useTooltipRef from 'hooks/useTooltipRef';
import DropdownArrow from 'components/icons/components/action/DropdownArrow';

const Grouping: FC<NavigationComponentProps> = ({ navigationItem, onChange, isCollapsed }) => {
    const {
        id,
        icon,
        title,
        onClick,
        navigationChildren,
        isActive,
        isOpen,
        aside,
    } = navigationItem;
    const [shouldHaveTooltip, setShouldHaveTooltip] = useState(false);
    const tooltipRef = useTooltipRef(title, 'right');
    const textRef = React.useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (textRef.current) {
            const isOverflowing = textRef.current.offsetWidth < textRef.current.scrollWidth;
            setShouldHaveTooltip(isOverflowing);
        }
    }, [textRef]);

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

    const iconClasses = classNames(styles.navigationIcon, {
        [styles.isOpen]: !isCollapsed
    })

    const navigationContent = useMemo(
        () => (
            <div className={styles.groupingContainer} ref={shouldHaveTooltip ? tooltipRef : null}>
                <div className={styles.linkContainer} onClick={change}>
                    <div className={iconClasses}>{icon}</div>
                    <span className={styles.linkText} ref={textRef}>
                        {title}
                    </span>
                    {aside && <div className={styles.asideContainer}>{aside}</div>}
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
        [icon, title, isOpen, onChange, navigationChildren, aside, iconClasses]
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
