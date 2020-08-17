import React, { useCallback, useState } from 'react';
import { useCurrentUser, usePersonDetails, PersonDetails, PersonRole } from '@equinor/fusion';
import { Spinner, Tab, Tabs } from '@equinor/fusion-components';
import PermanentRoles from './PermanentRoles';
import ClaimableRoles from './ClaimableRoles';

export default () => {
    const currentUser = useCurrentUser();
    const { personDetails, isFetching } =
        currentUser != null ? usePersonDetails(currentUser.id) : null;
    const [activeTabKey, setActiveTabKey] = useState('claimable');

    const changeTabKey = useCallback((tabKey: string) => {
        setActiveTabKey(tabKey);
    }, []);

    const userHasClaimableRoles = useCallback(
        (person: PersonDetails) => {
            if (person && person.roles) {
                return person.roles.some((role: PersonRole) => role.onDemandSupport);
            }
            return false;
        },
        [personDetails]
    );
    if (!personDetails) {
        return null;
    }
    if (isFetching) {
        return <Spinner centered />;
    }

    return userHasClaimableRoles(personDetails) ? (
        <Tabs activeTabKey={activeTabKey} onChange={changeTabKey}>
            <Tab tabKey="claimable" title="Claimable">
                <ClaimableRoles personDetails={personDetails} />
            </Tab>
            <Tab tabKey="all" title="Permanent">
                <PermanentRoles personDetails={personDetails} />
            </Tab>
        </Tabs>
    ) : (
        <PermanentRoles personDetails={personDetails} />
    );
};
