import React from 'react';
import { PersonPhoto, Affiliation, PhotoSize } from '@equinor/fusion-components';
import classNames from 'classnames';
import styles from './styles.less';

export { Affiliation, PhotoSize };

export type PersonCardProps = {
    personId: string;
    personName: string;
    affiliation: Affiliation;
    email: string;
    photoSize: PhotoSize;
};

export default ({ personId, personName, affiliation, email, photoSize }: PersonCardProps) => {
    return (
        <div className={classNames(styles.container)}>
            <PersonPhoto personId={personId} affiliation={affiliation} size={photoSize} />
            <div className={classNames(styles.details)}>
                <div className={classNames(styles.name)}>{personName}</div>
                <div className={classNames(styles.email)}>
                    <a href={`mailto:${email}`}>{email}</a>
                </div>
            </div>
        </div>
    );
};
