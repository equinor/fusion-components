import * as React from 'react';
import { Tabs, Tab, PersonPositionList } from '@equinor/fusion-components';
import { UserMenuComponentProps } from '@equinor/fusion';

const MyPositions: React.FC<UserMenuComponentProps> = ({ personDetails }) => {
    const [activeTabKey, setActiveTabKey] = React.useState('active-positions');
    const allPositions = React.useMemo(() => personDetails?.positions || [], [personDetails]);

    return (
        <Tabs activeTabKey={activeTabKey} onChange={setActiveTabKey}>
            <Tab tabKey="active-positions" title="Active positions">
                <PersonPositionList allPositions={allPositions} showPositions="active" />
            </Tab>
            <Tab tabKey="past-positions" title="Past positions">
                <PersonPositionList allPositions={allPositions} showPositions="past" />
            </Tab>
        </Tabs>
    );
};

export default MyPositions;
