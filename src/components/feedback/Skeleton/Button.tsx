import React from 'react';
import classNames from 'classnames';
import styles from './styles.less';
import { useComponentDisplayClassNames } from '@equinor/fusion';
import { ButtonProps } from 'components/general/Button';

type SkeletonButtonProps = ButtonProps & {
    width: number | string;
};

const SkeletonButton: React.FC<SkeletonButtonProps> = ({ width, ...buttonProps }) => {
    const displayClassNames = useComponentDisplayClassNames(styles);
    const barClassNames = classNames(styles.skeleton, displayClassNames, styles.button);

    return <div className={barClassNames} style={{ width }} />;
};

export default SkeletonButton;
