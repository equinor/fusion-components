import React, { FC, useCallback, useMemo } from 'react';
import styles from './styles.less';
import { DropdownArrow } from '@equinor/fusion-components';
import { NavigationComponentProps } from '..';
import { getNavigationComponentForItem } from '../utils';

import NavigationItem from './NavigationItem';

const Section: FC<NavigationComponentProps> = ({ navigationItem, onChange, isCollapsed }) => {
    const { id, isActive, title, onClick, navigationChildren, isOpen } = navigationItem;

    const navigationStructure = useMemo(
        () =>
            getNavigationComponentForItem(navigationChildren, {
                onChange: onChange,
            }),
        [navigationChildren, onChange]
    );

    const change = useCallback(() => {
        onChange && onChange(id, !isOpen, true);
        onClick && onClick();
    }, [onClick, id, isOpen, onChange]);

    const getNavigationContent = useCallback(
        () => (
            <>
                <div className={styles.linkContainer} onClick={change}>
                    {title}
                </div>
                <div
                    className={styles.toggleOpenContainer}
                    onClick={() => onChange && onChange(id, true, false)}
                >
                    {!isCollapsed && <DropdownArrow cursor="pointer" isOpen={isOpen || false} />}
                </div>
            </>
        ),
        [title, isOpen, onChange]
    );

    return (
        <>
            <NavigationItem type="section" isActive={isActive}>
                {getNavigationContent()}
            </NavigationItem>
            {isCollapsed ? navigationStructure : isOpen && navigationStructure}
        </>
    );
};

export default Section;
