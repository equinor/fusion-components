import { FC, useMemo } from 'react';
import MicroMarker from '.';
import { PositionMark, RotationColumns, TimelineSize } from '../../model';
import { sortRotationColumns } from '../utils';
import { MicroMarkerData } from './types';
import { generateMarkerData } from './utils';

type MicroMarkersProps = {
    selectedSplit: string;
    rotationColumns: RotationColumns;
    computePosition?: (time: number, mark: PositionMark) => number;
    selectedDate?: Date;
    size: TimelineSize;
};

export const MicroMarkers: FC<MicroMarkersProps> = ({
    selectedSplit,
    rotationColumns,
    computePosition,
    selectedDate,
    size
}) => {
    const sortedColumns = useMemo(() => {
        return Object.values(rotationColumns).sort(sortRotationColumns);
    }, [rotationColumns]);

    const markerData: MicroMarkerData[] = useMemo(() => {
        return generateMarkerData(sortedColumns);
    }, [sortedColumns]);

    return (
        <>
            {markerData.map((data) => (
                <MicroMarker
                    key={`micro-marker-${data.date.getTime()}`}
                    selected={selectedSplit}
                    date={data.date}
                    linked={data.linked}
                    computePosition={computePosition}
                    size={size}
                />
            ))}
            {selectedDate && (
                <MicroMarker
                    key={`micro-marker-${selectedDate.getTime()}`}
                    selected={selectedSplit}
                    date={selectedDate}
                    computePosition={computePosition}
                    isSelectedDate
                    size={size}
                />
            )}
        </>
    );
};
