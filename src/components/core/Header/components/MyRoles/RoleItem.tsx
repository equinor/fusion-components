import {
    FusionApiHttpErrorResponse,
    PersonRole,
    useCurrentUser,
    useFusionContext,
} from "@equinor/fusion";
import { Switch } from "@equinor/fusion-components";
import React, { useCallback, useState } from "react";
import * as styles from "./styles.less";
import { HttpClientRequestFailedError } from "@equinor/fusion/lib/http/HttpClient";
import classNames from "classnames";
import moment from "moment";

export type RoleSwitchProps = {
    role: PersonRole;
    showSwitch: boolean;
}

const expiresIn = (activeTo: string) => {
    const activeToUtc = moment.utc(activeTo);
    const nowUtc = moment.utc();

    if (activeToUtc.isBefore(nowUtc)) {
        return 'Expired';
    }

    return 'Expires in ' + moment.duration(activeToUtc.diff(nowUtc)).humanize();
}

const RoleItem: React.FC<RoleSwitchProps> = ({ role, showSwitch }: RoleSwitchProps) => {
    const currentUser = useCurrentUser();
    const { peopleContainer } = useFusionContext();
    const [isActive, setIsActive] = useState<boolean>(role.isActive);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const toggleRoleStatus = useCallback(
        async (clickedRole: PersonRole) => {
            if (!currentUser) {
                return;
            }
            setIsActive(previous => !previous);
            try {
                await peopleContainer.setRoleStatusForUser(
                    currentUser.id,
                    clickedRole.name,
                    !clickedRole.isActive
                );
                setErrorMessage("");
            } catch (e) {
                setIsActive(previous => !previous);
                const error = e as HttpClientRequestFailedError<FusionApiHttpErrorResponse>;
                if (
                    error.statusCode === 400 ||
                    error.statusCode === 404 ||
                    error.statusCode === 403
                ) {
                    setErrorMessage(error.response.error.message);
                } else {
                    setErrorMessage("Something went wrong when toggling the role");
                }
            }
        },
        [role]
    );

    const errorClassNames = classNames(styles.small, { [styles.error]: errorMessage });

    return (
        <div key={role.name} className={styles.roleManagementContainer}>
            <div className={styles.row}>
                <div>{role.displayName}</div>
                {role.onDemandSupport && showSwitch && (
                    <div>
                        <Switch
                            active={isActive}
                            disabled={!role.onDemandSupport}
                            onChange={() => toggleRoleStatus(role)}
                        />
                    </div>
                )}
            </div>
            <div className={styles.row}>
                <div className={styles.small}>
                    {role.name}
                </div>
                {role.activeToUtc && showSwitch && !errorMessage && (
                    <div className={styles.small}>
                        {expiresIn(role.activeToUtc)}
                    </div>
                )}
                {errorMessage && <div className={errorClassNames}>{errorMessage}</div>}
            </div>
        </div>
    );
};

export default RoleItem;
