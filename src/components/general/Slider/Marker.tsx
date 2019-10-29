import React, { useCallback } from 'react';

import styles from './styles.less';
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

const Marker: React.FC<SliderMarkerProps> = ({ marker, isActive, disabled, position, onClick }) => {
    const onClickHandler = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
            onClick(marker);
        },
        [marker, onClick]
    );

    const markerClassNames = classNames(styles.marker, {
        [styles.isActive]: isActive,
        [styles.isLowered]: marker.lowered,
        [styles.isElevated]: marker.elevated,
    });

    return (
        <button
            className={markerClassNames}
            style={{ left: position }}
            onClick={e => !disabled && onClickHandler(e)}
        >
            <div className={styles.dot} />
            <label>{marker.label}</label>
        </button>
    );
};

export default Marker;
