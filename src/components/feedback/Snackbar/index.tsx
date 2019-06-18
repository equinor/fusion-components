import * as React from 'react';
import styles from './styles.less';
import classNames from 'classnames';
import Button from '../../general/Button';
import useElevationClassName from '../../../hooks/useElevationClassName';

export enum verticalPositions {
    top = 'top',
    bottom = 'bottom',
}
export enum horizontalPositions {
    left = 'left',
    right = 'right',
    center = 'center',
}

type SnackBarProps = {
    verticalPosition?: verticalPositions;
    horizontalPosition?: horizontalPositions;
    message?: string;
    cancelLabel?: string;
    onCancel?: () => void;
    cancellable?: boolean;
    abortSignal: AbortSignal;
};

const SnackBar: React.FC<SnackBarProps> = ({
    verticalPosition = verticalPositions.bottom,
    horizontalPosition = horizontalPositions.left,
    message,
    cancelLabel,
    onCancel,
    cancellable,
    abortSignal,
}) => {
    const [isVisible, setIsVisible] = React.useState(false);

    React.useEffect(() => {
        setIsVisible(true);
    }, []);

    const onAbort = React.useCallback(() => setIsVisible(false), []);

    React.useEffect(() => {
        abortSignal.addEventListener('abort', onAbort);
        return () => {
            abortSignal.removeEventListener('abort', onAbort);
        };
    }, [abortSignal]);

    const cancelButton = cancellable ? (
        <div className={styles.cancelButton}>
            <Button primary comfortable frameless onClick={() => onCancel && onCancel()}>
                {cancelLabel}
            </Button>
        </div>
    ) : null;

    const containerStyles = classNames(
        styles.container,
        useElevationClassName(6),
        styles[horizontalPosition],
        styles[verticalPosition],
        {
            [styles.isVisible]: isVisible,
        }
    );

    return (
        <div className={containerStyles}>
            <span className={styles.message}>{message}</span>
            {cancelButton}
        </div>
    );
};

SnackBar.displayName = 'SnackBar';

export default SnackBar;
