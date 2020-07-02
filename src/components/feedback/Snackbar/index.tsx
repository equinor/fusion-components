import React, { useState, useEffect, useCallback } from 'react';
import styles from './styles.less';
import classNames from 'classnames';
import useElevationClassName from 'hooks/useElevationClassName';

export enum VerticalPositions {
    Top = 'top',
    Bottom = 'bottom',
}
export enum HorizontalPositions {
    Left = 'left',
    Right = 'right',
    Center = 'center',
}

type SnackBarProps = {
    verticalPosition?: VerticalPositions;
    horizontalPosition?: HorizontalPositions;
    message?: string;
    cancelLabel?: string;
    onCancel?: () => void;
    cancellable?: boolean;
    abortSignal: AbortSignal;
    onDismiss: () => void;
};

const SnackBar: React.FC<SnackBarProps> = ({
    verticalPosition = VerticalPositions.Bottom,
    horizontalPosition = HorizontalPositions.Left,
    message,
    cancelLabel,
    onCancel,
    cancellable,
    abortSignal,
    onDismiss,
}) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const onAbort = useCallback(() => {
        setIsVisible(false);
        onDismiss();
    }, [onDismiss]);

    useEffect(() => {
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
