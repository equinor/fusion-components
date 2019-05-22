import * as React from "react";
import * as styles from "./styles.less";
import * as classNames from "classnames";
import * as PropTypes from "prop-types";

type TabProps = {
    isCurrent?: boolean,
    title: string,
    disabled?: boolean,
    onChange: () => void,
    url?: string,
};

const Tab = ({ isCurrent, title, disabled, onChange, url }: TabProps) => {
    const [isPressed, setIsPressed] = React.useState(false);

    const tabClasses = classNames(styles.tab, {
        [styles.current]: isCurrent,
        [styles.disabled]: disabled,
        [styles.pressed]: isPressed && !disabled,
    });
    const titleClasses = classNames(styles.title, {
        [styles.pressed]: isPressed && !disabled,
    });

    if (disabled) {
        return (
            <span className={tabClasses}>
                <div className={titleClasses}>{title}</div>
            </span>
        );
    }

    return (
        <a
            className={tabClasses}
            onClick={() => !disabled && onChange()}
            onMouseDown={() => setIsPressed(true)}
            onMouseUp={() => setIsPressed(false)}
            onMouseLeave={() => isPressed && setIsPressed(false) }
            href={url}
        >
            <div className={titleClasses}>{title}</div>
        </a>
    );
};

Tab.displayName = "Tab";

Tab.propTypes = {
    isCurrent: PropTypes.bool,
    title: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    url: PropTypes.string,
};

Tab.defaultProps = {
    isCurrent: false,
    disabled: false,
    onChange: null,
};

export default Tab;
