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
            key:item.id,
            onClick: item.onClick,
            isActive: item.isActive,
            isOpen: item.isOpen,
            icon: item.icon,
            navigationChildren: item.navigationChildren,
        };
        switch (item.type) {
            case 'child':
                return <NavigationChild {...itemProps} {...customProps} />;
            case 'section':
                return <NavigationSection {...itemProps} {...customProps} />;
            case 'grouping':
                return <NavigationGrouping {...itemProps} {...customProps} />;
            case 'label':
                return <NavigationLabel {...itemProps} {...customProps} />;
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
