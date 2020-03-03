import React from 'react';
import { PersonPhoto } from '@equinor/fusion-components';
import ItemComponentProps from './itemComponentProps';

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
            person={
                activeInstance && activeInstance.assignedPerson
                    ? activeInstance.assignedPerson
                    : undefined
            }
            size="medium"
        />
    );
};

export default AsideComponent;
