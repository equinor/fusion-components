import React, { useCallback } from 'react';

import styles from './styles.less';

export type SliderMarker = {
    value: number;
    label: string;
};

type SliderMarkerProps = {
    marker: SliderMarker;
    position: string;
    onClick: (marker: SliderMarker) => void;
};

const Marker: React.FC<SliderMarkerProps> = ({ marker, position, onClick }) => {
    const onClickHandler = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
            onClick(marker);
        },
        [marker, onClick]
    );

    return (
        <button className={styles.marker} style={{ left: position }} onClick={onClickHandler}>
            <div className={styles.dot} />
            <label>{marker.label}</label>
        </button>
    );
};

export default Marker;