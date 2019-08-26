import React, { FC, useCallback, useMemo } from 'react';
import styles from './styles.less';
import classNames from 'classnames';
import { DropdownArrow } from '@equinor/fusion-components';
import { NavigationComponentProps } from '..';
import { getNavigationComponentForItem } from '../utils';

const Section: FC<NavigationComponentProps> = ({ navigationItem, onChange, isCollapsed }) => {
    const { id, icon, isActive, title, onClick, navigationChildren, isOpen } = navigationItem;

    const containerClassNames = classNames(styles.container, styles.menuSection, {
        [styles.isActive]: isActive,
        [styles.isCollapsed]: isCollapsed,
    });

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
