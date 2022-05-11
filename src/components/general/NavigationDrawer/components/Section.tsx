import { useRef, FC, useCallback, useMemo, useEffect, useState } from 'react';
import { useStyles } from './Components.style';
import { DropdownArrow } from '@equinor/fusion-components';
import { NavigationComponentProps } from '..';
import { getNavigationComponentForItem } from '../utils';
import { useTooltipRef } from '@equinor/fusion-components';

import NavigationItem from './NavigationItem';

const Section: FC<NavigationComponentProps> = ({ navigationItem, onChange, isCollapsed }) => {
    const {
        id,
        isActive,
        title,
        onClick,
        navigationChildren,
        isOpen,
        aside,
        isDisabled,
        href,
        info,
    } = navigationItem;
    const styles = useStyles();
    const [shouldHaveTooltip, setShouldHaveTooltip] = useState(false);
    const tooltipRef = useTooltipRef(shouldHaveTooltip ? title : '', 'right');
    const textRef = useRef<HTMLElement | null>(null);

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
        onChange && onChange(id, !isOpen, !isDisabled);
        !isDisabled && onClick && onClick();
    }, [onClick, id, isOpen, onChange, isDisabled]);

    return (
        <>
            <NavigationItem id={id} type="section" isActive={isActive} isDisabled={isDisabled} info={info}>
                <div className={styles.sectionContainer} ref={tooltipRef}>
                    <a
                        className={styles.linkContainer}
                        onClick={change}
                        href={!isDisabled && !isCollapsed ? href : undefined}
                    >
                        <span className={styles.linkText} ref={textRef}>
                            {title}
                        </span>
                        {aside && <div className={styles.asideContainer}>{aside}</div>}
                    </a>
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
