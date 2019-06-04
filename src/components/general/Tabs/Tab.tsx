import * as React from 'react';
import * as styles from './styles.less';
import * as classNames from 'classnames';

type TabProps = {
    isCurrent?: boolean;
    title: string;
    tabKey: string;
    disabled?: boolean;
    onChange?: () => void;
    url?: string;
};

const Tab: React.FC<TabProps> = ({ isCurrent, title, disabled, onChange, url }) => {
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
            onClick={() => !disabled && onChange && onChange()}
            onMouseDown={() => setIsPressed(true)}
            onMouseUp={() => setIsPressed(false)}
            onMouseLeave={() => isPressed && setIsPressed(false)}
            href={url}
        >
            <div className={titleClasses}>{title}</div>
        </a>
    );
};

Tab.displayName = 'Tab';

Tab.defaultProps = {
    isCurrent: false,
    disabled: false,
    onChange: () => {},
};

export default Tab;
