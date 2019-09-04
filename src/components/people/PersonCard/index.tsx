import React, { useState, useEffect } from 'react';
import { PersonPhoto, PhotoSize } from '@equinor/fusion-components';
import classNames from 'classnames';
import styles from './styles.less';
import { PersonDetails, usePersonDetails, useComponentDisplayClassNames } from '@equinor/fusion';
import { getDefaultPerson } from '../utils';

export { PhotoSize };

export type PersonCardProps = {
    personId?: string;
    person?: PersonDetails;
    photoSize?: PhotoSize;
};

export default ({ personId, person, photoSize = 'xlarge' }: PersonCardProps) => {
    const [currentPerson, setCurrentPerson] = useState<PersonDetails>(getDefaultPerson());
    const [error, _, personDetails] = personId ? usePersonDetails(personId) : [null, false, person];

    useEffect(() => {
        if (!error && personDetails) {
            setCurrentPerson(personDetails);
        } else if (error) {
            setCurrentPerson(getDefaultPerson());
        }
    }, [error, personDetails]);

    const containerClassNames = classNames(styles.container, useComponentDisplayClassNames(styles));

    return (
        <div className={containerClassNames}>
            <PersonPhoto personId={currentPerson.azureUniqueId} size={photoSize} />
            <div className={styles.details}>
                <div className={styles.name}>{currentPerson.name}</div>
                <div className={styles.email}>
                    <a href={`mailto:${currentPerson.mail}`}>{currentPerson.mail}</a>
                </div>
            </div>
        </div>
    );
};
