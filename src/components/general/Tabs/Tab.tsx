import * as React from "react";
import * as styles from "./styles.less";
import * as classNames from "classnames";

type TabProps = {
    isCurrent?: boolean,
    title: string,
    tabKey: string,
    disabled?: boolean,
    onChange?: () => void,
    url?: string,
    onCurrent?: (ref: React.MutableRefObject<HTMLAnchorElement | null>) => void,
};

const Tab: React.FC<TabProps> = ({ isCurrent, title, disabled, onChange, url, onCurrent }) => {
    const [isPressed, setIsPressed] = React.useState(false);
    const tabRef = React.useRef<HTMLAnchorElement | null>(null);

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
        if (isCurrent && tabRef) {
            onCurrent && onCurrent(tabRef);
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
            ref={tabRef}
            tabIndex={0}        
            onKeyDown ={e => {
                if(e.keyCode === 13 || e.keyCode === 32){
                    !disabled && onChange && onChange()
                }
            }}
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
