import * as React from 'react';
import classNames from 'classnames';
import styles from './styles.less';

export type MenuItemComponentProps<TItem extends MenuItemType> = {
    item: TItem;
};

export type MenuItemType = {
    key: string;
    title: string | React.ReactNode;
    aside?: string | React.ReactNode;
    isSelected?: boolean;
    isDisabled?: boolean;
};

type MenuItemProps<TItem extends MenuItemType> = {
    item: TItem;
    index: number;
    isFocused: boolean;
    onClick: (e: TItem) => void;
    itemComponent?: React.FC<MenuItemComponentProps<TItem>>;
    asideComponent?: React.FC<MenuItemComponentProps<TItem>>;
};

function MenuItem<TItem extends MenuItemType>(props: MenuItemProps<TItem>) {
    const ref = React.useRef<HTMLButtonElement>(null);
    const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
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

    const aside = () => {
        if (props.asideComponent) {
            const AsideComponent = props.asideComponent;
            return (
                <aside>
                    <AsideComponent item={props.item} />
                </aside>
            );
        }
        if (props.item.aside) {
            return <aside>{props.item.aside}</aside>;
        }
    };

    const content = () => {
        if (props.itemComponent) {
            const Component = props.itemComponent;
            return (
                <span>
                    <Component item={props.item} />
                </span>
            );
        }

        return <span>{props.item.title}</span>;
    };

    return (
        <button
            className={className}
            disabled={props.item.isDisabled}
            ref={ref}
            tabIndex={props.index + 1}
            onClick={onClick}
        >
            <span>
                {aside()}
                {content()}
            </span>
        </button>
    );
}

export default MenuItem;
