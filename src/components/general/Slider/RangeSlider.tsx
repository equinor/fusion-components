import React, { useCallback, useState } from 'react';
import Marker, { SliderMarker } from './Marker';
import styles from './styles.less';
import classNames from 'classnames';
import { useComponentDisplayClassNames } from '@equinor/fusion';
import { useEventListener } from '@equinor/fusion-components';
import useSliderTrack from './useSliderTrack';
import { useAnchor } from '../ApplicationGuidance';
export { SliderMarker };

type SliderProps = {
    quickFactId?: string;
    values: [number, number];
    markers: SliderMarker[];
    disabled?: boolean;
    hideHandle?: boolean;
    onChange: (marker: [number, number]) => void;
    quickFactScope?: string;
};

type Handle = 'firstHandle' | 'lastHandle';

const Slider: React.FC<SliderProps> = ({
    quickFactId,
    values,
    markers,
    disabled,
    hideHandle,
    onChange,
    quickFactScope,
}) => {
    const { calculatePosition, markerFinder, trackRef, sortedMarkers } = useSliderTrack(markers);

    const firstValue = React.useMemo(() => values[0], [values]);
    const lastValue = React.useMemo(() => values[values.length - 1], [values]);

    const getClosestHandleChange = React.useCallback(
        (value: number): [number, number] => {
            const firstDifference = Math.abs(firstValue - value);
            const lastDifference = Math.abs(lastValue - value);

            if (firstDifference > lastDifference) {
                return [firstValue, value];
            } else {
                return [value, lastValue];
            }
        },
        [firstValue, lastValue]
    );

    const onTrackClick = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            if (!disabled) {
                const marker = markerFinder(e.pageX);
                onChange(getClosestHandleChange(marker.value));
            }
        },
        [onChange, disabled, getClosestHandleChange]
    );

    const [activeHandle, setActiveHandle] = useState<Handle | null>(null);
    const onHandleMouseDown = useCallback((handle: Handle) => {
        setActiveHandle(handle);
    }, []);

    const handleMouseMove = useCallback(
        (e: Event) => {
            const mouseEvent = e as MouseEvent;
            if (activeHandle && !disabled) {
                const marker = markerFinder(mouseEvent.pageX);
                const value: [number, number] =
                    activeHandle === 'firstHandle'
                        ? [marker.value, lastValue]
                        : [firstValue, marker.value];
                onChange(value);
            }
        },
        [markerFinder, onChange, disabled, activeHandle, firstValue, lastValue]
    );

    const handleMouseUp = useCallback(() => {
        if (!disabled) {
            setActiveHandle(null);
        }
    }, [disabled]);

    const createValueHandle = React.useCallback(
        (value: number, handle: Handle) => {
            if (hideHandle) {
                return null;
            }
            return (
                <button
                    className={classNames(styles.handle, {
                        [styles.noTransition]: activeHandle !== null,
                    })}
                    onMouseDown={() => onHandleMouseDown(handle)}
                    style={{
                        left: calculatePosition(value),
                    }}
                >
                    <div className={styles.dot} />
                </button>
            );
        },
        [hideHandle, onHandleMouseDown, calculatePosition, activeHandle]
    );

    useEventListener(window, 'mousemove', handleMouseMove, [activeHandle]);
    useEventListener(window, 'mouseup', handleMouseUp, []);

    const containerClassNames = classNames(
        styles.container,
        useComponentDisplayClassNames(styles),
        {
            [styles.activeHandle]: activeHandle !== null,
            [styles.isDisabled]: disabled,
            [styles.isLowered]: markers.some((marker) => !!marker.lowered),
        }
    );

    const rightPosition = React.useMemo(
        () => parseInt(calculatePosition(lastValue > firstValue ? lastValue : firstValue), 10),
        [calculatePosition, lastValue, firstValue]
    );

    const anchorRef = useAnchor<HTMLDivElement>({ id: quickFactId, scope: quickFactScope });

    return (
        <div className={containerClassNames} onClick={onTrackClick} ref={anchorRef}>
            <div className={styles.track} ref={trackRef} />
            <div
                className={classNames(styles.slider, styles.active)}
                style={{
                    left: calculatePosition(lastValue > firstValue ? firstValue : lastValue),
                    right: `${100 - rightPosition}%`,
                }}
            />
            {createValueHandle(firstValue, 'firstHandle')}
            {createValueHandle(lastValue, 'lastHandle')}

            {sortedMarkers.map((marker) => (
                <Marker
                    key={marker.value}
                    marker={marker}
                    disabled={disabled}
                    isActive={firstValue <= marker.value && lastValue >= marker.value}
                    position={calculatePosition(marker.value)}
                    onClick={() => onChange(getClosestHandleChange(marker.value))}
                />
            ))}
        </div>
    );
};

export default Slider;
