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

const Menu: React.FC<MenuProps> = props => {
    const [focusedSectionKey, setFocusedSectionKey] = React.useState<string | null>(props.sections.length ? props.sections[0].key : null);
    const [focusedItemKey, setFocusedItemKey] = React.useState<string | null>(props.sections.length && props.sections[0].items.length ? props.sections[0].items[0].key : null);

    const nextOrPrev = (direction: number) => {
        const sectionIndex = props.sections.findIndex(section => section.key === focusedSectionKey);
        let nextSectionIndex = sectionIndex;

        if (sectionIndex === -1) {
            nextSectionIndex = direction === -1 ? props.sections.length - 1 : 0;
        }

        const items = props.sections[nextSectionIndex].items;

        const itemIndex = items.findIndex(item => item.key === focusedItemKey);
        let nextItemIndex = itemIndex;

        if (nextItemIndex === -1) {
            nextSectionIndex = direction === -1 ? props.sections.length - 1 : 0;
            nextItemIndex = direction === -1 ? props.sections[nextSectionIndex].items.length - 1 : 0;
        } else if (nextItemIndex === 0 && direction === -1) {
            nextSectionIndex += (sectionIndex + props.sections.length - 1) % props.sections.length;
        } else if (nextItemIndex === items.length - 1 && direction === 1) {
            nextSectionIndex += (sectionIndex + props.sections.length + 1) % props.sections.length;
        } else {
            nextItemIndex += direction;
        }

        const nextSection = props.sections[nextSectionIndex];

        setFocusedSectionKey(nextSection.key);
        setFocusedItemKey(nextSection.items[nextItemIndex].key);

        if(nextSection.items[nextItemIndex].isDisabled) {
            nextOrPrev(direction);
        }
    };

    const reset = () => {
        setFocusedSectionKey(props.sections.length ? props.sections[0].key : null);
        setFocusedItemKey(props.sections.length && props.sections[0].items.length ? props.sections[0].items[0].key : null);
    };

    const onClick = item => {
        if (props.onClick) {
            props.onClick(item);
        }
    };

    useKeyboardNavigation({
        onUp: () => nextOrPrev(-1),
        onDown: () => nextOrPrev(+1),
        onEnter: () => {
            const section = props.sections.find(section => section.key === focusedSectionKey);
            if (!section) {
                return;
            }

            const item = section.items.find(item => item.key === focusedItemKey);
            if (!item) {
                return;
            }

            onClick(item);
        },
        onEscape: reset,
    }, props.keyboardNavigationRef);

    React.useEffect(reset, [props.sections]);

    const className = classNames(styles.container, useElevationClassName(props.elevation));

    return (
        <div className={className}>
            {props.sections.map(section => (
                <section key={section.key}>
                    {section.items.map((item, index) => (
                        <MenuItem
                            key={item.key}
                            index={index}
                            isFocused={
                                focusedSectionKey === section.key && focusedItemKey === item.key
                            }
                            item={item}
                            onClick={onClick}
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
