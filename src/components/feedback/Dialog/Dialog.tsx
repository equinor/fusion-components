import * as React from 'react';
import styles from "./styles.less";

type DialogProps = {
    open: boolean;
    onClose: () => void;
    children: any,
};

const Dialog: React.FC<DialogProps> = ({ open, onClose, children }) => {
    return <div className={styles.container}> {children}</div>;
};

export default Dialog;
