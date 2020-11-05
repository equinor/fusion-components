import { useComponentDisplayClassNames } from '@equinor/fusion';
import classNames from 'classnames';
import styles from './styles.less';

export type DiscSize = 'xlarge' | 'large' | 'medium' | 'small';
type SkeletonDiscProps = {
    size: DiscSize;
};

const SkeletonDisc: React.FC<SkeletonDiscProps> = ({ size }) => {
    const displayClassNames = useComponentDisplayClassNames(styles);

    const discClassNames = classNames(styles.skeleton, styles.disc, displayClassNames, {
        [styles.xlarge]: size === 'xlarge',
        [styles.large]: size === 'large',
        [styles.medium]: size === 'medium',
        [styles.small]: size === 'small',
    });

    return <div className={discClassNames} />;
};

export default SkeletonDisc;
