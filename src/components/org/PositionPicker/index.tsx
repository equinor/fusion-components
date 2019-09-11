import React, { useEffect, useState, useCallback } from 'react';
import {
    SearchableDropdownWrapper,
    SearchableDropdownOption,
    useTooltipRef,
    PositionCard,
    PersonPhoto,
} from '@equinor/fusion-components';
import { Position, PositionInstance } from '@equinor/fusion';
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
};

type ItemComponentProps = {
    item: { key: string, position: Position };
};

const ItemComponent: React.FC<ItemComponentProps> = ({ item }) => {
    const now = Date.now();
    const activeInstance = item.position.instances.find(
        i => now >= i.appliesFrom.getTime() && now <= i.appliesTo.getTime()
    );

    return (
        <div className={styles.cardContainer}>
            <div className={styles.positionDetails}>
                <div className={styles.positionName}>{item.position.name}</div>
                <div className={styles.assignedPersonName}>
                    {activeInstance && activeInstance.assignedPerson
                        ? activeInstance.assignedPerson.name
                        : 'TNB'}
                </div>
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

    return <PersonPhoto person={activeInstance ? activeInstance.assignedPerson : undefined} size="medium" />;
};


const PositionPicker = ({ initialPosition, selectedPosition, onSelect, projectId }: PositionPickerProps) => {
    const [options, setOptions] = useState<SearchableDropdownOption[]>([]);
    const [error, isFetching, filteredPositions, search] = usePositionQuery(projectId);
    const [searchQuery, setSearchQuery] = useState('');
    const [isInitialized, setInitialized] = useState(false);

    useEffect(() => {
        if (initialPosition && !isInitialized) {
            setOptions(singlePositionToDropdownOption(initialPosition, selectedPosition));
        }
    }, [isInitialized, initialPosition, selectedPosition]);

    useEffect(() => {
        search(searchQuery);
    }, [searchQuery]);

    useEffect(() => {
        if (isInitialized) {
            setOptions(positionsToDropdownOption(filteredPositions, selectedPosition));
        } else {
            setInitialized(searchQuery !== '');
        }
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
        <SearchableDropdownWrapper
            options={options}
            onSelect={handleSelect}
            itemComponent={ItemComponent}
            asideComponent={AsideComponent}
            onSearchAsync={setSearchQuery}
            label="Select position"
        />
    );
};

export default PositionPicker;
