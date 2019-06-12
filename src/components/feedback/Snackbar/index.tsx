import * as React from 'react';
import styles from './styles.less';
import classNames from 'classnames';

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
    autoHideDuration?: number;
    onClose?: () => void;
    message?: string;
    actions?: Array<JSX.Element>;
};

const SnackBar: React.FC<SnackBarProps> = ({
    verticalPosition = verticalPositions.bottom,
    horizontalPosition = horizontalPositions.left,
    open,
    autoHideDuration = 6000,
    onClose,
    message,
    actions,
}) => {
    const autoHideRef = React.useRef<any>();

    const setAutoHideTimeout = React.useCallback(() => {
        clearTimeout(autoHideRef.current);
        autoHideRef.current = setTimeout(() => {
            if (!onClose) {
                return;
            }
            onClose();
        }, autoHideDuration);
    }, [autoHideDuration, onClose]);

    React.useEffect(() => {
        if (open) {
            setAutoHideTimeout();
        }
        return () => {
            clearTimeout(autoHideRef.current);
        };
    });

    const startAutoTimeout = React.useCallback(() => setAutoHideTimeout(), [autoHideRef]);

    const cancelAutoTimeout = React.useCallback(() => clearTimeout(autoHideRef.current), [
        autoHideRef,
    ]);

    const snackBarMessage = React.useMemo(() => {
        if (message) {
            return <span className={styles.message}>{message}</span>;
        }
        return null;
    }, [message]);

    const snackBarActions = React.useMemo(() => {
        if (actions && actions.length > 0) {
            return <div className={styles.actionGroup}>{actions.map(action => action)}</div>;
        }
        return null;
    }, [actions]);

    const containerStyles = classNames(
        styles.container,
        styles[horizontalPosition],
        styles[verticalPosition]
    );

    if (!open) {
        return null;
    }

    return (
        <div
            className={containerStyles}
            onMouseEnter={cancelAutoTimeout}
            onMouseLeave={startAutoTimeout}
        >
            {snackBarMessage}
            {snackBarActions}
        </div>
    );
};

SnackBar.displayName = 'SnackBar';

export default SnackBar;
