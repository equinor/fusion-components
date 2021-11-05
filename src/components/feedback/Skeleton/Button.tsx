import { FC } from 'react';
import { ButtonProps } from '@equinor/fusion-components';
import classNames from 'classnames';
//import styles from './styles.less';
import { useStyles } from './Skeleton.style';
import { useComponentDisplayClassNames } from '@equinor/fusion';

type SkeletonButtonProps = ButtonProps & {
    width: number | string;
};

const SkeletonButton: FC<SkeletonButtonProps> = ({ width, ...buttonProps }) => {
    const styles = useStyles();
    const displayClassNames = useComponentDisplayClassNames(styles);
    const barClassNames = classNames(styles.skeleton, displayClassNames, styles.button);

    return <div className={barClassNames} style={{ width }} />;
};

export default SkeletonButton;
