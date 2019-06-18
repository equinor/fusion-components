import * as React from 'react';
import styles from './styles.less';
import classNames from 'classnames';
import useElevationClassName from '../../../hooks/useElevationClassName'

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
    const contentRef = React.useRef<HTMLDivElement | null>(null);
    const [isScrollable, setIsScrollable] = React.useState(false);
    
    React.useEffect(() => {
        if(contentRef.current){
            contentRef.current.offsetHeight < contentRef.current.scrollHeight && setIsScrollable(true);
        }
    }, [contentRef]);
    
    const contentClasses = classNames(styles.dialogContent, {
        [styles.scrollable]: isScrollable,
    });

    return <div className={contentClasses} ref={contentRef}>{children}</div>;
};

export const DialogActions: React.FC<DialogProps> = ({ children }) => (
    <div className={styles.dialogActions}>{children}</div>
);

Dialog.displayName = 'Dialog';
DialogTitle.displayName = 'DialogTitle';
DialogContent.displayName = 'DialogContent';
DialogActions.displayName = 'DialogActions';
