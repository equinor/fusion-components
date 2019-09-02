import React, { FC, useMemo, useCallback } from 'react';
import styles from './styles.less';
import classNames from 'classnames';
import { DropdownArrow } from '@equinor/fusion-components';
import { getNavigationComponentForItem } from '../utils';
import { NavigationComponentProps } from '..';
import CollapsedIcon from './CollapsedIcon';

const Grouping: FC<NavigationComponentProps> = ({ navigationItem, onChange, isCollapsed }) => {
    const { id, icon, title, onClick, navigationChildren, isActive, isOpen } = navigationItem;

    const containerClassNames = classNames(styles.container, styles.menuGrouping, {
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
        [onClick, id, isOpen, onChange]
    );

    const getCollapsedIcon = useCallback(
        () => (
            <CollapsedIcon onClick={() => change} title={title}>
                {icon}
            </CollapsedIcon>
        ),
        [icon, onChange, title]
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

export default Grouping;
