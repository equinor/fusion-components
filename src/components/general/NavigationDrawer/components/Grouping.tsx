import React, { FC, useMemo, useCallback } from 'react';
import styles from './styles.less';
import classNames from 'classnames';
import { useComponentDisplayClassNames } from '@equinor/fusion';
import { DropdownArrow } from '@equinor/fusion-components';
import { getNavigationComponentForItem } from '../utils';
import { NavigationComponentProps } from '..';

const Grouping: FC<NavigationComponentProps> = ({
    title,
    id,
    onClick,
    isActive,
    icon,
    navigationChildren,
    isOpen,
    onChange,
    isCollapsed,
}) => {
    const containerClassNames = classNames(
        styles.container,
        useComponentDisplayClassNames(styles),
        {
            [styles.menuGrouping]: true,
            [styles.isActive]: isActive,
            [styles.isCollapsed]: isCollapsed,
        }
    );
    const navigationStructure = useMemo(
        () =>
            getNavigationComponentForItem(navigationChildren, {
                onChange: onChange,
                icon: icon,
                isCollapsed: isCollapsed,
            }),
        [navigationChildren, onChange, isCollapsed, icon]
    );

    const change = useCallback(
        isCollapsed => {
            onChange && (isCollapsed ? onChange(id, false, true) : onChange(id, !isOpen, true));
            onClick && onClick();
        },
        [onClick, id, isOpen, onChange]
    );

    const getCollapsedIcon = useCallback(
        () => (
            <div className={styles.navigationIcon} onClick={() => change(true)}>
                {icon}
            </div>
        ),
        [icon, onChange]
    );

    const getNavigationContent = useCallback(
        () => (
            <>
                <div className={styles.linkContainer} onClick={() => change(false)}>
                    <div className={styles.navigationIcon}>{icon}</div>
                    <div className={styles.linkText}>{title}</div>
                </div>
                <div
                    className={styles.toggleOpenContainer}
                    onClick={() => onChange && onChange(id, true, true)}
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

export default Grouping;
