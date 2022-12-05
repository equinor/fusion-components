import { FC, useState, useCallback, ReactNode, useMemo, useEffect } from 'react';
import classNames from 'classnames';
import {
    useComponentDisplayClassNames,
    useComponentDisplayType,
    ComponentDisplayType,
} from '@equinor/fusion';
import { useStyles } from './NavigationDrawer.style';
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
import { UseAnchorProps } from '../ApplicationGuidance';
import { clsx } from '@equinor/fusion-react-styles';
import useDarkmodeStyles from './darkmodeStyles';
export { NavigationChild, NavigationSection, NavigationGrouping };

const NAVIGATION_DRAWER_COLLAPSED_KEY = 'NAVIGATION_DRAWER_COLLAPSED_KEY';
const createDrawerCollapsedKey = (key: string) => NAVIGATION_DRAWER_COLLAPSED_KEY + key;
const getDefaultCollapsed = (key: string) => {
    if (useComponentDisplayType() === ComponentDisplayType.Compact) {
        return true;
    }
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
    darkTheme?: boolean;
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
    aside?: ReactNode;
    isDisabled?: boolean;
    href?: string;
    info?: UseAnchorProps;
    style?: React.CSSProperties;
};

type NavigationDrawerProps = {
    id: string;
    structure: NavigationStructure[];
    onChangeStructure: (newStructure: NavigationStructure[]) => void;
    selectedId?: string;
    onChangeSelectedId?: (newSelected: string) => void;
    darkTheme?: boolean;
};

const NavigationDrawer: FC<NavigationDrawerProps> = ({
    id,
    structure,
    onChangeStructure,
    onChangeSelectedId,
    selectedId,
    darkTheme,
}) => {
    const styles = useStyles();
    const [isCollapsed, setIsCollapsed] = useState(getDefaultCollapsed(id));
    const [internalStructure, setInternalStructure] = useState<NavigationStructure[]>();
    const displayType = useComponentDisplayType();

    useEffect(() => {
        if (displayType === ComponentDisplayType.Compact) {
            setIsCollapsed(true);
        }
    }, [displayType]);

    useEffect(() => setInternalStructure(structure), [structure]);

    useEffect(() => {
        if (selectedId) {
            const newStructure = structure.map((item) => toggleActiveById(selectedId, item));
            onChangeStructure(newStructure.map((item) => toggleOpenByChildId(selectedId, item)));
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
                            internalStructure.map((item) => toggleOpenById(id, item));
                        newStructure && onChangeStructure(newStructure);
                    }
                },
                isCollapsed: isCollapsed,
                darkTheme: darkTheme,
            }),
        [internalStructure, onChangeStructure, isCollapsed, darkTheme]
    );

    const stylesDark = useDarkmodeStyles();
    const darkClass = clsx(darkTheme && stylesDark.sidebarDarkmode);

    return (
        <div className={darkClass}>
            <div className={containerClassNames}>
                <div className={styles.collapseButtonContainer}>
                    <CollapseExpandButton isCollapsed={isCollapsed} onClick={toggleCollapsed} />
                </div>
                {navigationStructure}
            </div>
        </div>
    );
};

export default NavigationDrawer;
