import * as React from "react";
import classNames from "classnames";
import styles from "./styles.less";

export type MenuItemType = {
    key: string;
    title: string;
    aside?: string;
    isSelected?: boolean;
    isDisabled?: boolean;
};

type MenuItemProps = {
    item: MenuItemType;
    index: number;
    isFocused: boolean;
    onClick: (e: MenuItemType) => void;
};

const MenuItem: React.FC<MenuItemProps> = props => {
    const ref = React.useRef<HTMLButtonElement>(null);
    const onClick = e => {
        if (ref.current) {
            ref.current.blur();
        }

        props.onClick(props.item);
        e.preventDefault();
    };

    const className = classNames({
        [styles.isSelected]: props.item.isSelected,
        [styles.isFocused]: props.isFocused,
    });

    return (
        <button
            className={className}
            disabled={props.item.isDisabled}
            ref={ref}
            tabIndex={props.index + 1}
            onClick={onClick}
        >
            <span>
                <span>{props.item.title}</span>
                {props.item.aside && <aside>{props.item.aside}</aside>}
            </span>
        </button>
    );
};

export default MenuItem;
