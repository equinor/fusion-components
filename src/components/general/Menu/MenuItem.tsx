import classNames from 'classnames';
import { useEffect, useRef, FC, ReactNode, MouseEvent } from 'react';
//import styles from './styles.less';
import { useStyles } from './Menu.style';

export type MenuItemComponentProps<TItem extends MenuItemType> = {
    item: TItem;
};

export type MenuItemType = {
    key: string;
    title: string | ReactNode;
    aside?: string | ReactNode;
    isSelected?: boolean;
    isDisabled?: boolean;
};

type MenuItemProps<TItem extends MenuItemType> = {
    item: TItem;
    index: number;
    isFocused: boolean;
    onClick: (e: TItem) => void;
    itemComponent?: FC<MenuItemComponentProps<TItem>>;
    asideComponent?: FC<MenuItemComponentProps<TItem>>;
};

const scrollElementIntoView = (el: HTMLElement & { scrollIntoViewIfNeeded?: () => void }) => {
    el.scrollIntoViewIfNeeded ? el.scrollIntoViewIfNeeded() : el.scrollIntoView();
};

function MenuItem<TItem extends MenuItemType>(props: MenuItemProps<TItem>) {
    const styles = useStyles();
    const ref = useRef<HTMLButtonElement>(null);
    const onClick = (e: MouseEvent<HTMLButtonElement>) => {
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

    useEffect(() => {
        props.isFocused && scrollElementIntoView(ref.current);
    }, [props.isFocused]);

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
