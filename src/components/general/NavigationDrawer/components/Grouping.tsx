import { useRef, FC, useMemo, useCallback, useEffect, useState } from 'react';
import { useStyles } from './Components.style';
import { DropdownArrow } from '@equinor/fusion-components';
import { getNavigationComponentForItem } from '../utils';
import { NavigationComponentProps } from '..';
import NavigationPopover from './NavigationPopover';
import NavigationItem from './NavigationItem';
import { useTooltipRef } from '@equinor/fusion-components';
import classNames from 'classnames';

const Grouping: FC<NavigationComponentProps> = ({
    navigationItem,
    onChange,
    isCollapsed,
    darkTheme,
}) => {
    const {
        id,
        icon,
        title,
        onClick,
        navigationChildren,
        isActive,
        isOpen,
        aside,
        isDisabled,
        href,
        info,
        style,
    } = navigationItem;
    const styles = useStyles();
    const [shouldHaveTooltip, setShouldHaveTooltip] = useState(false);
    const tooltipRef = useTooltipRef(title, 'right');
    const textRef = useRef<HTMLElement | null>(null);

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
        //If no onClick function is defined the grouping should toggle open on the whole container and not toggle active.
        const shouldToggleOpen = onClick ? !isOpen : true;
        const shouldToggleActive = onClick ? !isDisabled : false;

        onChange && onChange(id, shouldToggleOpen, shouldToggleActive);
        !isDisabled && onClick && onClick();
    }, [onClick, id, isOpen, onChange, isDisabled]);

    const iconClasses = classNames(styles.navigationIcon, {
        [styles.isOpen]: !isCollapsed,
    });

    const navigationContent = useMemo(
        () => (
            <div className={styles.groupingContainer} ref={shouldHaveTooltip ? tooltipRef : null}>
                <a
                    className={styles.linkContainer}
                    onClick={change}
                    href={!isDisabled && href?.length ? href : undefined}
                >
                    <div className={iconClasses}>{icon}</div>
                    <span className={styles.linkText} ref={textRef}>
                        {title}
                    </span>
                    {aside && <div className={styles.asideContainer}>{aside}</div>}
                </a>
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
                darkTheme={darkTheme}
                groupShouldNotBeClickable={!onClick}
            />
        ),
        [icon, navigationStructure, getNavigationContent, navigationChildren, isActive]
    );

    if (isCollapsed) {
        return collapsedContent;
    }

    return (
        <>
            <NavigationItem
                id={id}
                isActive={isActive}
                type="grouping"
                isCollapsed={isCollapsed}
                isDisabled={isDisabled}
                info={info}
                style={style}
            >
                {navigationContent}
            </NavigationItem>
            {isOpen && navigationStructure}
        </>
    );
};

export default Grouping;
