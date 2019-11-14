import React, { useEffect, useState, useCallback } from 'react';
import {
    SearchableDropdown,
    SearchableDropdownOption,
    PersonPhoto,
} from '@equinor/fusion-components';
import { Position } from '@equinor/fusion';
import {
    singlePositionToDropdownOption,
    positionsToDropdownOption,
} from './positionToDropdownSection';
import usePositionQuery from './usePositionQuery';
import styles from './styles.less';

type PositionPickerProps = {
    initialPosition?: Position;
    onSelect?: (position: Position) => void;
    projectId: string;
    selectedPosition: Position | null;
    label?: string;
};

type ItemComponentProps = {
    item: { key: string; title: string; position: Position };
};

const ItemComponent: React.FC<ItemComponentProps> = ({ item }) => {
    if (item.key === 'empty') {
        return <div>{item.title}</div>;
    }

    const now = Date.now();
    const activeInstance = item.position.instances.find(
        i => now >= i.appliesFrom.getTime() && now <= i.appliesTo.getTime()
    );

    return (
        <div className={styles.cardContainer}>
            <div className={styles.positionName}>{item.position.externalId} - {item.position.name}</div>
            <div className={styles.assignedPersonName}>
                {activeInstance && activeInstance.assignedPerson
                    ? activeInstance.assignedPerson.name
                    : 'TNB'}
            </div>
        </div>
    );
};

const AsideComponent: React.FC<ItemComponentProps> = ({ item }) => {
    if (item.key === 'empty') {
        return null;
    }

    const now = Date.now();
    const activeInstance = item.position.instances.find(
        i => now >= i.appliesFrom.getTime() && now <= i.appliesTo.getTime()
    );

    return (
        <PersonPhoto
            person={activeInstance ? activeInstance.assignedPerson : undefined}
            size="medium"
        />
    );
};

const PositionPicker = ({
    initialPosition,
    selectedPosition,
    onSelect,
    projectId,
    label,
}: PositionPickerProps) => {
    const [options, setOptions] = useState<SearchableDropdownOption[]>([]);
    const [error, isFetching, filteredPositions, search] = usePositionQuery(projectId);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        if (initialPosition) {
            setOptions(
                singlePositionToDropdownOption(searchQuery, initialPosition, selectedPosition)
            );
        }
    }, [initialPosition, selectedPosition]);

    useEffect(() => {
        search(searchQuery);
    }, [searchQuery, isFetching]);

    useEffect(() => {
        setOptions(positionsToDropdownOption(searchQuery, filteredPositions, selectedPosition));
    }, [filteredPositions, isFetching, selectedPosition]);

    const handleSelect = useCallback(
        item => {
            if (onSelect) {
                onSelect(item.position);
            }
        },
        [onSelect]
    );

    return (
        <SearchableDropdown
            options={options}
            onSelect={handleSelect}
            itemComponent={ItemComponent}
            asideComponent={AsideComponent}
            onSearchAsync={setSearchQuery}
            label={label || 'Select position'}
        />
    );
};

export default PositionPicker;
