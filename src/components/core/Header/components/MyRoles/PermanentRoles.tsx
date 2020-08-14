import React from "react";
import { PersonDetails, PersonRole } from "@equinor/fusion";
import RoleItem from "./RoleItem";
import * as styles from "./styles.less";
import sortRoles from "./SortRoles";

export type PermanentRolesProps = {
    personDetails: PersonDetails,
};

const permanentRoles: React.FC<PermanentRolesProps> = ({ personDetails }: PermanentRolesProps) => {
    if (!personDetails || !personDetails.roles || !personDetails.roles.length) {
        return (
            <div className={styles.container}>
                <p>You do not have any roles.</p>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            {personDetails.roles
                .filter((role: PersonRole) => !role.onDemandSupport)
                .sort((a: PersonRole, b: PersonRole) => sortRoles(a, b))
                .map((role: PersonRole) => (
                    <RoleItem key={role.name} role={role} showSwitch={false} />
                ))}
        </div>
    );
};

export default permanentRoles;
