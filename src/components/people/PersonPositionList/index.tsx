import { useMemo, useCallback, FC } from 'react';

import styles from './styles.less';
import { PersonPosition } from '@equinor/fusion';
import PersonPositionCards from './PersonPositionCards';
import {
    sortPositionsByTo,
    getActivePositions,
    getFuturePositions,
    getPastPositions,
} from './helpers';

type PersonPositionListProps = {
    allPositions: PersonPosition[];
    showPositions: 'all' | 'future' | 'past' | 'active';
    filterByDate?: Date;
    disableOrgLink?: boolean;
};

const PersonPositionList: FC<PersonPositionListProps> = ({
    allPositions,
    showPositions,
    filterByDate,
    disableOrgLink,
}) => {
    const positionsSortedByTo = sortPositionsByTo(allPositions);

    const date = useMemo(() => filterByDate || new Date(), [filterByDate]);

    const getPersonPositions = useCallback(
        (positions: PersonPosition[]) => {
            switch (showPositions) {
                case 'active':
                    return getActivePositions(positions, date);
                case 'past':
                    return getPastPositions(positions, date);
                case 'future':
                    return getFuturePositions(positions, date);
                default:
                    return positions;
            }
        },
        [showPositions, date]
    );

    const personPositions = getPersonPositions(positionsSortedByTo);

    return (
        <div className={styles.container}>
            <PersonPositionCards positions={personPositions} disableOrgLink={disableOrgLink} />
        </div>
    );
};

export default PersonPositionList;
