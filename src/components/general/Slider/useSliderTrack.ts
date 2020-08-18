import { useRef, useState, useMemo, useEffect } from 'react';
import { SliderMarker } from '.';
import { createPositionCalculator, createValueCalculator, createMarkerFinder } from './utils';

export default (markers: SliderMarker[]) => {
    const trackRef = useRef<HTMLDivElement | null>(null);
    const [trackLeft, setTrackLeft] = useState(0);
    const [trackWidth, setTrackWidth] = useState(0);

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
    const markerFinder = useMemo(
        () => createMarkerFinder(trackLeft, trackWidth, markers, calculateValue),
        [trackLeft, trackWidth, markers, calculateValue]
    );

    let animationFrame = 0;
    const updateTrackLeftAndWidth = () => {
        if (!trackRef.current) {
            return;
        }

        const trackRect = trackRef.current.getBoundingClientRect();
        if (trackRect.left !== trackLeft) {
            setTrackLeft(trackRect.left);
        }

        if (trackRect.width !== trackWidth) {
            setTrackWidth(trackRect.width);
        }

        animationFrame = window.requestAnimationFrame(updateTrackLeftAndWidth);

        return () => window.cancelAnimationFrame(animationFrame);
    };

    useEffect(updateTrackLeftAndWidth, [trackRef.current]);

    return {
        calculatePosition,
        markerFinder,
        trackRef,
        sortedMarkers,
    };
};
