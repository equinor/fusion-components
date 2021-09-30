import { FC } from 'react';
import MicroSplit from '..';
import { PositionMark, RotationColumns, TimelineSize } from '../../../model';

type MicroSplitsProps = {
    selectedSplit: string;
    rotationColumns: RotationColumns;
    computePosition?: (time: number, mark: PositionMark) => number;
    size: TimelineSize;
};

export const MicroSplits: FC<MicroSplitsProps> = ({
    selectedSplit,
    rotationColumns,
    computePosition,
    size,
}) => {
    return (
        <>
            {Object.values(rotationColumns).map((col) => (
                <MicroSplit
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
