import { useCallback, useMemo, useState, FC, MouseEvent } from 'react';

import Marker, { SliderMarker } from './Marker';
import { useStyles } from './Slider.style';
import classNames from 'classnames';
import { useComponentDisplayClassNames } from '@equinor/fusion';
import { useEventListener } from '@equinor/fusion-components';
import useSliderTrack from './useSliderTrack';
export { SliderMarker };

type SliderProps = {
    values: [number, number];
    markers: SliderMarker[];
    disabled?: boolean;
    hideHandle?: boolean;
    onChange: (marker: [number, number]) => void;
};

type Handle = 'firstHandle' | 'lastHandle';

const Slider: FC<SliderProps> = ({ values, markers, disabled, hideHandle, onChange }) => {
    const styles = useStyles();
    const { calculatePosition, markerFinder, trackRef, sortedMarkers } = useSliderTrack(markers);

    const firstValue = useMemo(() => values[0], [values]);
    const lastValue = useMemo(() => values[values.length - 1], [values]);

    const getClosestHandleChange = useCallback(
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
        (e: MouseEvent<HTMLDivElement>) => {
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
            const mouseEvent = e as unknown as MouseEvent;
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

    const createValueHandle = useCallback(
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
            [styles.isDisabled]: disabled,
            [styles.isLowered]: markers.some((marker) => !!marker.lowered),
        }
    );

    const rightPosition = useMemo(
        () => parseInt(calculatePosition(lastValue > firstValue ? lastValue : firstValue), 10),
        [calculatePosition, lastValue, firstValue]
    );
    return (
        <div className={containerClassNames} onClick={onTrackClick}>
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
