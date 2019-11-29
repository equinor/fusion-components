import React, { useMemo, useCallback, useRef, useEffect, useState } from 'react';
import Marker, { SliderMarker } from './Marker';
import styles from './styles.less';
import classNames from 'classnames';
import { useComponentDisplayClassNames } from '@equinor/fusion';
import { useEventListener } from '@equinor/fusion-components';
import { createPositionCalculator, createValueCalculator, createMarkerFinder } from './utils';
export { SliderMarker };

type SliderProps = {
    value: number; // | [number, number];
    markers: SliderMarker[];
    disabled?: boolean;
    onChange: (marker: SliderMarker) => void;
};

const Slider: React.FC<SliderProps> = ({ value, markers, disabled, onChange }) => {
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

    const onTrackClick = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            if (!disabled) {
                const marker = markerFinder(e.pageX);
                onChange(marker);
            }
        },
        [trackLeft, trackWidth, calculateValue, onChange, disabled]
    );

    const [mouseIsDown, setMouseIsDown] = useState(false);
    const onHandleMouseDown = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        setMouseIsDown(true);
    }, []);

    const handleMouseMove = useCallback(
        (e: Event) => {
            const mouseEvent = e as MouseEvent;
            if (mouseIsDown && !disabled) {
                const marker = markerFinder(mouseEvent.pageX);
                onChange(marker);
            }
        },
        [markerFinder, onChange, disabled, mouseIsDown]
    );

    const handleMouseUp = useCallback(() => {
        if (!disabled) {
            setMouseIsDown(false);
        }
    }, [disabled]);

    useEventListener(window, 'mousemove', handleMouseMove, [mouseIsDown]);
    useEventListener(window, 'mouseup', handleMouseUp, []);

    const containerClassNames = classNames(
        styles.container,
        useComponentDisplayClassNames(styles),
        {
            [styles.mouseIsDown]: mouseIsDown,
            [styles.isDisabled]: disabled,
            [styles.isLowered]: markers.some(marker => !!marker.lowered),
        }
    );

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
                onMouseDown={onHandleMouseDown}
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
                    disabled={disabled}
                    isActive={value >= marker.value}
                    position={calculatePosition(marker.value)}
                    onClick={onChange}
                />
            ))}
        </div>
    );
};

export default Slider;
