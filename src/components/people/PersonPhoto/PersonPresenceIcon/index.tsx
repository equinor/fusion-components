import * as React from 'react';
import classNames from 'classnames';
import * as styles from './styles.less';
import { useComponentDisplayClassNames, PersonPresenceAvailability } from '@equinor/fusion';
import {
    useTooltipRef,
    CheckCircleIcon,
    CloseCircleIcon,
    ScheduleIcon,
    PhotoSize,
} from '@equinor/fusion-components';

type PersonPresenceProps = {
    presence: PersonPresenceAvailability;
    size: PhotoSize;
};

const PersonPresenceIcon: React.FC<PersonPresenceProps> = ({ presence, size }) => {
    const presenceClasses = classNames(
        styles.presenceContainer,
        useComponentDisplayClassNames(styles),
        styles[size],
        styles[presence.toLowerCase()]
    );

    const presenceRef = useTooltipRef(presence);
    return (
        <div className={presenceClasses} ref={presenceRef}>
            {presence === 'Online' && <CheckCircleIcon />}
            {(presence === 'IdleBusy' || presence === 'BeRightBack') && <ScheduleIcon />}
            {(presence === 'Offline' || presence === 'None') && <CloseCircleIcon />}
        </div>
    );
};

export default PersonPresenceIcon;
