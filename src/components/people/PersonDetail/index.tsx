import React, { useEffect } from 'react';
import styles from './styles.less';
import { PersonDetails, usePersonDetails, PersonPresence, useApiClients } from '@equinor/fusion';
import { useState } from 'react';
import {
    PersonPhoto,
    useTooltipRef,
    AccountTypeIcon,
    PersonPresenceIcon,
    CloseCircleIcon,
} from '@equinor/fusion-components';
/* import AccountTypeIcon from '../PersonPhoto/AccountTypeIcon';
import PersonPresenceIcon from '../PersonPhoto/PersonPresenceIcon'; */
import PersonPositionCard from '../PersonPositionCard';

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
    positions: [
        {
            id: 'string',
            name: 'string',
            obs: 'string',
            project: {
                id: 'string',
                name: 'string',
                domainId: 'string',
                type: 'string',
            },
            basePosition: {
                id: 'string',
                name: 'string',
                discipline: 'string',
            },
            appliesFrom: new Date('2021-09-27T00:00:00'),
            appliesTo: new Date('2022-01-26T00:00:00'),
            workload: 100,
        },
    ],
});

export default ({ personId, person }: PersonDetailProps) => {
    const [currentPerson, setCurrentPerson] = useState<PersonDetails>(getDefaultPerson());
    const [presence, setPresence] = useState<PersonPresence | null>(null);
    const [isFetchingPresence, setIsFetchingPresence] = useState<boolean>(false);
    const [presenceError, setPresenceError] = useState<Error | null>(null);
    const apiClients = useApiClients();

    const personNameTooltip = useTooltipRef('Name: ' + currentPerson.name, 'below');
    const presenceTooltip = useTooltipRef(
        presence && presence.availability
            ? 'Presence: ' + presence.availability
            : 'Presence: Unknown',
        'below'
    );
    const jobTitleTooltip = useTooltipRef('Jobtitle: ' + currentPerson.jobTitle, 'below');
    const departmentNameTool = useTooltipRef('Deprtment: ' + currentPerson.department, 'below');
    const accountTypeTooltip = useTooltipRef('Account type: ' + currentPerson.accountType, 'below');
    const personMailToltip = useTooltipRef('Mail: ' + currentPerson.mail, 'below');
    const phoneNumberTooltip = useTooltipRef('Phone number: ' + currentPerson.mobilePhone, 'below');
    const officeLocationTooltip = useTooltipRef(
        'Office location: ' + currentPerson.officeLocation,
        'below'
    );

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

    console.log(currentPerson.positions, personDetails.positions);

    console.log(person);

    return (
        <>
            {currentPerson && (
                <>
                    <div className={styles.personDetails}>
                        <div className={styles.detailsContainer}>
                            <div className={styles.personName} ref={personNameTooltip}>
                                {currentPerson.name}
                            </div>
                            <div className={styles.presenceSection} ref={presenceTooltip}>
                                {presence && (
                                    <div className={styles.iconContainer}>
                                        <PersonPresenceIcon
                                            presence={presence.availability}
                                            size="xlarge"
                                        />
                                    </div>
                                )}
                                {presence ? (
                                    presence.availability
                                ) : (
                                    <>
                                        <div className={styles.presenceUnknown}>
                                            <CloseCircleIcon />
                                        </div>
                                        {'Unknown'}
                                    </>
                                )}
                            </div>
                            <div className={styles.detailSection}>
                                <div ref={jobTitleTooltip}>{currentPerson.jobTitle}</div>
                                <div ref={departmentNameTool}>{currentPerson.department}</div>
                                <div className={styles.accountTypeSection} ref={accountTypeTooltip}>
                                    {/*         <div className={styles.iconContainer}>
                                        <AccountTypeIcon
                                            currentPerson={currentPerson}
                                            hideTooltip
                                            size="large"
                                        />
                                    </div>
                                    {currentPerson.accountType} */}
                                </div>
                            </div>
                            <div className={styles.detailSection}>
                                <div ref={personMailToltip}>
                                    <a href={`mailto:${currentPerson.mail}`}>
                                        {currentPerson.mail}
                                    </a>
                                </div>
                                <div ref={phoneNumberTooltip}>{currentPerson.mobilePhone}</div>
                                <div ref={officeLocationTooltip}>
                                    {currentPerson.officeLocation}
                                </div>
                            </div>
                        </div>
                        <div className={styles.imageContainer}>
                            <PersonPhoto person={currentPerson} hidePopover size="xlarge" />
                        </div>
                    </div>
                    <>
                        {currentPerson.positions && (
                            <div className={styles.personPositions}>
                                {currentPerson.positions.map((p) => (
                                    <div className={styles.personPositions}>
                                        <PersonPositionCard position={p} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                </>
            )}
        </>
    );
};
