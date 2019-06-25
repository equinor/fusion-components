import * as React from 'react';
import styles from './styles.less';
import classNames from 'classnames';
import { useElevationClassName } from 'index';

type DialogProps = {
    children: any;
};

export const Dialog: React.FC<DialogProps> = ({ children }) => {
    return <div className={classNames(styles.container, useElevationClassName(6))}>{children}</div>;
};

export const DialogTitle: React.FC<DialogProps> = ({ children }) => (
    <div className={styles.dialogTitle}>{children}</div>
);

export const DialogContent: React.FC<DialogProps> = ({ children }) => {
    return <div className={styles.dialogContent} >{children}</div>;
};

export const DialogActions: React.FC<DialogProps> = ({ children }) => (
    <div className={styles.dialogActions}>{children}</div>
);

Dialog.displayName = 'Dialog';
DialogTitle.displayName = 'DialogTitle';
DialogContent.displayName = 'DialogContent';
DialogActions.displayName = 'DialogActions';
