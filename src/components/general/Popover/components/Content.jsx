import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Arrow from "./Arrow";
import {
    popoverHorizontalPositions,
    popoverVerticalPositions,
} from "../positioning";

import styles from "../styles.less";

const PopoverContent = ({
    horizontalPosition,
    verticalPosition,
    inset,
    isRelative,
    children,
}) => {
    const containerClassNames = classNames(
        styles.container,
        styles[horizontalPosition],
        styles[verticalPosition],
        {
            [styles.isInset]: inset,
            [styles.isRelative]: isRelative,
        }
    );

    return (
        <div className={containerClassNames}>
            <Arrow />
            <div className={styles.content}>{children}</div>
        </div>
    );
};

PopoverContent.propTypes = {
    isRelative: PropTypes.bool.isRequired,
    horizontalPosition: PropTypes.oneOf(
        Object.values(popoverHorizontalPositions)
    ).isRequired,
    verticalPosition: PropTypes.oneOf(Object.values(popoverVerticalPositions))
        .isRequired,
    inset: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
};

PopoverContent.displayName = "@fusion/components/general/Popover/Content";

export default PopoverContent;
