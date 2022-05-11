import { useCallback, FC } from 'react';

import { useStyles } from './PersonPositionCard.style';
import { PersonPosition, formatDate, useComponentDisplayClassNames } from '@equinor/fusion';
import classNames from 'classnames';
import { useTooltipRef } from '@equinor/fusion-components';

type PersonPositionCardProps = {
    position: PersonPosition;
};
const PersonPositionCard: FC<PersonPositionCardProps> = ({ position }) => {
    const styles = useStyles();
    const containerClassNames = classNames(styles.container, useComponentDisplayClassNames(styles));

    const projectNameTooltip = useTooltipRef('Project: ' + position.project.name, 'below');
    const positionNameTooltip = useTooltipRef('Position: ' + position.name, 'below');
    const periodTooltip = useTooltipRef('Position period', 'below');

    return (
        <div className={containerClassNames}>
            <div ref={projectNameTooltip} className={styles.projectName}>
                {position.project.name}
            </div>
            <div ref={positionNameTooltip} className={styles.personPosition}>
                {position.name}
            </div>
            <div ref={periodTooltip} className={styles.period}>
                {position.appliesFrom ? formatDate(position.appliesFrom) : 'N/A'}
                {' - '}
                {position.appliesTo ? formatDate(position.appliesTo) : 'N/A'} ({position.workload}%)
            </div>
        </div>
    );
};

export default PersonPositionCard;
