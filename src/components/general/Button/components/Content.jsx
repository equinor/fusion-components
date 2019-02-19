import React from "react";
import PropTypes from "prop-types";
import styles from "../styles/index.less";

const Content = ({ children }) => (
    <span className={styles.button}>{children}</span>
);

Content.displayName = "@fusion/components/general/Button/Content";

Content.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Content;
