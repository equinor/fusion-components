import React, { useEffect } from 'react';
import styles from './styles.less';
import { PersonDetails, usePersonDetails } from '@equinor/fusion';
import { useState } from 'react';

export type PersonDetailProps = {
    personId?: string;
    person?: PersonDetails;
};

const getDefaultPerson = (): PersonDetails => ({
    azureUniqueId: 'string',
    name: 'No person assigned',
    mail: 'noname@equinor.com',
    jobTitle: 'www',
    department: 'string',
    mobilePhone: 'string',
    officeLocation: 'string',
    upn: 'string',
    accountType: 'Employee',
    company: { id: 'id', name: 'name' },
});

export default ({ personId, person }: PersonDetailProps) => {
    const [currentPerson, setCurrentPerson] = useState<PersonDetails>(getDefaultPerson());

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

    return (
        <>
            {currentPerson && (
                <div className={styles.personDetails}>
                    <div>{currentPerson.name}</div>
                    <div className={styles.jobTitle}>{currentPerson.jobTitle}</div>
                    <div>{currentPerson.department}</div>
                    <div className={styles.contactInfo}>
                        <div>
                            <a href={`mailto:${currentPerson.mail}`}>{currentPerson.mail}</a>
                        </div>
                        <div>{currentPerson.mobilePhone}</div>
                        <div>{currentPerson.officeLocation}</div>
                    </div>
                </div>
            )}
        </>
    );
};
