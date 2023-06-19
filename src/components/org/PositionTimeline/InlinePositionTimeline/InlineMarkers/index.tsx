import { FC, useMemo } from 'react';
import InlineMarker from '../InlineMarker';
import { PositionMark, RotationColumns, TimelineSize } from '../../model';
import { sortRotationColumns } from '../utils';
import { InlineMarkerData } from '../InlineMarker/types';
import { generateMarkerData } from '../InlineMarker/utils';

type InlineMarkersProps = {
    selectedSplit: string;
    rotationColumns: RotationColumns;
    computePosition?: (time: number, mark: PositionMark) => number;
    selectedDate?: Date;
    size: TimelineSize;
};

export const InlineMarkers: FC<InlineMarkersProps> = ({
    selectedSplit,
    rotationColumns,
    computePosition,
    selectedDate,
    size,
}) => {
    const sortedColumns = useMemo(() => {
        return Object.values(rotationColumns).sort(sortRotationColumns);
    }, [rotationColumns]);

    const markerData: InlineMarkerData[] = useMemo(() => {
        return generateMarkerData(sortedColumns);
    }, [sortedColumns]);

    return (
        <>
            {markerData.map((data) => (
                <InlineMarker
                    key={`inline-marker-${data.date.getTime()}`}
                    selected={selectedSplit}
                    date={data.date}
                    linked={data.linked}
                    computePosition={computePosition}
                    size={size}
                />
            ))}
            {selectedDate && (
                <InlineMarker
                    key={`inline-marker-${selectedDate.getTime()}`}
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

export default InlineMarkers;
