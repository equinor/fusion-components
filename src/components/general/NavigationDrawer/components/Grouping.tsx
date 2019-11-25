import React, { FC, useMemo, useCallback } from 'react';
import styles from './styles.less';
import { DropdownArrow } from '@equinor/fusion-components';
import { getNavigationComponentForItem } from '../utils';
import { NavigationComponentProps } from '..';
import NavigationPopover from './NavigationPopover';
import NavigationItem from './NavigationItem';

const Grouping: FC<NavigationComponentProps> = ({ navigationItem, onChange, isCollapsed }) => {
    const { id, icon, title, onClick, navigationChildren, isActive, isOpen } = navigationItem;

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

    const getNavigationContent = useCallback(
        () => (
            <>
                <div className={styles.linkContainer} onClick={change}>
                    <div className={styles.navigationIcon}>{icon}</div>
                    <div className={styles.linkText}>{title}</div>
                </div>
                <div
                    className={styles.toggleOpenContainer}
                    onClick={() => onChange && onChange(id, true, false)}
                >
                    {!isCollapsed && navigationChildren && navigationChildren.length > 0 && (
                        <DropdownArrow cursor="pointer" isOpen={isOpen || false} />
                    )}
                </div>
            </>
        ),
        [icon, title, isOpen, onChange]
    );

    const getCollapsedContent = useCallback(
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
        return getCollapsedContent();
    }

    return (
        <>
            <NavigationItem isActive={isActive} type="grouping" isCollapsed={isCollapsed}>
                {getNavigationContent()}
            </NavigationItem>
            {isOpen && navigationStructure}
        </>
    );
};

export default Grouping;
