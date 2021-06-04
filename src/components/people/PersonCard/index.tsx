import { useMemo, useState, useEffect } from 'react';
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
    useComponentDisplayClassNames,
    useComponentDisplayType,
    ComponentDisplayType,
} from '@equinor/fusion';
import { getDefaultPerson } from '../utils';
import PersonDetail from '../PersonDetail';
import { SkeletonBar } from '../../feedback/Skeleton';
import usePeopleDetails from '../usePeopleDetails';
import usePresence from '../usePresence';

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
    const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
    const id = personId ? personId : person ? person.azureUniqueId : '';
    const { isFetching, error, personDetails } = usePeopleDetails(
        person ? { person } : { id: personId }
    );
    const { presence } = usePresence(id, isPopoverOpen);
    const displayType = useComponentDisplayType();
    const shouldDisplayEmail = useMemo(
        () => !inline || (inline && displayType === ComponentDisplayType.Comfortable),
        [displayType, inline]
    );

    const containerClassNames = classNames(styles.container, useComponentDisplayClassNames(styles));
    const nameClassNames = classNames(styles.name, {
        [styles.noMargin]: !shouldDisplayEmail,
    });

    const [popoverRef, isOpen] = usePopoverRef<HTMLDivElement>(
        <PersonDetail person={personDetails} presence={presence} />,
        {
            justify: 'start', // start = "left" | middle = "center" | end = "right"
            placement: 'below', // start = "top" | middle = "center" | end = "bottom"
        },
        true,
        500
    );

    useEffect(() => {
        if (isOpen) {
            setIsPopoverOpen(true);
        } else {
            setIsPopoverOpen(false);
        }
    }, [isOpen]);

    if (isFetching) {
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
            {personDetails && (
                <div className={containerClassNames}>
                    <PersonPhoto person={personDetails} size={photoSize} hidePopover />
                    <div className={styles.details}>
                        <div className={nameClassNames}>{personDetails.name}</div>
                        {showJobTitle && (
                            <div className={styles.jobTitle}> {personDetails.jobTitle}</div>
                        )}
                        {shouldDisplayEmail && (
                            <div className={styles.email}>
                                <a href={`mailto:${personDetails.mail}`}>{personDetails.mail}</a>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
