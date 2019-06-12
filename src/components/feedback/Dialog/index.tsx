import * as React from 'react';
import styles from './styles.less';
import classNames from 'classnames';

type DialogProps = {
    children: any;
};

type DialogContentProps = {
    scrollable?: boolean;
};

export const Dialog: React.FC<DialogProps> = ({ children }) => {
    return <div className={styles.container}>{children}</div>;
};

export const DialogTitle: React.FC<DialogProps> = ({ children }) => (
    <div className={styles.dialogTitle}>{children}</div>
);

export const DialogContent: React.FC<DialogProps & DialogContentProps> = ({ children, scrollable }) => {
    const contentClasses = classNames(styles.dialogContent, {
        [styles.scrollable]: scrollable,
    });

    return <div className={contentClasses}>{children}</div>;
};

export const DialogActions: React.FC<DialogProps> = ({ children }) => (
    <div className={styles.dialogActions}>{children}</div>
);

Dialog.displayName = 'Dialog';
DialogTitle.displayName = 'DialogTitle';
DialogContent.displayName = 'DialogContent';
DialogActions.displayName = 'DialogActions';
