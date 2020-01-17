import React, { FC, useCallback, useMemo, useEffect, useState } from 'react';
import styles from './styles.less';
import { DropdownArrow } from '@equinor/fusion-components';
import { NavigationComponentProps } from '..';
import { getNavigationComponentForItem } from '../utils';
import { useTooltipRef } from '@equinor/fusion-components';

import NavigationItem from './NavigationItem';
import { NavigationChild } from '.';

const Section: FC<NavigationComponentProps> = ({ navigationItem, onChange, isCollapsed }) => {
    const { id, isActive, title, onClick, navigationChildren, isOpen } = navigationItem;
    const tooltipRef = useTooltipRef(title, 'right');
    const [shouldHaveTooltip, setShouldHaveTooltip] = useState(false);
    const textRef = React.useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (textRef.current) {
            const isOverflowing = textRef.current.offsetWidth < textRef.current.scrollWidth;
            setShouldHaveTooltip(isOverflowing);
        }
    }, [textRef])

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
            <div className={styles.sectionContainer} ref={shouldHaveTooltip ? tooltipRef : null}>
                <div className={styles.linkContainer} onClick={change}>
                    <span className={styles.linkText} ref={textRef}>{title}</span>
                </div>
                <div
                    className={styles.toggleOpenContainer}
                    onClick={() => onChange && onChange(id, true, false)}
                >
                    {!isCollapsed && navigationChildren && navigationChildren.length > 0 && (
                        <DropdownArrow cursor="pointer" isOpen={isOpen || false} />
                    )}
                </div>
            </div>
        ),
        [title, isOpen, onChange, navigationChildren]
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
