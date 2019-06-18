import * as React from 'react';
import styles from './styles.less';
import classNames from 'classnames';
import useElevationClassName from '../../../hooks/useElevationClassName';

export enum VerticalPositions {
    top = 'top',
    bottom = 'bottom',
}
export enum HorizontalPositions {
    left = 'left',
    right = 'right',
    center = 'center',
}

type SnackBarProps = {
    verticalPosition?: VerticalPositions;
    horizontalPosition?: HorizontalPositions;
    message?: string;
    cancelLabel?: string;
    onCancel?: () => void;
    cancellable?: boolean;
    abortSignal: AbortSignal;
};

const SnackBar: React.FC<SnackBarProps> = ({
    verticalPosition = VerticalPositions.bottom,
    horizontalPosition = HorizontalPositions.left,
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
            <button onClick={() => onCancel && onCancel()}>
                <span>{cancelLabel}</span>

            </button>
      
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
            <div className={styles.message}>{message}</div>
            {cancelButton}
        </div>
    );
};

SnackBar.displayName = 'SnackBar';

export default SnackBar;
