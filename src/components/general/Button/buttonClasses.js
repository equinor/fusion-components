import classNames from "classnames";
import { componentDisplayTypes } from "../../contexts/ComponentDisplayContext";
import styles from "./styles/index.less";

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
    [styles.icon]: false,
});

const getButtonStyleClasses = ({ primary, signal }) => ({
    [styles.primary]: primary,
    [styles.signal]: signal,
});

const getButtonSizeClasses = ({ compact, comfortable, displayType }) => ({
    [styles.compact]: displayType === componentDisplayTypes.compact || compact,
    [styles.comfortable]:
        (displayType === componentDisplayTypes.comfortable &&
            displayType !== componentDisplayTypes.comfortable) ||
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
