import { useCallback, FC, MouseEvent } from 'react';

import { useStyles } from './Slider.style';
import classNames from 'classnames';

export type SliderMarker = {
    value: number;
    label: string;
    lowered?: boolean;
    elevated?: boolean;
};

type SliderMarkerProps = {
    marker: SliderMarker;
    isActive: boolean;
    disabled?: boolean;
    position: string;
    onClick: (marker: SliderMarker) => void;
};

const Marker: FC<SliderMarkerProps> = ({ marker, isActive, disabled, position, onClick }) => {
    const styles = useStyles();
    const onClickHandler = useCallback(
        (e: MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
            onClick(marker);
        },
        [marker, onClick]
    );

    const markerClassNames = classNames(styles.marker, {
        // [styles.isActive]: isActive,
        [styles.isLowered]: marker.lowered,
        [styles.isElevated]: marker.elevated,
    });

    return (
        <button
            className={markerClassNames}
            style={{ left: position }}
            onClick={(e) => !disabled && onClickHandler(e)}
        >
            <div className={styles.dot} />
            <label>{marker.label}</label>
        </button>
    );
};

export default Marker;
