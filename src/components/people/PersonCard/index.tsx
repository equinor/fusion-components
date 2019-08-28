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
    const detailsClassNames = classNames(styles.details, useComponentDisplayClassNames(styles));
    const nameClassNames = classNames(styles.name, useComponentDisplayClassNames(styles));
    const emailClassNames = classNames(styles.email, useComponentDisplayClassNames(styles));

    return (
        <div className={containerClassNames}>
            <PersonPhoto personId={currentPerson.azureUniqueId} size={photoSize} />
            <div className={detailsClassNames}>
                <div className={nameClassNames}>{currentPerson.name}</div>
                <div className={emailClassNames}>
                    <a href={`mailto:${currentPerson.mail}`}>{currentPerson.mail}</a>
                </div>
            </div>
        </div>
    );
};
