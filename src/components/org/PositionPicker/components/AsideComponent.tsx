import { PersonPhoto } from '@equinor/fusion-components';
import ItemComponentProps from './itemComponentProps';
import { FC } from 'react';
import { usePositionPickerContext } from '../positionPickerContext';
import usePositionInstance from '../hooks/usePositionInstance';

const AsideComponent: FC<ItemComponentProps> = ({ item }) => {
    const { allowFuture, allowPast } = usePositionPickerContext();
    const { instance } = usePositionInstance(item.position?.instances, allowFuture, allowPast);

    if (item.key === 'empty') {
        return null;
    }

    return <PersonPhoto person={instance?.assignedPerson ?? undefined} size="medium" />;
};

export default AsideComponent;
