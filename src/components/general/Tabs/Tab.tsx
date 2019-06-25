import * as React from 'react';
import * as styles from './styles.less';
import * as classNames from 'classnames';
import { useKeyboardNavigation } from 'index';

type TabProps = {
    isCurrent?: boolean;
    title: string;
    tabKey: string;
    disabled?: boolean;
    onChange?: (ref: HTMLElement) => void;
    url?: string;
};

const Tab: React.FC<TabProps> = ({ isCurrent, title, disabled, onChange, url }) => {
    const [isPressed, setIsPressed] = React.useState(false);
    const tabRef = React.useRef<HTMLAnchorElement>(null);

    useKeyboardNavigation(
        {
            onEnter: () => {
                if (tabRef.current) {
                    !disabled && onChange && onChange(tabRef.current);
                }
            },
        },
        tabRef.current
    );

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
            onClick={() => !disabled && onChange && tabRef.current && onChange(tabRef.current)}
            onMouseDown={() => setIsPressed(true)}
            onMouseUp={() => setIsPressed(false)}
            onMouseLeave={() => isPressed && setIsPressed(false)}
            href={url}
            ref={tabRef}
            tabIndex={0}
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
