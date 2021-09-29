import { FC, useCallback, useMemo } from 'react';
import { PositionMark, RotationColumn, RotationColumns } from '../../model';

type MicroMarkersProps = {
    rotationColumns: RotationColumns;
    computePosition?: (time: number, mark: PositionMark) => number;
};

export const MicroMarkers: FC<MicroMarkersProps> = ({ rotationColumns, computePosition }) => {
    const sortedColumns = useMemo(() => {
        return Object.values(rotationColumns).sort(
            (a, b) => a.split.appliesFrom.getTime() - b.split.appliesFrom.getTime()
        );
    }, [rotationColumns]);

    const microMarkers = useMemo(() => {
        return sortedColumns.reduce((markers: JSX.Element[], col: RotationColumn, index) => {
            if (index === sortedColumns.length - 1) {

            }
            

        }, []);
    }, [sortedColumns]);

    const MicroMarkers = 
    return <>{sortedColumns.map((col, index) => )}</>;
};
