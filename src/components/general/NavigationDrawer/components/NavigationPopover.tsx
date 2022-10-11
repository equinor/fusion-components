import { useRef, ReactNode, useState, useCallback } from 'react';
import {
    RelativeOverlayPortal,
    useClickOutsideOverlayPortal,
    NavigationStructure,
    useElevationClassName,
} from '@equinor/fusion-components';
import { useStyles } from './Components.style';
import CollapsedIcon from './CollapsedIcon';
import NavigationItem from './NavigationItem';
import { hasActive } from '../utils';
import classNames from 'classnames';
import { clsx } from '@equinor/fusion-react-styles';
import useDarkmodeStyles from '../darkmodeStyles';

type NavigationPopoverProps = {
    icon?: ReactNode;
    isActive?: boolean;
    navigationStructure?: (JSX.Element | null)[] | null;
    navigationChildren?: NavigationStructure[];
    groupingComponent?: () => JSX.Element;
    darkTheme?: boolean;
};

const NavigationPopover = ({
    icon,
    navigationStructure,
    groupingComponent,
    isActive,
    navigationChildren,
    darkTheme,
}: NavigationPopoverProps) => {
    const styles = useStyles();
    const [isOpen, setIsOpen] = useState(false);
    const iconRef = useRef<HTMLDivElement | null>(null);

    const darkThemeStyle = useDarkmodeStyles();
    const darkClass = clsx(darkTheme && darkThemeStyle.sidebarDarkmode);
    const popoverClassNames = classNames(styles.popover, useElevationClassName(2), darkClass);

    const close = useCallback(() => isOpen && setIsOpen(false), [isOpen]);
    useClickOutsideOverlayPortal(close, iconRef.current);
    const hasActiveChild =
        isActive ||
        (navigationChildren && navigationChildren.some((navChild) => hasActive(navChild)));

    return (
        <>
            <NavigationItem type="grouping" isActive={hasActiveChild} isCollapsed={true}>
                <CollapsedIcon onClick={() => setIsOpen(!isOpen)} ref={iconRef}>
                    {icon}
                </CollapsedIcon>
            </NavigationItem>

            <RelativeOverlayPortal relativeRef={iconRef} show={isOpen}>
                <div className={popoverClassNames} onClick={close}>
                    <NavigationItem type="grouping" isActive={isActive} isCollapsed={false}>
                        {groupingComponent && groupingComponent()}
                    </NavigationItem>
                    {navigationStructure}
                </div>
            </RelativeOverlayPortal>
        </>
    );
};

export default NavigationPopover;
