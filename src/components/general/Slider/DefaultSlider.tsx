import { useCallback, useState, FC } from 'react';

import Marker, { SliderMarker } from './Marker';
import styles from './styles.less';
import classNames from 'classnames';
import { useComponentDisplayClassNames } from '@equinor/fusion';
import { useEventListener } from '@equinor/fusion-components';
import useSliderTrack from './useSliderTrack';
export { SliderMarker };

type SliderProps = {
    value: number;
    markers: SliderMarker[];
    disabled?: boolean;
    hideHandle?: boolean;
    onChange: (marker: SliderMarker) => void;
};

const Slider: FC<SliderProps> = ({ value, markers, disabled, hideHandle, onChange }) => {
    const { calculatePosition, markerFinder, trackRef, sortedMarkers } = useSliderTrack(markers);

    const onTrackClick = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            if (!disabled) {
                const marker = markerFinder(e.pageX);
                onChange(marker);
            }
        },
        [onChange, disabled]
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
            [styles.isLowered]: markers.some((marker) => !!marker.lowered),
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
            {!hideHandle && (
                <button
                    className={styles.handle}
                    onMouseDown={onHandleMouseDown}
                    style={{
                        left: calculatePosition(value),
                    }}
                >
                    <div className={styles.dot} />
                </button>
            )}
            {sortedMarkers.map((marker) => (
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
