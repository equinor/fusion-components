import {
    FusionApiHttpErrorResponse,
    PersonRole,
    useCurrentUser,
    useFusionContext,
} from '@equinor/fusion';
import { Switch } from '@equinor/fusion-components';
import { useCallback, useMemo, useState, FC } from 'react';

import styles from './styles.less';
import { HttpClientRequestFailedError } from '@equinor/fusion/lib/http/HttpClient';
import classNames from 'classnames';

export type RoleSwitchProps = {
    role: PersonRole;
    showSwitch: boolean;
};

const expiresIn = (activeTo: string) => {
    const activeToDate = new Date(activeTo).getTime();
    const now = new Date().getTime();

    if (now > activeToDate) {
        return 'Expired';
    }

    return `Expires in ${Math.ceil(Math.abs(activeToDate - now) / 36e5)} hours`;
};

const RoleItem: FC<RoleSwitchProps> = ({ role, showSwitch }: RoleSwitchProps) => {
    const currentUser = useCurrentUser();
    const { peopleContainer } = useFusionContext();
    const [isActive, setIsActive] = useState<boolean>(role.isActive);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const toggleRoleStatus = useCallback(
        async (clickedRole: PersonRole) => {
            if (!currentUser) {
                return;
            }
            setIsActive((previous) => !previous);
            try {
                await peopleContainer.setRoleStatusForUser(
                    currentUser.id,
                    clickedRole.name,
                    !clickedRole.isActive
                );
                setErrorMessage('');
            } catch (e) {
                setIsActive((previous) => !previous);
                const error = e as HttpClientRequestFailedError<FusionApiHttpErrorResponse>;
                if (
                    error.statusCode === 400 ||
                    error.statusCode === 404 ||
                    error.statusCode === 403
                ) {
                    setErrorMessage(error.response.error.message);
                } else {
                    setErrorMessage('Something went wrong when toggling the role');
                }
            }
        },
        [role]
    );

    const errorClassNames = classNames(styles.small, { [styles.error]: errorMessage });

    const showExpireDate = useMemo(() => role.activeToUtc && showSwitch && !errorMessage, [
        role,
        showSwitch,
        errorMessage,
    ]);

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
                <div className={styles.small}>{role.name}</div>
                {showExpireDate && (
                    <div className={styles.small}>{expiresIn(role.activeToUtc)}</div>
                )}
                {errorMessage && <div className={errorClassNames}>{errorMessage}</div>}
            </div>
        </div>
    );
};

export default RoleItem;
