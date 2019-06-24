import classNames from 'classnames';
import { ComponentDisplayType } from '@equinor/fusion';
import styles from './styles/index.less';

const getLayoutClasses = ({ block, flex }) => ({
    [styles.block]: block,
    [styles.flex]: flex,
});

const getMouseDownClasses = ({ mouseHasBeenDown }) => ({
    [styles.mouseHasBeenDown]: mouseHasBeenDown,
});

const getButtonVariantClasses = ({ contained, outlined, frameless }) => ({
    [styles.contained]: contained || (!outlined && !frameless), // Default to contained
    [styles.outlined]: outlined,
    [styles.frameless]: frameless,
});

const getButtonStyleClasses = ({ primary, signal }) => ({
    [styles.primary]: primary,
    [styles.signal]: signal,
});

const getButtonSizeClasses = ({ compact, comfortable, displayType }) => ({
    [styles.compact]: displayType === ComponentDisplayType.Compact || compact,
    [styles.comfortable]:
        (displayType === ComponentDisplayType.Comfortable &&
            displayType !== ComponentDisplayType.Comfortable) ||
        (comfortable && !compact),
});

export default props =>
    classNames(
        props.className,
        styles.container,
        getLayoutClasses(props),
        getMouseDownClasses(props),
        getButtonVariantClasses(props),
        getButtonStyleClasses(props),
        getButtonSizeClasses(props)
    );
