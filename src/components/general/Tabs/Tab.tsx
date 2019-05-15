import * as React from "react";
import * as styles from "./styles.less";
import * as classNames from "classnames";
import * as PropTypes from "prop-types";

const Tab = ({ isCurrent, title, disabled, onTabClick }) => {
    const [isHovering, setIsHovering] = React.useState(false);
    const [isPressed, setIsPressed] = React.useState(false);

    const tabClasses = classNames(styles.tab, {
        [styles.current]: isCurrent,
        [styles.hover]: isHovering && !disabled,
        [styles.pressed]: isPressed && !disabled,
        [styles.disabled]: disabled,
    });
    const titleClasses = classNames(styles.title);

    return (
        <button
            className={tabClasses}
            onClick={() => !disabled && onTabClick()}
            onMouseOver={() => setIsHovering(true)}
            onMouseLeave={() => {
                setIsHovering(false);
                setIsPressed(false);
            }}
            onMouseDown={() => setIsPressed(true)}
            onMouseUp={() => setIsPressed(false)}
        >
            <span className={titleClasses}>{title}</span>
        </button>
    );
};

Tab.displayName = "Tab";

Tab.propTypes = {
    isCurrent: PropTypes.bool,
    title: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    onTabClick: PropTypes.func
}

export default Tab;
