import * as React from 'react';
import { PersonPresence, PhotoSize } from '.';
import classNames from 'classnames';
import * as styles from './styles.less';
import { useComponentDisplayClassNames } from '@equinor/fusion';
import {
    useTooltipRef,
    CheckCircleIcon,
    CloseCircleIcon,
    ScheduleIcon,
} from '@equinor/fusion-components';

type PersonPresenceProps = {
    presence: PersonPresence;
    size: PhotoSize;
};

const resolveToolTip = (presence: PersonPresence) => {
    switch (presence) {
        case 'available':
            return 'Available';
        case 'busy':
            return 'Busy';
        case 'away':
            return 'Away';
        case 'doNotDisturb':
            return 'Do not disturb';
        default:
            return presence;
    }
};

const PersonPresenceBadge: React.FC<PersonPresenceProps> = ({ presence, size }) => {
    const presenceClasses = classNames(
        styles.presenceContainer,
        useComponentDisplayClassNames(styles),
        styles[size],
        styles[presence]
    );

    const presenceRef = useTooltipRef(resolveToolTip(presence));
    return (
        <div className={presenceClasses} ref={presenceRef}>
            {presence === 'available' && <CheckCircleIcon />}
            {presence === 'away' && <ScheduleIcon />}
            {presence === 'offline' && <CloseCircleIcon />}
        </div>
    );
};

export default PersonPresenceBadge;
