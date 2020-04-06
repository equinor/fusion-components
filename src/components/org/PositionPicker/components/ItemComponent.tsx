import React from 'react';
import ItemComponentProps from './itemComponentProps';
import styles from '../styles.less';

const ItemComponent: React.FC<ItemComponentProps> = ({ item }) => {
    if (item.key === 'empty') {
        return <div>{item.title}</div>;
    }

    const now = Date.now();
    const activeInstance = item.position.instances.find(
        i => now >= i.appliesFrom.getTime() && now <= i.appliesTo.getTime()
    );

    const positionName = React.useMemo(() => {
        if (!item.position.externalId) {
            return item.position.name;
        }

        return `${item.position.externalId} - ${item.position.name}`;
    }, [item.position.externalId, item.position.name]);

    return (
        <div className={styles.cardContainer}>
            <div className={styles.positionName}>{positionName}</div>
            <div className={styles.assignedPersonName}>
                {activeInstance && activeInstance.assignedPerson
                    ? activeInstance.assignedPerson.name
                    : 'TNB'}
            </div>
        </div>
    );
};

export default ItemComponent;
