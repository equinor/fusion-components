import { Fragment } from 'react';

import styles from './styles.less';
import { PersonDetails, PersonPresence } from '@equinor/fusion';
import {
    PersonPhoto,
    PersonPresenceIcon,
    AccountTypeIcon,
    SkeletonBar,
} from '@equinor/fusion-components';

export type PersonDetailsProps = {
    person: PersonDetails;
    noPhoto?: boolean;
    presence: PersonPresence;
    isFetching: boolean;
    isFetchingPresence: boolean;
};
const PersonDetails = ({
    person,
    noPhoto,
    presence,
    isFetching,
    isFetchingPresence,
}: PersonDetailsProps): JSX.Element => {
    return (
        <Fragment>
            {person && (
                <div className={styles.personDetails}>
                    <div className={styles.detailsContainer}>
                        <div className={styles.personName}>
                            {isFetching ? <SkeletonBar /> : person.name}
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
                                <div>{person.jobTitle}</div>
                            )}
                            {isFetching ? (
                                <div>
                                    <SkeletonBar />
                                </div>
                            ) : (
                                <div>{person.department}</div>
                            )}
                        </div>
                        <div className={styles.accountTypeSection}>
                            {!isFetching && (
                                <div className={styles.iconContainer}>
                                    <AccountTypeIcon
                                        currentPerson={person}
                                        hideTooltip
                                        size="large"
                                    />
                                </div>
                            )}
                            {isFetching ? <SkeletonBar /> : person.accountType}
                        </div>

                        <div className={styles.detailSection}>
                            {isFetching ? (
                                <div>
                                    <SkeletonBar />
                                </div>
                            ) : (
                                <div>
                                    <a href={`mailto:${person.mail}`}>{person.mail}</a>
                                </div>
                            )}
                            {isFetching ? (
                                <div>
                                    <SkeletonBar />
                                </div>
                            ) : (
                                <div>{person.mobilePhone}</div>
                            )}
                            {isFetching ? (
                                <div>
                                    <SkeletonBar />
                                </div>
                            ) : (
                                <div>{person.officeLocation}</div>
                            )}
                        </div>
                    </div>
                    {!noPhoto && (
                        <div className={styles.imageContainer}>
                            <PersonPhoto person={person} hidePopover size="xlarge" />
                        </div>
                    )}
                </div>
            )}
        </Fragment>
    );
};

export default PersonDetails;
