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
    RemoveCircleIcon,
    CircleIcon
} from '@equinor/fusion-components';

type PersonPresenceProps = {
    presenceAvailability: PersonPresenceAvailability;
    size: PhotoSize;
};

const PersonPresenceIcon: React.FC<PersonPresenceProps> = ({ presenceAvailability, size }) => {
    const presenceClasses = classNames(
        styles.presenceContainer,
        useComponentDisplayClassNames(styles),
        styles[size],
        styles[presenceAvailability?.toLowerCase()]
    );

    const presenceIcon = React.useMemo(() => {
        if (presenceAvailability === 'Available' || presenceAvailability === 'AvailableIdle') {
            return <CheckCircleIcon />;
        }
        if (presenceAvailability === 'Away' || presenceAvailability === 'BeRightBack') {
            return <ScheduleIcon />;
        }
        if (presenceAvailability === 'Busy' || presenceAvailability === 'BusyIdle') {
            return <CircleIcon />
        }
        if (presenceAvailability === 'DoNotDisturb') {
            return <RemoveCircleIcon />
        }
        return <CloseCircleIcon />;
    }, [presenceAvailability, size]);

    const presenceRef = useTooltipRef(presenceAvailability);

    return (
        <div className={presenceClasses} ref={presenceRef}>
            {presenceIcon}
        </div>
    );
};

export default PersonPresenceIcon;
