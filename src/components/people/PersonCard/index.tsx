import React from 'react';
import { PersonPhoto, PhotoSize } from '@equinor/fusion-components';
import classNames from 'classnames';
import styles from './styles.less';

export { PhotoSize };

export type PersonCardProps = {
    personId: string;
    personName: string;
    email: string;
    photoSize: PhotoSize;
};

export default ({ personId, personName, email, photoSize }: PersonCardProps) => {
    return (
        <div className={classNames(styles.container)}>
            <PersonPhoto personId={personId} size={photoSize} />
            <div className={classNames(styles.details)}>
                <div className={classNames(styles.name)}>{personName}</div>
                <div className={classNames(styles.email)}>
                    <a href={`mailto:${email}`}>{email}</a>
                </div>
            </div>
        </div>
    );
};
