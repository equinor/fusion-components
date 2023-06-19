import { formatDate } from '@equinor/fusion';
import { Slider, SliderMarker } from '@equinor/fusion-components';
import { clsx, theme } from '@equinor/fusion-react-styles';
import { FC, PropsWithChildren, useCallback, useContext, useMemo } from 'react';
import { timelineContext } from '../../TimelineProvider';
import { actions } from '../../TimelineProvider/actions';
import { createSliderMarker } from '../../TimelineProvider/utils';
import { useStyles } from './styles';

let animationFrame = 0;

export const TimelineSlider: FC = (props: PropsWithChildren<{}>) => {
    const { children } = props;
    const styles = useStyles(theme);
    const {
        state: {
            selectedDate,
            topSliderMarkers,
            bottomSliderMarkers,
            rotationGroups,
            mode,
            previewDates,
        },
        dispatch,
    } = useContext(timelineContext);

    const selectedDateMarker = useMemo(() => {
        return createSliderMarker(selectedDate.getTime(), formatDate(selectedDate), true);
    }, [selectedDate]);

    const rotationKeys = Object.keys(rotationGroups);

    const sliderStyle = clsx(styles.slider, {
        [styles.rotationGroupSlider]: rotationKeys.length > 1,
    });

    const showSlider = mode === 'slider' || previewDates;

    const onSliderChange = useCallback(
        (marker: SliderMarker) => {
            window.cancelAnimationFrame(animationFrame);
            animationFrame = window.requestAnimationFrame(() => {
                dispatch(actions.setSelectedDate(new Date(marker.value)));
            });
        },
        [dispatch]
    );

    if (!topSliderMarkers.length || !bottomSliderMarkers.length) {
        return null;
    }

    return (
        <>
            {showSlider && (
                <div className={sliderStyle}>
                    <Slider
                        markers={[...topSliderMarkers, selectedDateMarker]}
                        value={selectedDate.getTime()}
                        onChange={(marker) => onSliderChange(marker)}
                        key="top-slider"
                        disabled={previewDates}
                    />
                </div>
            )}
            {children}
            {showSlider && (
                <div className={sliderStyle}>
                    <Slider
                        markers={bottomSliderMarkers}
                        value={selectedDate.getTime()}
                        onChange={(marker) => onSliderChange(marker)}
                        hideHandle
                        key="bottom-slider"
                        disabled={previewDates}
                    />
                </div>
            )}
        </>
    );
};

export default TimelineSlider;
