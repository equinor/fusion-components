import React, { FC, useCallback, useEffect, useState } from 'react';
import styles from './styles.less';
import { NavigationComponentProps } from '..';
import NavigationItem from './NavigationItem';
import useTooltipRef from 'hooks/useTooltipRef';

const Child: FC<NavigationComponentProps> = ({ navigationItem, onChange }) => {
    const { id, isActive, title, onClick, aside } = navigationItem;
    const textRef = React.useRef<HTMLElement | null>(null);
    const [shouldHaveTooltip, setShouldHaveTooltip] = useState(false);
    const tooltipRef = useTooltipRef(title, 'right');

    useEffect(() => {
        if (textRef.current) {
            const isOverflowing = textRef.current.offsetWidth < textRef.current.scrollWidth;
            setShouldHaveTooltip(isOverflowing);
        }
    }, [textRef]);

    const change = useCallback(() => {
        onChange && onChange(id, false, true);
        onClick && onClick();
    }, [onClick, id, isActive, onChange]);

    return (
        <NavigationItem type="child" isActive={isActive} onClick={change}>
            <div className={styles.linkContainer} ref={shouldHaveTooltip ? tooltipRef : null}>
                <span className={styles.linkText} ref={textRef}>
                    {title}
                </span>
                {aside && <div className={styles.asideContainer}>{aside}</div>}
            </div>
        </NavigationItem>
    );
};

export default Child;
