import React from "react";
import * as styles from "./styles.less";
import { PersonDetails, PersonRole } from "@equinor/fusion";
import sortRoles from "./SortRoles";
import RoleItem from "./RoleItem";

export type ClaimableRolesProps = {
    personDetails: PersonDetails,
};

const ClaimableRoles: React.FC<ClaimableRolesProps> = ({ personDetails }: ClaimableRolesProps) => {
    if (!personDetails || !personDetails.roles || !personDetails.roles.length) {
        return (
            <div className={styles.container}>
                <p>You do not have any roles.</p>;
            </div>
        );
    }

    return (
        <div className={styles.container}>
            {personDetails.roles
                .filter((role: PersonRole) => role.onDemandSupport)
                .sort((a: PersonRole, b: PersonRole) => sortRoles(a, b))
                .map((role: PersonRole) => (
                    <RoleItem key={role.name} role={role} showSwitch />
                ))}
        </div>
    );
};

export default ClaimableRoles;
