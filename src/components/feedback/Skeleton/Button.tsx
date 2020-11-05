import { ButtonProps } from '@equinor/fusion-components';
import classNames from 'classnames';
import styles from './styles.less';
import { useComponentDisplayClassNames } from '@equinor/fusion';

type SkeletonButtonProps = ButtonProps & {
    width: number | string;
};

const SkeletonButton: React.FC<SkeletonButtonProps> = ({ width, ...buttonProps }) => {
    const displayClassNames = useComponentDisplayClassNames(styles);
    const barClassNames = classNames(styles.skeleton, displayClassNames, styles.button);

    return <div className={barClassNames} style={{ width }} />;
};

export default SkeletonButton;
