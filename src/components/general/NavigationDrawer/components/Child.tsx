import { useRef, FC, useCallback, useEffect, useState } from 'react';
import { useStyles } from './Components.style';
import { NavigationComponentProps } from '..';
import NavigationItem from './NavigationItem';
import { useTooltipRef } from '@equinor/fusion-components';

const Child: FC<NavigationComponentProps> = ({ navigationItem, onChange }) => {
    const styles = useStyles();
    const { id, isActive, title, onClick, aside, isDisabled, href, info, style } = navigationItem;
    const textRef = useRef<HTMLElement | null>(null);
    const [shouldHaveTooltip, setShouldHaveTooltip] = useState(false);
    const tooltipRef = useTooltipRef(title, 'right');

    useEffect(() => {
        if (textRef.current) {
            const isOverflowing = textRef.current.offsetWidth < textRef.current.scrollWidth;
            setShouldHaveTooltip(isOverflowing);
        }
    }, [textRef]);

    const change = useCallback(() => {
        onChange && onChange(id, false, !isDisabled);
        !isDisabled && onClick && onClick();
    }, [onClick, id, isActive, onChange, isDisabled]);

    return (
        <NavigationItem
            id={id}
            type="child"
            isActive={isActive}
            onClick={change}
            isDisabled={isDisabled}
            info={info}
            style={style}
        >
            <a
                className={styles.linkContainer}
                ref={shouldHaveTooltip ? tooltipRef : null}
                href={!isDisabled ? href : undefined}
            >
                <span className={styles.linkText} ref={textRef}>
                    {title}
                </span>
                {aside && <div className={styles.asideContainer}>{aside}</div>}
            </a>
        </NavigationItem>
    );
};

export default Child;
