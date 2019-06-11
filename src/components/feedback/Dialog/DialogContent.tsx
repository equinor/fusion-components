import * as React from 'react';
import styles from './styles.less';
import classNames from 'classnames';

type DialogContentProps = {
    children: any;
    scrollable?: boolean;
};

const DialogContent: React.FC<DialogContentProps> = ({ children, scrollable }) => {
    const contentClasses = classNames(styles.dialogContent, { 
        [styles.scrollable]: scrollable 
    });

    return <div className={contentClasses}>{children}</div>;
};

export default DialogContent;
