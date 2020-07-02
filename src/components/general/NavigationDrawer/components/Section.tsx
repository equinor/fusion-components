import React, { FC, useCallback, useMemo, useEffect, useState } from 'react';
import styles from './styles.less';
import { NavigationComponentProps } from '..';
import { getNavigationComponentForItem } from '../utils';

import NavigationItem from './NavigationItem';
import useTooltipRef from 'hooks/useTooltipRef';
import DropdownArrow from 'components/icons/components/action/DropdownArrow';

const Section: FC<NavigationComponentProps> = ({ navigationItem, onChange, isCollapsed }) => {
    const { id, isActive, title, onClick, navigationChildren, isOpen, aside } = navigationItem;
    const [shouldHaveTooltip, setShouldHaveTooltip] = useState(false);
    const tooltipRef = useTooltipRef(shouldHaveTooltip ? title : '', 'right');
    const textRef = React.useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (textRef.current) {
            const isOverflowing = textRef.current.offsetWidth < textRef.current.scrollWidth;
            setShouldHaveTooltip(isOverflowing);
        }
    }, [textRef.current]);

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

    return (
        <>
            <NavigationItem type="section" isActive={isActive}>
                <div className={styles.sectionContainer} ref={tooltipRef}>
                    <div className={styles.linkContainer} onClick={change}>
                        <span className={styles.linkText} ref={textRef}>
                            {title}
                        </span>
                        {aside && <div className={styles.asideContainer}>{aside}</div>}
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
            </NavigationItem>
            {isCollapsed ? navigationStructure : isOpen && navigationStructure}
        </>
    );
};

export default Section;
