import React, { useCallback, useState } from 'react';
import { useCurrentUser, usePersonDetails } from '@equinor/fusion';
import { Tab, Tabs, PersonRoleList } from '@equinor/fusion-components';
import { UserMenuComponentProps } from '@equinor/fusion';

const MyRoles: React.FC<UserMenuComponentProps> = () => {
    const currentUser = useCurrentUser();
    const { personDetails } = currentUser != null ? usePersonDetails(currentUser.id) : null;
    const [activeTabKey, setActiveTabKey] = useState('claimable');

    const changeTabKey = useCallback((tabKey: string) => {
        setActiveTabKey(tabKey);
    }, []);

    const roles = React.useMemo(() => personDetails?.roles || [], [personDetails]);

    return (
        <Tabs activeTabKey={activeTabKey} onChange={changeTabKey}>
            <Tab tabKey="claimable" title="Claimable">
                <PersonRoleList personRoles={roles} roleType="claimable" />
            </Tab>
            <Tab tabKey="all" title="Permanent">
                <PersonRoleList personRoles={roles} roleType="permanent" />
            </Tab>
        </Tabs>
    );
};

export default MyRoles;
