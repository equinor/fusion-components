import React, { FC, useState, useCallback, ReactNode, useMemo, useEffect } from 'react';
import classNames from 'classnames';
import { useComponentDisplayClassNames } from '@equinor/fusion';
import styles from './styles.less';
import {
    NavigationChild,
    NavigationSection,
    NavigationGrouping,
    CollapseExpandButton,
} from './components';
import {
    getNavigationComponentForItem,
    toggleOpenById,
    toggleActiveById,
    toggleOpenByChildId,
} from './utils';
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

export type NavigationComponentProps = {
    onChange?: (id: string, toggleOpen: boolean, toggleActive: boolean) => void;
    isCollapsed?: boolean;
    navigationItem: NavigationStructure;
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
    onChangeStructure: (newStructure: NavigationStructure[]) => void;
    selectedId?: string;
    onChangeSelectedId?: (newSelected: string) => void;
};

const NavigationDrawer: FC<NavigationDrawerProps> = ({
    id,
    structure,
    onChangeStructure,
    onChangeSelectedId,
    selectedId,
}) => {
    const [isCollapsed, setIsCollapsed] = useState(getDefaultCollapsed(id));
    const [internalStructure, setInternalStructure] = useState<NavigationStructure[]>();

    useEffect(() => setInternalStructure(structure), [structure]);

    useEffect(() => {
        if (selectedId) {
            const newStructure = structure.map(item => toggleActiveById(selectedId, item));
            onChangeStructure(newStructure.map(item => toggleOpenByChildId(selectedId, item)));
        }
    }, [selectedId]);

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
            getNavigationComponentForItem(internalStructure, {
                onChange: (id: string, toggleOpen: boolean, toggleActive: boolean) => {
                    if (toggleActive) {
                        onChangeSelectedId && onChangeSelectedId(id);
                    }
                    if (toggleOpen) {
                        const newStructure =
                            internalStructure &&
                            internalStructure.map(item => toggleOpenById(id, item));
                        newStructure && onChangeStructure(newStructure);
                    }
                },
                isCollapsed: isCollapsed,
            }),
        [internalStructure, onChangeStructure, isCollapsed]
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
