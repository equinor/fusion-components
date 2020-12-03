import styles from './styles.less';
import classNames from 'classnames';
import { useElevationClassName } from '@equinor/fusion-components';
import { FC } from 'react';

type DialogProps = {
    children: any;
};

export const Dialog: FC<DialogProps> = ({ children }) => {
    return <div className={classNames(styles.container, useElevationClassName(6))}>{children}</div>;
};

export const DialogTitle: FC<DialogProps> = ({ children }) => (
    <div className={styles.dialogTitle}>{children}</div>
);

export const DialogContent: FC<DialogProps> = ({ children }) => {
    return <div className={styles.dialogContent}>{children}</div>;
};

export const DialogActions: FC<DialogProps> = ({ children }) => (
    <div className={styles.dialogActions}>{children}</div>
);

Dialog.displayName = 'Dialog';
DialogTitle.displayName = 'DialogTitle';
DialogContent.displayName = 'DialogContent';
DialogActions.displayName = 'DialogActions';
