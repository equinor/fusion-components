import classNames from 'classnames';
import MenuItem, { MenuItemType, MenuItemComponentProps } from './MenuItem';
import styles from './styles.less';
import {
    useKeyboardNavigation,
    Elevation,
    useElevationClassName,
} from '@equinor/fusion-components';
import { useState, useCallback, useEffect, FC } from 'react';

export type MenuSection<TItem extends MenuItemType> = {
    key: string;
    title?: string;
    items: TItem[];
};

export type MenuProps<TItem extends MenuItemType> = {
    sections: MenuSection<TItem>[];
    elevation?: Elevation;
    onClick?: (item: TItem) => void | Promise<void>;
    keyboardNavigationRef?: HTMLElement | null;
    onChange?: (items: MenuSection<TItem>[]) => void | Promise<void>;
    itemComponent?: FC<MenuItemComponentProps<TItem>>;
    asideComponent?: FC<MenuItemComponentProps<TItem>>;
};

export { MenuItemType };

function Menu<TItem extends MenuItemType = MenuItemType>({
    sections,
    elevation,
    onClick,
    itemComponent: component,
    asideComponent,
    keyboardNavigationRef,
}: MenuProps<TItem>) {
    const [focusedSectionKey, setFocusedSectionKey] = useState<string | null>(null);
    const [focusedItemKey, setFocusedItemKey] = useState<string | null>(null);
    const [skipDirection, setSkipDirection] = useState<number>(0);

    const nextOrPrev = useCallback(
        (direction: number) => {
            const sectionIndex = sections.findIndex((section) => section.key === focusedSectionKey);
            let nextSectionIndex = sectionIndex;

            if (sectionIndex === -1) {
                nextSectionIndex = direction === -1 ? sections.length - 1 : 0;
            }

            const items = sections[nextSectionIndex].items;

            const itemIndex = items.findIndex((item) => item.key === focusedItemKey);
            let nextItemIndex = itemIndex;

            if (nextItemIndex === -1) {
                nextSectionIndex = direction === -1 ? sections.length - 1 : 0;
                nextItemIndex = direction === -1 ? sections[nextSectionIndex].items.length - 1 : 0;
            } else if (nextItemIndex === 0 && direction === -1) {
                nextSectionIndex = (sectionIndex + sections.length - 1) % sections.length;
                nextItemIndex = sections[nextSectionIndex].items.length - 1;
            } else if (nextItemIndex === items.length - 1 && direction === 1) {
                nextSectionIndex = (sectionIndex + sections.length + 1) % sections.length;
                nextItemIndex = 0;
            } else {
                nextItemIndex += direction;
            }

            const nextSection = sections[nextSectionIndex];

            setFocusedSectionKey(nextSection.key);
            setFocusedItemKey(nextSection.items[nextItemIndex].key);

            if (nextSection.items[nextItemIndex].isDisabled) {
                setSkipDirection(direction);
            }
        },
        [sections, focusedItemKey, focusedSectionKey]
    );

    useEffect(() => {
        if (skipDirection !== 0) {
            nextOrPrev(skipDirection);
        }
        setSkipDirection(0);
    }, [skipDirection]);

    const reset = useCallback(() => {
        setFocusedSectionKey(keyboardNavigationRef && sections.length ? sections[0].key : null);
        setFocusedItemKey(
            keyboardNavigationRef && sections.length && sections[0].items.length
                ? sections[0].items[0].key
                : null
        );
    }, [sections]);

    const onItemClick = useCallback(
        (item: TItem) => {
            if (onClick) {
                onClick(item);
            }
        },
        [onClick]
    );

    useKeyboardNavigation(
        {
            onUp: () => nextOrPrev(-1),
            onDown: () => nextOrPrev(+1),
            onEnter: () => {
                const section = sections.find((section) => section.key === focusedSectionKey);
                if (!section) {
                    return;
                }

                const item = section.items.find((item) => item.key === focusedItemKey);
                if (!item) {
                    return;
                }

                onItemClick(item);
            },
            onEscape: reset,
        },
        keyboardNavigationRef
    );

    useEffect(reset, [sections]);

    const className = classNames(styles.container, useElevationClassName(elevation));

    return (
        <div className={className}>
            {sections.map((section) => (
                <section key={section.key}>
                    {!!section.title && <h5>{section.title}</h5>}
                    {section.items.map((item, index) => (
                        <MenuItem
                            key={item.key}
                            index={index}
                            isFocused={
                                focusedSectionKey === section.key && focusedItemKey === item.key
                            }
                            item={item}
                            itemComponent={component}
                            asideComponent={asideComponent}
                            onClick={onItemClick}
                        />
                    ))}
                </section>
            ))}
        </div>
    );
}

Menu.defaultProps = {
    sections: [],
    elevation: 2,
};

export default Menu;
