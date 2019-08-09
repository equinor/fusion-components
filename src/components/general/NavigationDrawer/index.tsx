import React, { FC, useState, useCallback } from 'react';
import classNames from 'classnames';
import { useComponentDisplayClassNames } from '@equinor/fusion';
import { CollapseExpandButton } from '@equinor/fusion-components';
import styles from './styles.less';
import {MenuChild} from "./components"

const NAVIGATION_DRAWER_COLLAPSED_KEY = 'NAVIGATION_DRAWER_COLLAPSED_KEY';
const createDrawerCollapsedKey = (key: string) => NAVIGATION_DRAWER_COLLAPSED_KEY + key;
const getDefaultCollapsed = (key: string) => {
    const value = localStorage.getItem(createDrawerCollapsedKey(key));
    return Boolean(value);
};

const persistCollapsedState = (key: string, isCollapsed: boolean) => {
    localStorage.setItem(createDrawerCollapsedKey(key), isCollapsed ? 'collapsed' : '');
};

type NavigationDrawerProps = {
    id: string;
};

const NavigationDrawer: FC<NavigationDrawerProps> = ({ id }) => {
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

    return (
        <div className={containerClassNames}>
            <div className={styles.collapseButtonContainer}>
                <CollapseExpandButton isCollapsed={isCollapsed} onClick={toggleCollapsed} />
            </div>
            <MenuChild title="Child" key="1child" onClick={() => console.log("CLICK")} active/>
            <MenuChild title="Child2" key="13child" onClick={() => console.log("CLICK")} active={false}/>
            <MenuChild title="Child3" key="14child" onClick={() => console.log("CLICK")} active={false}/>
        </div>
    );
};

export default NavigationDrawer;
