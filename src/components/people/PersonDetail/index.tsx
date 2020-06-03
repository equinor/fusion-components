import React, { useEffect } from 'react';
import styles from './styles.less';
import { PersonDetails, usePersonDetails, PersonPresence, useApiClients } from '@equinor/fusion';
import { useState } from 'react';
import { PersonPhoto } from '@equinor/fusion-components';

export type PersonDetailProps = {
    personId?: string;
    person?: PersonDetails;
};

const getDefaultPerson = (): PersonDetails => ({
    azureUniqueId: 'string',
    name: 'No person assigned',
    mail: '',
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
    const [presence, setPresence] = useState<PersonPresence | null>(null);
    const [isFetchingPresence, setIsFetchingPresence] = useState<boolean>(false);
    const [presenceError, setPresenceError] = useState<Error | null>(null);

    const apiClients = useApiClients();

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

    const fetchPresenceStatus = React.useCallback(async (mail: string) => {
        setIsFetchingPresence(true);
        setPresenceError(null);

        try {
            const response = await apiClients.people.getPresenceAsync(mail, '1.0-preview');
            setPresence(response.data);
        } catch (e) {
            console.log(e);
            setPresenceError(e);
        } finally {
            setIsFetchingPresence(false);
        }
    }, []);

    React.useEffect(() => {
        if (currentPerson && currentPerson.mail) {
            fetchPresenceStatus(currentPerson.mail);
        }
    }, [currentPerson]);

    return (
        <>
            {currentPerson && (
                <div className={styles.personDetails}>
                    <div className={styles.detailsContainer}>
                        <div className={styles.personName}>{currentPerson.name}</div>
                        <div>{presence ? presence.availability : 'Unknown'}</div>
                        <div className={styles.detailSection}>
                            <div>{currentPerson.jobTitle}</div>
                            <div>{currentPerson.department}</div>
                        </div>
                        <div className={styles.detailSection}>
                            <div>
                                <a href={`mailto:${currentPerson.mail}`}>{currentPerson.mail}</a>
                            </div>
                            <div>{currentPerson.mobilePhone}</div>
                            <div>{currentPerson.officeLocation}</div>
                        </div>
                    </div>
                    <div className={styles.imageContainer}>
                        <PersonPhoto
                            person={currentPerson}
                            hidePopover
                            presenceStatus={presence ? presence.availability : undefined}
                            size="xlarge"
                        />
                    </div>
                </div>
            )}
        </>
    );
};
