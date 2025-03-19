import ItemComponentProps from './itemComponentProps';
import { useStyles } from '../itemComponentStyle';
import { useMemo, FC } from 'react';
import { usePositionPickerContext } from '../positionPickerContext';
import usePositionInstance from '../hooks/usePositionInstance';

const ItemComponent: FC<ItemComponentProps> = ({ item }) => {
    const styles = useStyles();
    const { allowFuture, allowPast } = usePositionPickerContext();
    const { instance } = usePositionInstance(item.position?.instances, allowFuture, allowPast);

    if (item.key === 'empty') {
        return <div>{item.title}</div>;
    }

    const positionName = useMemo(() => {
        if (!item.position.externalId) {
            return item.position.name;
        }

        return `${item.position.externalId} - ${item.position.name}`;
    }, [item.position.externalId, item.position.name]);

    return (
        <div className={styles.cardContainer}>
            <div className={styles.positionName}>{positionName}</div>
            <div className={styles.personName}>
                {instance?.assignedPerson ? instance.assignedPerson.name : 'TNB'}
            </div>
        </div>
    );
};

export default ItemComponent;
