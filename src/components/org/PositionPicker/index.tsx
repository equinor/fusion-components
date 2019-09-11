import React, { useEffect, useState, useCallback } from 'react';
import {
    SearchableDropdownWrapper,
    SearchableDropdownOption,
    useTooltipRef,
    PositionCard,
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
};

const ItemComponent = ({ item }) => {
    return (
        <div className={styles.cardContainer}>
            <PositionCard
                position={item.position}
                instance={item.position.instances[0]}
                showExternalId={false}
                showLocation={false}
                showDate={false}
            />
        </div>
    );
};

const PositionPicker = ({ initialPosition, onSelect, projectId }: PositionPickerProps) => {
    const [options, setOptions] = useState<SearchableDropdownOption[]>([]);
    const [error, isFetching, filteredPositions, search] = usePositionQuery(projectId);
    const [selectedPositionId, setSelectedPositionId] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [isInitialized, setInitialized] = useState(false);

    useEffect(() => {
        if (initialPosition && !isInitialized) {
            setOptions(singlePositionToDropdownOption(initialPosition));
        }
    }, [isInitialized, initialPosition]);

    useEffect(() => {
        search(searchQuery);
    }, [searchQuery]);

    useEffect(() => {
        if (isInitialized) {
            setOptions(positionsToDropdownOption(filteredPositions));
        } else {
            setInitialized(searchQuery !== '');
        }
    }, [filteredPositions, isFetching]);

    const handleSelect = useCallback(
        item => {
            setSelectedPositionId(item.key);

            if (onSelect) {
                onSelect(item.person);
            }
        },
        [onSelect]
    );

    return (
        <SearchableDropdownWrapper
            options={options}
            onSelect={handleSelect}
            itemComponent={ItemComponent}
            onSearchAsync={query => setSearchQuery(query)}
            label="Select position"
        />
    );
};

export default PositionPicker;
