import React, { useState, useEffect } from 'react';
import {
    PersonPhoto,
    PhotoSize,
    usePopoverRef,
    PersonPicker,
    styling,
} from '@equinor/fusion-components';
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
import PersonDetail from '../PersonDetail';
import { SkeletonBar } from '../../feedback/Skeleton';

export { PhotoSize };

export type PersonCardProps = {
    personId?: string;
    person?: PersonDetails;
    photoSize?: PhotoSize;
    inline?: boolean;
    hidePopover?: boolean;
    showJobTitle?: boolean;
    isFetchingPerson?: boolean;
};

export default ({
    personId,
    person,
    inline,
    photoSize = 'xlarge',
    hidePopover,
    showJobTitle,
    isFetchingPerson,
}: PersonCardProps) => {
    const [currentPerson, setCurrentPerson] = useState<PersonDetails>();
    const { isFetching, error, personDetails } = personId
        ? usePersonDetails(personId)
        : { isFetching: isFetchingPerson, error: null, personDetails: person };

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

    const [popoverRef, isOpen] = usePopoverRef<HTMLDivElement>(
        <PersonDetail person={currentPerson} />,
        {
            justify: 'start', // start = "left" | middle = "center" | end = "right"
            placement: 'below', // start = "top" | middle = "center" | end = "bottom"
        },
        true,
        500
    );

    if (isFetchingPerson) {
        return (
            <div className={containerClassNames}>
                <PersonPhoto size={photoSize} />
                <div className={styles.details}>
                    <div className={nameClassNames}>
                        {showJobTitle ? (
                            <SkeletonBar height={styling.grid(1.5)} />
                        ) : (
                            <SkeletonBar />
                        )}
                    </div>
                    {showJobTitle && (
                        <div className={styles.jobTitle}>
                            <SkeletonBar height={styling.grid(1.5)} />
                        </div>
                    )}
                    <div>
                        {showJobTitle ? (
                            <SkeletonBar height={styling.grid(1.5)} />
                        ) : (
                            <SkeletonBar />
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div ref={hidePopover ? undefined : popoverRef}>
            {currentPerson && (
                <div className={containerClassNames}>
                    <PersonPhoto person={currentPerson} size={photoSize} hidePopover />
                    <div className={styles.details}>
                        <div className={nameClassNames}>{currentPerson.name}</div>
                        {showJobTitle && (
                            <div className={styles.jobTitle}> {currentPerson.jobTitle}</div>
                        )}
                        {shouldDisplayEmail && (
                            <div className={styles.email}>
                                <a href={`mailto:${currentPerson.mail}`}>{currentPerson.mail}</a>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
