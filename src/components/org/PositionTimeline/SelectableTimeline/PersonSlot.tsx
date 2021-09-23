import { PersonPhoto } from '@equinor/fusion-components';
import { FC } from 'react';
import { PersonSlotProps, TimelineSplit } from '../model';

const _customElementsDefine = window.customElements.define;
window.customElements.define = (name, cl, conf) => {
    if (!customElements.get(name)) {
        _customElementsDefine.call(window.customElements, name, cl, conf);
    } else {
        console.debug(`${name} has been defined twice`);
    }
};

export const PersonSlot: FC<PersonSlotProps<TimelineSplit>> = ({ item }) => {
    return <PersonPhoto personId={item?.assignedPerson?.azureUniqueId} size="small" />;
};
