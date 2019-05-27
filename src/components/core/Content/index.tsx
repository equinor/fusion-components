import * as React from "react";
import styles from "./styles.less";

const FusionContent: React.FC = ({ children }) => {
    return <div className={styles.container}>{children}</div>;
};

export default FusionContent;
