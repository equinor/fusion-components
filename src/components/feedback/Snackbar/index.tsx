import * as React from 'react';
import styles from './styles.less';
import classNames from 'classnames';
import Button from '../../general/Button';

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
    open?: boolean;
    message?: string;
    cancelLabel?: string;
    onCancel?: () => void;
};

const SnackBar: React.FC<SnackBarProps> = ({
    verticalPosition = verticalPositions.bottom,
    horizontalPosition = horizontalPositions.left,
    open,
    message,
    cancelLabel,
    onCancel,
}) => {
    const snackBarMessage = React.useMemo(() => {
        if (message) {
            return <span className={styles.message}>{message}</span>;
        }
        return null;
    }, [message]);

    const cancelButton = React.useMemo(() => {
        if (cancelLabel) {
            return (
                <Button primary comfortable frameless onClick={() => onCancel && onCancel()}>
                    {cancelLabel}
                </Button>
            );
        }
        return null;
    }, [cancelLabel, onCancel]);

    const containerStyles = classNames(
        styles.container,
        styles[horizontalPosition],
        styles[verticalPosition]
    );

    if (!open) {
        return null;
    }

    return (
        <div className={containerStyles}>
            {snackBarMessage}
            <div className={styles.actionGroup}>
                {cancelButton}
            </div>
        </div>
    );
};

SnackBar.displayName = 'SnackBar';

export default SnackBar;
