import React from 'react';
import classNames from 'classnames';
import * as styles from '../styles.less';
import Arrow from './Arrow';
import useInViewChecker from '../../useInViewChecker';
import { TooltipPlacement } from '..';

export type TooltipContainerProps = {
    placement?: TooltipPlacement;
    content: String | React.ReactNode;
};

const getNextAlternativePlacement = (
    possiblePlacements: TooltipPlacement[],
    testedPlacements: TooltipPlacement[]
): TooltipPlacement | null => {
    const next = possiblePlacements.filter((p) => testedPlacements.indexOf(p) === -1);

    if (next.length > 0) {
        return next[0];
    }

    return null;
};
const getAlternatives = (preferredPlacement: TooltipPlacement): TooltipPlacement[] => {
    switch (preferredPlacement) {
        case 'above':
            return ['below', 'left', 'right'];

        case 'below':
            return ['above', 'left', 'right'];

        case 'left':
            return ['right', 'below', 'above'];

        case 'right':
            return ['left', 'below', 'above'];
    }
};

const getAlternativePlacement = (
    preferredPlacement: TooltipPlacement,
    testedPlacements: TooltipPlacement[]
): TooltipPlacement => {
    const alternatives = getAlternatives(preferredPlacement);
    return getNextAlternativePlacement(alternatives, testedPlacements) || preferredPlacement;
};

const PopoverContainer = React.forwardRef<
    HTMLDivElement | null,
    React.PropsWithChildren<TooltipContainerProps>
>(({ placement: preferredPlacement, content }, ref) => {
    const [isInView, setIsInView] = useInViewChecker(
        ref as React.MutableRefObject<HTMLDivElement>,
        4
    );
    const [placement, setPlacement] = React.useState<TooltipPlacement>(preferredPlacement);
    const [testedPlacements, setTestedPlacements] = React.useState<TooltipPlacement[]>([]);

    React.useEffect(() => {
        if (preferredPlacement) {
            setPlacement(preferredPlacement);
        }
    }, [preferredPlacement]);

    React.useEffect(() => {
        if (isInView || testedPlacements.length >= 4) {
            return;
        }

        const nextPlacement = getAlternativePlacement(preferredPlacement, testedPlacements);

        setTestedPlacements([...testedPlacements, nextPlacement]);
        setPlacement(nextPlacement);
        setIsInView(true);
    }, [isInView]);
    const tooltipClassName = classNames(styles.tooltip, styles[placement.toLocaleLowerCase()]);

    return (
        <div className={tooltipClassName} ref={ref as React.RefObject<HTMLDivElement>}>
            <Arrow />
            <span className={styles.content}>{content}</span>
        </div>
    );
});

export default PopoverContainer;
