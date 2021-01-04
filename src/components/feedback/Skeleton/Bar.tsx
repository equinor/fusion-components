import { useMemo, FC } from 'react';

import styles from './styles.less';
import { useComponentDisplayClassNames } from '@equinor/fusion';
import classNames from 'classnames';

type SkeletonBarProps = {
    width?: number | string;
    height?: number | string;
};

const SkeletonBar: FC<SkeletonBarProps> = ({ height, width }) => {
    const displayClassNames = useComponentDisplayClassNames(styles);
    const barClassNames = classNames(styles.bar, displayClassNames, styles.skeleton);

    const barWidth = useMemo(
        () => width || Math.max(Math.min(Math.floor(Math.random() * 100), 100), 50) + '%',
        [width]
    );
    return <div className={barClassNames} style={{ width: barWidth, height }} />;
};

export default SkeletonBar;
