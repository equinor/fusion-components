import React, { useMemo, useCallback, useRef, useEffect, useState } from 'react';

import styles from './styles.less';
import classNames from 'classnames';
import { useComponentDisplayClassNames } from '@equinor/fusion';

export type SliderMarker = {
    value: number;
    label: string;
};

type SliderProps = {
    value: number; // | [number, number];
    markers: SliderMarker[];
    onChange: (marker: SliderMarker) => void;
};

type SliderMarkerProps = {
    marker: SliderMarker;
    position: string;
    onClick: (marker: SliderMarker) => void;
};

const Marker: React.FC<SliderMarkerProps> = ({ marker, position, onClick }) => {
    const onClickHandler = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        onClick(marker);
    }, [marker, onClick]);

    return (
        <button
            className={styles.marker}
            style={{ left: position }}
            onClick={onClickHandler}
        >
            <div className={styles.dot} />
            <label>{marker.label}</label>
        </button>
    );
};

const createPositionCalculator = (start: number, end: number) => {
    const full = end - start;
    console.log(end, start, full);

    if (full <= 0) {
        throw new Error('No range');
    }

    return (marker: number) => Math.max((marker / full) * 100, 0) + '%';
};

const createValueCalculator = (start: number, end: number) => {
    const onePercent = (end - start) / 100;

    return (percentage: number) => Math.max(percentage * onePercent, 0);
};

const Slider: React.FC<SliderProps> = ({ value, markers, onChange }) => {
    const sortedMarkers = useMemo(() => markers.sort((a, b) => a.value - b.value), [markers]);
    const firstMarker = useMemo(() => sortedMarkers[0], [sortedMarkers]);
    const lastMarker = useMemo(() => sortedMarkers[sortedMarkers.length - 1], [sortedMarkers]);
    const calculatePosition = useMemo(
        () => createPositionCalculator(firstMarker.value, lastMarker.value),
        [firstMarker, lastMarker]
    );
    const calculateValue = useMemo(
        () => createValueCalculator(firstMarker.value, lastMarker.value),
        [firstMarker, lastMarker]
    );

    const trackRef = useRef<HTMLDivElement | null>(null);
    const [trackLeft, setTrackLeft] = useState(0);
    const [trackWidth, setTrackWidth] = useState(0);

    useEffect(() => {
        if (!trackRef.current) {
            return;
        }

        const trackRect = trackRef.current.getBoundingClientRect();
        setTrackLeft(trackRect.left);
        setTrackWidth(trackRect.width);
    }, [trackRef.current]);

    const onTrackClick = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            const position = e.pageX - trackLeft;
            const percentage = (position / trackWidth) * 100;
            const newValue = calculateValue(percentage);
            const marker = markers.find(m => m.value === newValue) || {
                value: newValue,
                label: newValue.toString(),
            };
            onChange(marker);
        },
        [trackLeft, trackWidth, calculateValue, onChange]
    );

    const containerClassNames = classNames(styles.container, useComponentDisplayClassNames(styles));

    return (
        <div className={containerClassNames} onClick={onTrackClick}>
            <div className={styles.track} ref={trackRef} />
            <div
                className={styles.slider}
                style={{
                    width: calculatePosition(value),
                }}
            />
            <button
                className={styles.handle}
                style={{
                    left: calculatePosition(value),
                }}
            >
                <div className={styles.dot} />
            </button>
            {sortedMarkers.map(marker => (
                <Marker
                    key={marker.value}
                    marker={marker}
                    position={calculatePosition(marker.value)}
                    onClick={onChange}
                />
            ))}
        </div>
    );
};

export default Slider;
