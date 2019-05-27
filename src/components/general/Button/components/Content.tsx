import React from "react";
import styles from "../styles/index.less";

const Content: React.FC = ({ children }) => <span className={styles.button}>{children}</span>;

Content.displayName = "ButtonContent";

export default Content;
