import * as React from "react";
import styles from "./styles.less";

type DialogTitlePops = {
    children: any,

}

const DialogTitle: React.FC<DialogTitlePops> = ({children}) => {

    return (
        <div className={styles.dialogTitle}>
            {children}

        </div>
    )
}
export default DialogTitle;