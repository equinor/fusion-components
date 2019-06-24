import * as React from "react";
import classNames from "classnames";
import useElevationClassName, { Elevation } from "../../../hooks/useElevationClassName";
import useKeyboardNavigation from "../../../hooks/useKeyboardNavigation";
import MenuItem, { MenuItemType } from "./MenuItem";
import styles from "./styles.less";

export type MenuSection = {
    key: string,
    title?: string,
    items: MenuItemType[],
};

export type MenuProps = {
    sections: MenuSection[],
    elevation?: Elevation,
    onClick?: (item: MenuItemType) => void | Promise<void>,
    keyboardNavigationRef?: HTMLElement | null,
};

const Menu: React.FC<MenuProps> = ({ sections, elevation, onClick, keyboardNavigationRef }: MenuProps) => {
    const [focusedSectionKey, setFocusedSectionKey] = React.useState<string | null>(null);
    const [focusedItemKey, setFocusedItemKey] = React.useState<string | null>(null);

    const nextOrPrev = (direction: number) => {
        const sectionIndex = sections.findIndex(section => section.key === focusedSectionKey);
        let nextSectionIndex = sectionIndex;

        if (sectionIndex === -1) {
            nextSectionIndex = direction === -1 ? sections.length - 1 : 0;
        }

        const items = sections[nextSectionIndex].items;

        const itemIndex = items.findIndex(item => item.key === focusedItemKey);
        let nextItemIndex = itemIndex;

        if (nextItemIndex === -1) {
            nextSectionIndex = direction === -1 ? sections.length - 1 : 0;
            nextItemIndex = direction === -1 ? sections[nextSectionIndex].items.length - 1 : 0;
        } else if (nextItemIndex === 0 && direction === -1) {
            nextSectionIndex += (sectionIndex + sections.length - 1) % sections.length;
        } else if (nextItemIndex === items.length - 1 && direction === 1) {
            nextSectionIndex += (sectionIndex + sections.length + 1) % sections.length;
        } else {
            nextItemIndex += direction;
        }

        const nextSection = sections[nextSectionIndex];

        setFocusedSectionKey(nextSection.key);
        setFocusedItemKey(nextSection.items[nextItemIndex].key);

        if(nextSection.items[nextItemIndex].isDisabled) {
            nextOrPrev(direction);
        }
    };

    const reset = () => {
        setFocusedSectionKey(keyboardNavigationRef && sections.length ? sections[0].key : null);
        setFocusedItemKey(keyboardNavigationRef && sections.length && sections[0].items.length ? sections[0].items[0].key : null);
    };

    const onItemClick = item => {
        if (onClick) {
            onClick(item);
        }
    };

    useKeyboardNavigation({
        onUp: () => nextOrPrev(-1),
        onDown: () => nextOrPrev(+1),
        onEnter: () => {
            const section = sections.find(section => section.key === focusedSectionKey);
            if (!section) {
                return;
            }

            const item = section.items.find(item => item.key === focusedItemKey);
            if (!item) {
                return;
            }

            onItemClick(item);
        },
        onEscape: reset,
    }, keyboardNavigationRef);

    React.useEffect(reset, [sections]);

    const className = classNames(styles.container, useElevationClassName(elevation));

    return (
        <div className={className}>
            {sections.map(section => (
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
                            onClick={onItemClick}
                        />
                    ))}
                </section>
            ))}
        </div>
    );
};

Menu.defaultProps = {
    sections: [],
    elevation: 2,
};

export default Menu;
