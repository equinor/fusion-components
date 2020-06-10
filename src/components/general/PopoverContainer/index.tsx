import React from 'react';
import classNames from 'classnames';
import styles from './styles.less';
import Arrow from './Arrow';
import { useElevationClassName } from '@equinor/fusion-components';
import useInViewChecker from '../../../hooks/useInViewChecker';

export type PopoverPlacement = 'below' | 'above' | 'left' | 'right';
export type PopoverJustification = 'start' | 'center' | 'end';

export type PopoverContainerProps = {
    placement?: PopoverPlacement;
    justify?: PopoverJustification;
    centered?: boolean;
    title?: string;
    fillWithContent?: boolean;
};

const getNextAlternativePlacement = (
    possiblePlacements: PopoverPlacement[],
    testedPlacements: PopoverPlacement[]
): PopoverPlacement | null => {
    const next = possiblePlacements.filter((p) => testedPlacements.indexOf(p) === -1);

    if (next.length > 0) {
        return next[0];
    }

    return null;
};

const getAlternatives = (preferredPlacement: PopoverPlacement): PopoverPlacement[] => {
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
    preferredPlacement: PopoverPlacement,
    testedPlacements: PopoverPlacement[]
): PopoverPlacement => {
    const alternatives = getAlternatives(preferredPlacement);
    return getNextAlternativePlacement(alternatives, testedPlacements) || preferredPlacement;
};

const PopoverContainer = React.forwardRef<
    HTMLDivElement | null,
    React.PropsWithChildren<PopoverContainerProps>
>(({ placement: preferredPlacement, justify, title, fillWithContent, centered, children }, ref) => {
    const [placement, setPlacement] = React.useState<PopoverPlacement>(
        preferredPlacement || 'below'
    );
    React.useEffect(() => {
        if (preferredPlacement) {
            setPlacement(preferredPlacement);
        }
    }, [preferredPlacement]);

    const containerClassNames = classNames(
        styles.popoverContainer,
        useElevationClassName(1),
        placement ? styles[placement] : null,
        justify ? styles[justify] : null,
        {
            [styles.fillWithContent]: fillWithContent,
            [styles.isCentered]: centered,
        }
    );

    const [isInView, setIsInView] = useInViewChecker(
        ref as React.MutableRefObject<HTMLDivElement>,
        4
    );
    const [testedPlacements, setTestedPlacements] = React.useState<PopoverPlacement[]>([]);
    React.useEffect(() => {
        if (isInView || testedPlacements.length >= 4) {
            return;
        }

        const nextPlacement = getAlternativePlacement(
            preferredPlacement || 'below',
            testedPlacements
        );

        setTestedPlacements([...testedPlacements, nextPlacement]);
        setPlacement(nextPlacement);
        setIsInView(true);
    }, [isInView]);

    return (
        <div className={containerClassNames} ref={ref as React.Ref<HTMLDivElement>}>
            <Arrow />
            {title && <h5>{title}</h5>}
            <div className={styles.content}>{children}</div>
        </div>
    );
});

export default PopoverContainer;
