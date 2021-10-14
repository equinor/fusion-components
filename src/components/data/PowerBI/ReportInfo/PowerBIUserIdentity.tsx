import { FC } from 'react';

import { useCurrentUser } from '@equinor/fusion';

import styles from './styles.less';

type Props = { header?: string };

export const PowerBIInfoUserIdentity: FC<Props> = (props) => {
    const user = useCurrentUser();
    const header =
        props.header ||
        'Your identity does not meet this reports access requirements, your identity is:';
    return (
        <div className={styles.userIdentityContainer}>
            <h4>{header}</h4>
            <div className={styles.info}>
                <div className={styles.labels}>
                    <div>Username</div>
                    <div>GUID</div>
                    <div>Roles</div>
                    <div>Timestamp</div>
                    <div>Context</div>
                </div>
                <div className={styles.text}>
                    <div> {user?.upn} </div>
                    <div> {user?.id} </div>
                    <div>{user?.roles.toString()} </div>
                    <div> {new Date().toString()} </div>
                    <div> {window.location.href} </div>
                </div>
            </div>
        </div>
    );
};

export default PowerBIInfoUserIdentity;
