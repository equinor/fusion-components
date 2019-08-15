import React, { FC, useState, useCallback, ReactNode, useMemo } from 'react';
import classNames from 'classnames';
import { useComponentDisplayClassNames } from '@equinor/fusion';
import { CollapseExpandButton } from '@equinor/fusion-components';
import styles from './styles.less';
import { NavigationChild, NavigationSection, NavigationGrouping } from './components';
import { getNavigationComponentForItem, toggleOpenById, toggleActiveById } from './utils';
export { NavigationChild, NavigationSection, NavigationGrouping };

const NAVIGATION_DRAWER_COLLAPSED_KEY = 'NAVIGATION_DRAWER_COLLAPSED_KEY';
const createDrawerCollapsedKey = (key: string) => NAVIGATION_DRAWER_COLLAPSED_KEY + key;
const getDefaultCollapsed = (key: string) => {
    const value = localStorage.getItem(createDrawerCollapsedKey(key));
    return Boolean(value);
};

const persistCollapsedState = (key: string, isCollapsed: boolean) => {
    localStorage.setItem(createDrawerCollapsedKey(key), isCollapsed ? 'collapsed' : '');
};

export type NavigationComponentProps = NavigationStructure & {
    onChange?: (id: string, toggleOpen: boolean, toggleActive: boolean) => void;
    isCollapsed?: boolean;
};

export type NavigationStructure = {
    id: string;
    type: 'child' | 'grouping' | 'label' | 'search' | 'section';
    icon?: ReactNode;
    title: string;
    onClick?: () => void;
    isActive?: boolean;
    isOpen?: boolean;
    navigationChildren?: NavigationStructure[];
};

type NavigationDrawerProps = {
    id: string;
    structure: NavigationStructure[];
    onChange: (newStructure: NavigationStructure[]) => void;
};

const NavigationDrawer: FC<NavigationDrawerProps> = ({ id, structure, onChange }) => {
    const [isCollapsed, setIsCollapsed] = useState(getDefaultCollapsed(id));

    const toggleCollapsed = useCallback(() => {
        persistCollapsedState(id, !isCollapsed);
        setIsCollapsed(!isCollapsed);
    }, [isCollapsed]);

    const containerClassNames = classNames(
        styles.container,
        useComponentDisplayClassNames(styles),
        {
            [styles.isCollapsed]: isCollapsed,
        }
    );
    const navigationStructure = useMemo(
        () =>
            getNavigationComponentForItem(structure, {
                onChange: (id: string, toggleOpen: boolean, toggleActive: boolean) => {
                    const newStructure = structure.map(item => {
                        if (toggleOpen && toggleActive) {
                            return toggleActiveById(id, toggleOpenById(id, item));
                        }
                        if (toggleOpen) {
                            return toggleOpenById(id, item);
                        }
                        if (toggleActive) {
                            return toggleActiveById(id, item);
                        }
                        return item;
                    });
                    newStructure && onChange(newStructure);
                },
                isCollapsed: isCollapsed,
            }),
        [structure, onChange, isCollapsed]
    );
    return (
        <div className={containerClassNames}>
            <div className={styles.collapseButtonContainer}>
                <CollapseExpandButton isCollapsed={isCollapsed} onClick={toggleCollapsed} />
            </div>
            {navigationStructure}
        </div>
    );
};

export default NavigationDrawer;
