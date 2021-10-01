import { useTooltipRef } from '@equinor/fusion-components';
import { FC } from 'react';
import { PositionMark, TimelineSize, TimelineSplit } from '../../model';
import { useStyles } from './styles';
import { TooltipContent } from './components/TooltipContent';
import { SplitLine } from './components/SplitLine';

type InlineSplitProps = {
    selected: string;
    split: TimelineSplit;
    linked: TimelineSplit[];
    computePosition?: (time: number, mark: PositionMark) => number;
    size: TimelineSize;
};

export const InlineSplit: FC<InlineSplitProps> = ({ split, linked, computePosition, selected, size }) => {
    const isSelected = linked.map((split) => split.id).includes(selected);
    const isRotation = !!split.rotationId;
    const isAssigned = !!split.assignedPerson;
    const styles = useStyles();
    if (!computePosition) return null;

    const startPosition = computePosition(split.appliesFrom.getTime(), 'start');
    const endPosition = computePosition(split.appliesTo.getTime(), 'end');

    const splitTooltipRef = useTooltipRef(linked.map((split) => <TooltipContent split={split} />));

    return (
        <div className={styles.split}>
            <SplitLine
                isRotation={isRotation}
                isAssigned={isAssigned}
                isSelected={isSelected}
                startPosition={startPosition}
                endPosition={endPosition}
                verticalPosition="top"
                size={size}
            />
            <div
                className={styles.tooltipContainer}
                style={{
                    left: `${startPosition}%`,
                    right: `${endPosition}%`,
                }}
                ref={splitTooltipRef}
            ></div>
            {isRotation && (
                <SplitLine
                    isRotation={isRotation}
                    isAssigned={isAssigned}
                    isSelected={isSelected}
                    startPosition={startPosition}
                    endPosition={endPosition}
                    verticalPosition="bottom"
                    size={size}
                />
            )}
        </div>
    );
};

export default InlineSplit;
