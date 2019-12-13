import React from 'react';
import { useComponentDisplayClassNames } from '@equinor/fusion';
import classNames from 'classnames';
import styles from './styles.less';

type SkeletonDiscProps = {
    width: number | string;
    height: number | string;
};

const SkeletonDisc: React.FC<SkeletonDiscProps> = ({ width, height }) => {
    const displayClassNames = useComponentDisplayClassNames(styles);
    const discClassNames = classNames(styles.skeleton, displayClassNames, styles.disc);

    return <div className={discClassNames} style={{ width, height }} />;
};

export default SkeletonDisc;
