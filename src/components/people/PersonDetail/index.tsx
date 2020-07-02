import React, { useEffect } from 'react';
import styles from './styles.less';
import { PersonDetails, usePersonDetails, PersonPresence, useApiClients } from '@equinor/fusion';
import { useState } from 'react';
import SkeletonBar from 'components/feedback/Skeleton/Bar';
import PersonPresenceIcon from '../PersonPhoto/PersonPresenceIcon';
import PersonPhoto, { AccountTypeIcon } from '../PersonPhoto';

export type PersonDetailProps = {
    personId?: string;
    person?: PersonDetails;
};

export default ({ personId, person }: PersonDetailProps) => {
    const [currentPerson, setCurrentPerson] = useState<PersonDetails | null>(null);
    const [presence, setPresence] = useState<PersonPresence | null>(null);
    const [isFetchingPresence, setIsFetchingPresence] = useState<boolean>(false);
    const [presenceError, setPresenceError] = useState<Error | null>(null);
    const apiClients = useApiClients();

    const { error, personDetails, isFetching } = personId
        ? usePersonDetails(personId)
        : { error: null, personDetails: person, isFetching: false };

    useEffect(() => {
        if (!error && personDetails) {
            setCurrentPerson(personDetails);
        }
    }, [error, personDetails]);

    const fetchPresenceStatus = React.useCallback(
        async (mail: string) => {
            setIsFetchingPresence(true);
            setPresenceError(null);

            try {
                const response = await apiClients.people.getPresenceAsync(mail, '1.0-preview');
                setPresence(response.data);
            } catch (e) {
                setPresenceError(e);
            } finally {
                setIsFetchingPresence(false);
            }
        },
        [apiClients]
    );

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
                        <div className={styles.personName}>
                            {isFetching ? <SkeletonBar /> : currentPerson.name}
                        </div>
                        <div className={styles.presenceSection}>
                            <div className={styles.iconContainer}>
                                <PersonPresenceIcon
                                    presence={presence?.availability || 'None'}
                                    size="xlarge"
                                />
                            </div>
                            {presence?.availability || 'Unknown'}
                        </div>
                        <div className={styles.detailSection}>
                            {isFetching ? (
                                <div>
                                    <SkeletonBar />
                                </div>
                            ) : (
                                <div>{currentPerson.jobTitle}</div>
                            )}
                            {isFetching ? (
                                <div>
                                    <SkeletonBar />
                                </div>
                            ) : (
                                <div>{currentPerson.department}</div>
                            )}
                        </div>
                        <div className={styles.accountTypeSection}>
                            {!isFetching && (
                                <div className={styles.iconContainer}>
                                    <AccountTypeIcon
                                        currentPerson={currentPerson}
                                        hideTooltip
                                        size="large"
                                    />
                                </div>
                            )}
                            {isFetching ? <SkeletonBar /> : currentPerson.accountType}
                        </div>

                        <div className={styles.detailSection}>
                            {isFetching ? (
                                <div>
                                    <SkeletonBar />
                                </div>
                            ) : (
                                <div>
                                    <a href={`mailto:${currentPerson.mail}`}>
                                        {currentPerson.mail}
                                    </a>
                                </div>
                            )}
                            {isFetching ? (
                                <div>
                                    <SkeletonBar />
                                </div>
                            ) : (
                                <div>{currentPerson.mobilePhone}</div>
                            )}
                            {isFetching ? (
                                <div>
                                    <SkeletonBar />
                                </div>
                            ) : (
                                <div>{currentPerson.officeLocation}</div>
                            )}
                        </div>
                    </div>
                    <div className={styles.imageContainer}>
                        <PersonPhoto person={currentPerson} hidePopover size="xlarge" />
                    </div>
                </div>
            )}
        </>
    );
};
