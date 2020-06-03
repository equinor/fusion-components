import * as React from 'react';
import { PhotoSize } from '.';
import classNames from 'classnames';
import * as styles from './styles.less';
import { useComponentDisplayClassNames, PersonPresenceAvailability } from '@equinor/fusion';
import {
    useTooltipRef,
    CheckCircleIcon,
    CloseCircleIcon,
    ScheduleIcon,
} from '@equinor/fusion-components';

type PersonPresenceProps = {
    presence: PersonPresenceAvailability;
    size: PhotoSize;
};

const PersonPresenceBadge: React.FC<PersonPresenceProps> = ({ presence, size }) => {
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
            {(presence === 'IdleBusy' || presence === 'BeRightBack' || presence === 'Away') && (
                <ScheduleIcon />
            )}
            {(presence === 'Offline' || presence === 'None') && <CloseCircleIcon />}
        </div>
    );
};

export default PersonPresenceBadge;
