import React, { useCallback } from 'react';

import styles from './styles.less';
import classNames from 'classnames';

export type SliderMarker = {
    value: number;
    label: string;
};

type SliderMarkerProps = {
    marker: SliderMarker;
    isActive: boolean;
    position: string;
    onClick: (marker: SliderMarker) => void;
};

const Marker: React.FC<SliderMarkerProps> = ({ marker, isActive, position, onClick }) => {
    const onClickHandler = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
            onClick(marker);
        },
        [marker, onClick]
    );

    const markerClassNames = classNames(styles.marker, {
        [styles.isActive]: isActive,
    })

    return (
        <button className={markerClassNames} style={{ left: position }} onClick={onClickHandler}>
            <div className={styles.dot} />
            <label>{marker.label}</label>
        </button>
    );
};

export default Marker;