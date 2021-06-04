import { useEffect, useState, Fragment } from 'react';

import styles from './styles.less';
import { PersonDetails, PersonPresence } from '@equinor/fusion';
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
    presence?: PersonPresence;
};

export default ({ personId, person, noPhoto, presence }: PersonDetailProps) => {
    const { personDetails, isFetching } = usePeopleDetails(person ? { person } : { id: personId });

    return (
        <Fragment>
            {personDetails && (
                <div className={styles.personDetails}>
                    <div className={styles.detailsContainer}>
                        <div className={styles.personName}>
                            {isFetching ? <SkeletonBar /> : personDetails.name}
                        </div>
                        <div className={styles.presenceSection}>
                            <div className={styles.iconContainer}>
                                <PersonPresenceIcon
                                    presenceAvailability={presence?.availability}
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
                                <div>{personDetails.jobTitle}</div>
                            )}
                            {isFetching ? (
                                <div>
                                    <SkeletonBar />
                                </div>
                            ) : (
                                <div>{personDetails.department}</div>
                            )}
                        </div>
                        <div className={styles.accountTypeSection}>
                            {!isFetching && (
                                <div className={styles.iconContainer}>
                                    <AccountTypeIcon
                                        currentPerson={personDetails}
                                        hideTooltip
                                        size="large"
                                    />
                                </div>
                            )}
                            {isFetching ? <SkeletonBar /> : personDetails.accountType}
                        </div>

                        <div className={styles.detailSection}>
                            {isFetching ? (
                                <div>
                                    <SkeletonBar />
                                </div>
                            ) : (
                                <div>
                                    <a href={`mailto:${personDetails.mail}`}>
                                        {personDetails.mail}
                                    </a>
                                </div>
                            )}
                            {isFetching ? (
                                <div>
                                    <SkeletonBar />
                                </div>
                            ) : (
                                <div>{personDetails.mobilePhone}</div>
                            )}
                            {isFetching ? (
                                <div>
                                    <SkeletonBar />
                                </div>
                            ) : (
                                <div>{personDetails.officeLocation}</div>
                            )}
                        </div>
                    </div>
                    {!noPhoto && (
                        <div className={styles.imageContainer}>
                            <PersonPhoto person={personDetails} hidePopover size="xlarge" />
                        </div>
                    )}
                </div>
            )}
        </Fragment>
    );
};
