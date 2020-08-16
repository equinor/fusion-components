import * as React from 'react';
import * as styles from './styles.less';
import { Tabs, Tab } from '@equinor/fusion-components';
import { useCurrentPersonDetails } from '@equinor/fusion';
import PersonPositionCards from './PersonPositionCards';
import { sortPositionsByTo, filterPositionsByDate, isPositionsPast } from './helpers';

const MyPositions: React.FC = () => {
    const [activeTabKey, setActiveTabKey] = React.useState('active-positions');
    const { personDetails } = useCurrentPersonDetails();
    const positionsSortedByTo = sortPositionsByTo(personDetails.positions);

    const activePositions = React.useMemo(
        () => filterPositionsByDate(positionsSortedByTo, new Date()),
        [positionsSortedByTo, filterPositionsByDate]
    );

    const pastPositions = React.useMemo(
        () => positionsSortedByTo.filter((position) => isPositionsPast(position, new Date())),
        [positionsSortedByTo, isPositionsPast]
    );

    return (
        <Tabs activeTabKey={activeTabKey} onChange={setActiveTabKey}>
            <Tab tabKey="active-positions" title="Active positions">
                <div className={styles.container}>
                    <PersonPositionCards positions={activePositions} />
                </div>
            </Tab>
            <Tab tabKey="past-positions" title="Past positions">
                <div className={styles.container}>
                    <PersonPositionCards positions={pastPositions} />
                </div>
            </Tab>
        </Tabs>
    );
};

export default MyPositions;
