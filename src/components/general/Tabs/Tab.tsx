import * as React from 'react';
import * as styles from './styles.less';
import * as classNames from 'classnames';
import { useKeyboardNavigation } from '@equinor/fusion-components';

type TabProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "title"> & {
    isCurrent?: boolean;
    title: string | React.ReactNode;
    tabKey: string;
    disabled?: boolean;
    onChange?: (ref: HTMLElement) => void;
    url?: string;
};

const Tab: React.FC<TabProps> = ({ isCurrent, title, disabled, onChange, url, tabKey, ...props }) => {
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

    const tabClasses = classNames(props.className, styles.tab, {
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
            {...props}
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
