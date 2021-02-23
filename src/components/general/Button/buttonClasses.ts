import classNames from 'classnames';
import { ComponentDisplayType } from '@equinor/fusion';
import styles from './styles/index.less';
import { ButtonProps } from './index';

type ButtonClassesProps = ButtonProps & {
    className?: string;
    displayType: ComponentDisplayType;
    mouseHasBeenDown: boolean;
};

// const getLayoutClasses = ({ block, flex }: ButtonClassesProps) => ({
//     [styles.block]: block,
//     [styles.flex]: flex,
// });

const getMouseDownClasses = ({ mouseHasBeenDown }: ButtonClassesProps) => ({
    [styles.mouseHasBeenDown]: mouseHasBeenDown,
});

const getButtonVariantClasses = ({ contained, outlined, frameless }: ButtonClassesProps) => ({
    [styles.contained]: contained || (!outlined && !frameless), // Default to contained
    [styles.outlined]: outlined,
    [styles.frameless]: frameless,
});

const getButtonStyleClasses = ({ primary, danger }: ButtonClassesProps) => ({
    [styles.primary]: primary || !danger, // Default to primary
    [styles.danger]: danger,
});

const getButtonSizeClasses = ({ displayType }: ButtonClassesProps) => ({
    [styles.compact]: displayType === ComponentDisplayType.Compact,
    [styles.comfortable]: displayType === ComponentDisplayType.Comfortable,
});

export default (props: ButtonClassesProps) =>
    classNames(
        props.className,
        styles.container,
        // getLayoutClasses(props),
        getMouseDownClasses(props),
        getButtonVariantClasses(props),
        getButtonStyleClasses(props),
        getButtonSizeClasses(props)
    );
