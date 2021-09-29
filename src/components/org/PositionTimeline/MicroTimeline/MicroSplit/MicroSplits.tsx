import { FC } from 'react';
import MicroSplit from '.';
import { PositionMark, RotationColumns } from '../../model';

type MicroSplitsProps = {
    rotationColumns: RotationColumns;
    computePosition?: (time: number, mark: PositionMark) => number;
};

export const MicroSplits: FC<MicroSplitsProps> = ({ rotationColumns, computePosition }) => {
    return (
        <>
            {Object.values(rotationColumns).map((col) => (
                <MicroSplit
                    key={col.split.id}
                    split={col.split}
                    computePosition={computePosition}
                />
            ))}
        </>
    );
};
