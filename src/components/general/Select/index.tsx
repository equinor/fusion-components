import React, { useState, useCallback, useEffect, useMemo } from 'react';
import {
    DropdownArrow,
    Menu,
    Dropdown,
    useDropdownController,
} from '@equinor/fusion-components';
import styles from './styles.less';
import classNames from 'classnames';

export type SelectOption = {
    title: string;
    key: string;
    isSelected?: boolean;
    isDisabled?: boolean;
};

export type SelectSection = {
    key: string;
    title?: string;
    items: SelectOption[];
};

type SelectProps = {
    options?: SelectOption[];
    sections?: SelectSection[];
    placeholder?: string;
    onSelect?: (item: SelectOption) => void;
    selectedComponent?: any;
    dropdownMaxHeight?: number;
    disabled?: boolean;
};

const createSingleSectionFromOptions = (
    options: SelectOption[]
): SelectSection[] => [{ key: 'DropdownSection', items: options }];

const mergeDropdownSectionItems = (sections: SelectSection[]) =>
    sections.reduce(
        (acc: SelectOption[], curr: SelectSection) =>
            acc.concat(curr.items),
        []
    );

const Select = ({
    options,
    sections,
    placeholder,
    onSelect,
    dropdownMaxHeight,
    disabled = false,
}: SelectProps) => {
    if ((!options && !sections) || (options && sections)) {
        throw new Error("You must supply only one of 'options', 'sections' props");
    }

    const [dropdownSections, setDropdownSections] = useState<SelectSection[]>([]);

    useEffect(() => {
        if (sections) {
            setDropdownSections(sections);
        } else if (options) {
            setDropdownSections(createSingleSectionFromOptions(options));
        }
    }, [options, sections]);

    const dropdownController = useDropdownController((ref, isOpen, setIsOpen) => {
        const selectedItem = useMemo(() => {
            const mergedItems = mergeDropdownSectionItems(dropdownSections);
            const selectedItem = mergedItems.find((option) => option.isSelected === true);
            return selectedItem;
        }, [dropdownSections]);

        const [focus, setFocus] = React.useState(false);
        useEffect(() => {
            if (isOpen && !disabled) {
                setFocus(true);
            } else {
                setFocus(false);
            }
        }, [isOpen, disabled]);

        const handleClick = React.useCallback(() => {
            if (!isOpen && !disabled) {
                setIsOpen(true)
            } else {
                setIsOpen(false);
            }

        }, [isOpen, disabled])

        const selectContentClasses = classNames(styles.selectContent, {
            [styles.focus]: focus,
            [styles.disabled]: disabled,
        });

        return (
            <span className={styles.selectContainer}
                onClick={handleClick}
            >
                <div className={selectContentClasses}>
                    {selectedItem ? selectedItem.title : placeholder}
                    <DropdownArrow cursor="pointer" isOpen={isOpen} />
                </div>
            </span>
        );
    });

    const { isOpen, setIsOpen } = dropdownController;
    const select = useCallback(
        (item) => {
            onSelect && onSelect(item);
            if (isOpen) {
                setIsOpen(false);
            }
        },
        [isOpen, onSelect]
    );

    const containerRef = dropdownController.controllerRef as React.MutableRefObject<HTMLDivElement | null>;

    return (
        <div ref={containerRef}>
            <Dropdown controller={dropdownController}>
                <div
                    className={styles.menuContainer}
                    style={dropdownMaxHeight ? { maxHeight: `${dropdownMaxHeight}px` } : {}}
                >
                    <Menu
                        elevation={0}
                        onClick={select}
                        sections={dropdownSections}
                    />
                </div>
            </Dropdown>
        </div>
    );
};

export default Select;
