import { useCallback, useEffect, useState, Fragment } from 'react';

import styles from './styles.less';
import { PersonDetails, PersonPresence, useApiClients } from '@equinor/fusion';
import {
    PersonPhoto,
    PersonPresenceIcon,
    AccountTypeIcon,
    SkeletonBar,
} from '@equinor/fusion-components';
import usePeopleDetails from '../usePeopleDetails';

export type PersonDetailProps = {
    personId?: string;
    person?: PersonDetails;
    noPhoto?: boolean;
};

export default ({ personId, person, noPhoto }: PersonDetailProps) => {
    const [currentPerson, setCurrentPerson] = useState<PersonDetails | null>(null);
    const [presence, setPresence] = useState<PersonPresence | null>(null);
    const [isFetchingPresence, setIsFetchingPresence] = useState<boolean>(false);
    const [presenceError, setPresenceError] = useState<Error | null>(null);
    const apiClients = useApiClients();

    const { error, personDetails, isFetching } = usePeopleDetails(personId, person);

    useEffect(() => {
        if (!error && personDetails) {
            setCurrentPerson(personDetails);
        }
    }, [error, personDetails]);

    const fetchPresenceStatus = useCallback(
        async (id: string) => {
            setIsFetchingPresence(true);
            setPresenceError(null);

            try {
                const response = await apiClients.people.getPresenceAsync(id);
                setPresence(response.data);
            } catch (e) {
                setPresenceError(e);
            } finally {
                setIsFetchingPresence(false);
            }
        },
        [apiClients]
    );

    useEffect(() => {
        if (currentPerson && currentPerson.azureUniqueId) {
            fetchPresenceStatus(currentPerson.azureUniqueId);
        }
    }, [currentPerson]);

    return (
        <Fragment>
            {currentPerson && (
                <div className={styles.personDetails}>
                    <div className={styles.detailsContainer}>
                        <div className={styles.personName}>
                            {isFetching ? <SkeletonBar /> : currentPerson.name}
                        </div>
                        <div className={styles.presenceSection}>
                            <div className={styles.iconContainer}>
                                <PersonPresenceIcon
                                    presenceAvailability={presence?.availability}
                                    size="xlarge"
                                />
                            </div>
                            {!!currentPerson.inactive ? 'Inactive Account' : presence?.availability || 'Unknown'}
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
                    {!noPhoto && (
                        <div className={styles.imageContainer}>
                            <PersonPhoto person={currentPerson} hidePopover size="xlarge" />
                        </div>
                    )}
                </div>
            )}
        </Fragment>
    );
};
