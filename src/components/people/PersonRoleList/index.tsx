import React, { useMemo } from 'react';
import { PersonRole } from '@equinor/fusion';
import * as styles from './styles.less';
import RoleItem from './RoleItem';

type PersonRoleListProps = {
    roleType: 'permanent' | 'claimable';
    personRoles: PersonRole[];
};

const sortByDisplayName = (a: PersonRole, b: PersonRole) => {
    return a.displayName.localeCompare(b.displayName);
};

const PersonRoleList: React.FC<PersonRoleListProps> = ({ roleType, personRoles }) => {
    const roles = useMemo(
        () =>
            personRoles.filter((role) =>
                roleType === 'claimable' ? role.onDemandSupport : !role.onDemandSupport
            ),
        [personRoles, roleType]
    );

    const sortedRoles = useMemo(
        () => roles.sort((a: PersonRole, b: PersonRole) => sortByDisplayName(a, b)),
        [roles]
    );

    return (
        <div className={styles.container}>
            {sortedRoles.length <= 0 ? (
                <p>You do not have any roles.</p>
            ) : (
                sortedRoles.map((role: PersonRole) => (
                    <RoleItem
                        key={role.name}
                        role={role}
                        showSwitch={!!(roleType === 'claimable')}
                    />
                ))
            )}
            {}
        </div>
    );
};

export default PersonRoleList;
