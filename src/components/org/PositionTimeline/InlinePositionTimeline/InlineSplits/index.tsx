import { FC } from 'react';
import InlineSplit from '../InlineSplit';
import { PositionMark, RotationColumns, TimelineSize } from '../../model';

type InlineSplitsProps = {
    selectedSplit: string;
    rotationColumns: RotationColumns;
    computePosition?: (time: number, mark: PositionMark) => number;
    size: TimelineSize;
};

export const InlineSplits: FC<InlineSplitsProps> = ({
    selectedSplit,
    rotationColumns,
    computePosition,
    size,
}) => {
    return (
        <>
            {Object.values(rotationColumns).map((col) => (
                <InlineSplit
                    key={col.split.id}
                    selected={selectedSplit}
                    split={col.split}
                    linked={col.linked}
                    computePosition={computePosition}
                    size={size}
                />
            ))}
        </>
    );
};
