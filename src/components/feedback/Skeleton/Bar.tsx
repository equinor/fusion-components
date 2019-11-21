import React, { useMemo } from 'react';
import styles from './styles.less';
import { useComponentDisplayClassNames } from '@equinor/fusion';
import classNames from 'classnames';

type SkeletonBarProps = {
    width?: number | string;
};

const SkeletonBar: React.FC<SkeletonBarProps> = props => {
    const displayClassNames = useComponentDisplayClassNames(styles);
    const barClassNames = classNames(styles.bar, displayClassNames, styles.skeleton);

    const width = useMemo(
        () => props.width || Math.max(Math.min(Math.floor(Math.random() * 100), 100), 50) + '%',
        [props.width]
    );
    return <div className={barClassNames} style={{ width }} />;
};

export default SkeletonBar;
