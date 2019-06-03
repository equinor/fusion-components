import classNames from 'classnames';
import { ComponentDisplayTypesEnum } from '../../contexts/componentDisplayContext';
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
    [styles.compact]: displayType === ComponentDisplayTypesEnum.COMPACT || compact,
    [styles.comfortable]:
        (displayType === ComponentDisplayTypesEnum.COMFORTABLE &&
            displayType !== ComponentDisplayTypesEnum.COMFORTABLE) ||
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
