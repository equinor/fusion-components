import * as React from "react";
import * as styles from "./styles.less";
import * as classNames from "classnames";
import useKeyBoardNavigation from "../../../hooks/useKeyboardNavigation";

type TabProps = {
    isCurrent?: boolean,
    title: string,
    tabKey: string,
    disabled?: boolean,
    onChange?: () => void,
    url?: string,
    onCurrent?: (ref: HTMLElement) => void,
};

const Tab: React.FC<TabProps> = ({ isCurrent, title, disabled, onChange, url, onCurrent }) => {
    const [isPressed, setIsPressed] = React.useState(false);

    const tabRef = useKeyBoardNavigation({
        onEnter: () => {
            if (tabRef.ref) {
                !disabled && onChange && onChange();
            }
        },
    });

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

    React.useEffect(() => {
        if (isCurrent && tabRef.ref) {
            onCurrent && onCurrent(tabRef.ref);
        }
    }, [isCurrent]);

    return (
        <a
            className={tabClasses}
            onClick={() => !disabled && onChange && onChange()}
            onMouseDown={() => setIsPressed(true)}
            onMouseUp={() => setIsPressed(false)}
            onMouseLeave={() => isPressed && setIsPressed(false)}
            href={url}
            ref={tabRef.setRef}
            tabIndex={0}
        >
            <div className={titleClasses}>{title}</div>
        </a>
    );
};

Tab.displayName = "Tab";

Tab.defaultProps = {
    isCurrent: false,
    disabled: false,
    onChange: () => {},
    onCurrent: () => {},
};

export default Tab;
