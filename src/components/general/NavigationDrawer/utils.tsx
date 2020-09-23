import React from 'react';
import {
    NavigationChild,
    NavigationSection,
    NavigationGrouping,
    NavigationLabel,
} from './components';
import { NavigationStructure } from '.';

export const getNavigationComponentForItem = (structure?: NavigationStructure[], customProps?) => {
    if (!structure) {
        return null;
    }
    return structure.map(item => {
        const itemProps = {
            title: item.title,
            id: item.id,
            onClick: item.onClick,
            isActive: item.isActive,
            isOpen: item.isOpen,
            icon: item.icon,
            navigationChildren: item.navigationChildren,
            aside: item.aside,
            isDisabled: item.isDisabled
        };
        switch (item.type) {
            case 'child':
                return (
                    <NavigationChild navigationItem={itemProps} {...customProps} key={item.id} />
                );
            case 'section':
                return (
                    <NavigationSection navigationItem={itemProps} {...customProps} key={item.id} />
                );
            case 'grouping':
                return (
                    <NavigationGrouping navigationItem={itemProps} {...customProps} key={item.id} />
                );
            case 'label':
                return (
                    <NavigationLabel navigationItem={itemProps} {...customProps} key={item.id} />
                );
            default:
                return null;
        }
    });
};

export const toggleOpenById = (id: string, structure: NavigationStructure): NavigationStructure => {
    if (structure.id === id) {
        return {
            ...structure,
            isOpen: !structure.isOpen,
        };
    }
    if (structure.navigationChildren) {
        return {
            ...structure,
            navigationChildren: structure.navigationChildren.map(child =>
                toggleOpenById(id, child)
            ),
        };
    }
    return structure;
};

export const toggleActiveById = (
    id: string,
    structure: NavigationStructure
): NavigationStructure => {
    if (structure.navigationChildren) {
        return {
            ...structure,
            isActive: structure.id === id,
            navigationChildren: structure.navigationChildren.map(child =>
                toggleActiveById(id, child)
            ),
        };
    }
    return {
        ...structure,
        isActive: structure.id === id,
    };
};

export const toggleOpenByChildId = (
    id: string,
    structure: NavigationStructure
): NavigationStructure => {
    if (hasChildById(id, structure) && structure.navigationChildren) {
        if (structure.id === id) {
            return structure;
        }
        return {
            ...structure,
            isOpen: true,
            navigationChildren: structure.navigationChildren.map(child =>
                toggleOpenByChildId(id, child)
            ),
        };
    }
    return structure;
};

const hasChildById = (id: string, structure: NavigationStructure): boolean => {
    if (structure.id === id) {
        return true;
    }
    if (structure.navigationChildren) {
        const children = structure.navigationChildren.map(item => hasChildById(id, item));
        return children.some(child => child);
    }
    return false;
};

export const hasActive = (structure: NavigationStructure): boolean => {
    if (structure.isActive) {
        return true;
    }
    if (structure.navigationChildren) {
        const children = structure.navigationChildren.map(item => hasActive(item));
        return children.some(active => active);
    }
    return false;
};
