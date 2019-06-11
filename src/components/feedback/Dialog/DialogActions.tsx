import * as React from "react";
import styles from "./styles.less";

type DialogActionsProps = {
    children: any,

}

const DialogActions: React.FC<DialogActionsProps> = ({children}) => {

    return (
        <div className={styles.dialogActions}>
            {children}

        </div>
    )
}
export default DialogActions;