import { useMemo, FC } from 'react';

import { PersonRole } from '@equinor/fusion';
import { useStyles } from './PersonRoleList.style';
import RoleItem from './RoleItem';

type PersonRoleListProps = {
    roleType: 'permanent' | 'claimable';
    personRoles: PersonRole[];
};

const sortByDisplayName = (a: PersonRole, b: PersonRole) => {
    return a.displayName.localeCompare(b.displayName);
};

const PersonRoleList: FC<PersonRoleListProps> = ({ roleType, personRoles }) => {
    const styles = useStyles();
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
            { }
        </div>
    );
};

export default PersonRoleList;
