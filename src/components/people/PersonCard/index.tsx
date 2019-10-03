import React, { useState, useEffect } from 'react';
import { PersonPhoto, PhotoSize } from '@equinor/fusion-components';
import classNames from 'classnames';
import styles from './styles.less';
import {
    PersonDetails,
    usePersonDetails,
    useComponentDisplayClassNames,
    useComponentDisplayType,
    ComponentDisplayType,
} from '@equinor/fusion';
import { getDefaultPerson } from '../utils';

export { PhotoSize };

export type PersonCardProps = {
    personId?: string;
    person?: PersonDetails;
    photoSize?: PhotoSize;
    inline?: boolean;
};

export default ({ personId, person, inline, photoSize = 'xlarge' }: PersonCardProps) => {
    const [currentPerson, setCurrentPerson] = useState<PersonDetails>();
    const { error, personDetails } = personId
        ? usePersonDetails(personId)
        : { error: null, personDetails: person };

    useEffect(() => {
        if (!error && personDetails) {
            setCurrentPerson(personDetails);
        } else if (error) {
            setCurrentPerson(getDefaultPerson());
        }
    }, [error, personDetails]);

    const displayType = useComponentDisplayType();
    const shouldDisplayEmail = React.useMemo(
        () => !inline || (inline && displayType === ComponentDisplayType.Comfortable),
        [displayType, inline]
    );

    const containerClassNames = classNames(styles.container, useComponentDisplayClassNames(styles));
    const nameClassNames = classNames(styles.name, {
        [styles.noMargin]: !shouldDisplayEmail,
    });

    return (
        <>
            {currentPerson && (
                <div className={containerClassNames}>
                    <PersonPhoto person={currentPerson} size={photoSize} />
                    <div className={styles.details}>
                        <div className={nameClassNames}>{currentPerson.name}</div>
                        {shouldDisplayEmail && (
                            <div className={styles.email}>
                                <a href={`mailto:${currentPerson.mail}`}>{currentPerson.mail}</a>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};
