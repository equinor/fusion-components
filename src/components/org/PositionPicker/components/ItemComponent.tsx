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

    return (
        <div className={styles.cardContainer}>
            <div className={styles.positionName}>
                {item.position.externalId} - {item.position.name}
            </div>
            <div className={styles.assignedPersonName}>
                {activeInstance && activeInstance.assignedPerson
                    ? activeInstance.assignedPerson.name
                    : 'TNB'}
            </div>
        </div>
    );
};

export default ItemComponent;
