import { BookmarkListResponse, useNotificationCenter } from '@equinor/fusion';
import {
    SortIcon,
    AccordionItem,
    ShareIcon,
    useTooltipRef,
    Accordion,
    PersonPhoto,
    PersonDetail,
    NotificationBanner,
    NotificationDialog,
} from '@equinor/fusion-components';
import classNames from 'classnames';
import { useCallback, useState } from 'react';
import { ApplyBookmark } from '../../..';
import useBookmarks from '../../../useBookmarks';
import EditBookmark from './EditBookmark';
import Options from './Options';
import styles from './styles.less';
type BookmarkProps<TPayload> = {
    bookmark: BookmarkListResponse;
    applyBookmark: (bookmarkSetting: ApplyBookmark<TPayload>) => Promise<void>;
    accordionOpen: boolean;
};
function Bookmark<T>({ bookmark, applyBookmark, accordionOpen }: BookmarkProps<T>) {
    const createNotification = useNotificationCenter();
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isDescriptionOpen, setIsDescriptionOpen] = useState<boolean>(false);
    const enableEditing = useCallback(() => setIsEditing(true), []);
    const disableEditing = useCallback(() => setIsEditing(false), []);
    const bookmarkRef = useTooltipRef('Shared', 'below');

    const handleDelete = async () => {
        await createNotification({
            level: 'high',
            title: `Remove bookmark ${bookmark.name}`,
            confirmLabel: 'Remove',
            cancelLabel: 'Cancel',
            body:
                'By removing this bookmark, it will also be removed from the people you have shared it with.',
        });
    };

    const handleSharing = async () => {
        await createNotification({
            level: 'high',
            title: 'Coped to clipboard',
            confirmLabel: 'Close',
            cancelLabel: null,
            body: `This URL has been copied`,
        });
    };

    const MoreDetails = () => {
        if (isDescriptionOpen) {
            return (
                <div className={styles.detailsContainer}>
                    <div className={styles.description}>
                        {bookmark.description && bookmark.description}
                    </div>

                    <div className={styles.ownerContainer}>
                        <div className={styles.createdBy}>Created by</div>
                        <div className={styles.personDetailsContainer}>
                            <PersonPhoto personId={bookmark.createdBy.azureUniquePersonId} />
                            <div className={styles.personDetails}>
                                <div className={styles.creator}>{bookmark.createdBy.name}</div>

                                <div className={styles.creatorEmail}>
                                    {bookmark.createdBy.mail && (
                                        <a href={`mailto:${bookmark.createdBy.mail}`}>
                                            {bookmark.createdBy.mail}
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        return null;
    };
    return (
        <div className={styles.container}>
            {isEditing ? (
                <EditBookmark
                    name={bookmark.name}
                    description={bookmark.description}
                    onExit={disableEditing}
                    onSave={() => {}}
                />
            ) : (
                <div className={styles.accordionContainer}>
                    <Options
                        onDelete={handleDelete}
                        onEdit={enableEditing}
                        onShare={handleSharing}
                        accordionOpen={accordionOpen}
                        isShared={bookmark.isShared}
                    />
                    <div className={styles.content}>
                        <div className={styles.link} onClick={() => applyBookmark}>
                            {bookmark.name}
                        </div>
                    </div>
                    <div className={styles.sharedBookmark}>
                        {bookmark.isShared && (
                            <div className={styles.icon} ref={bookmarkRef}>
                                <ShareIcon />
                            </div>
                        )}
                    </div>
                    <div
                        className={styles.viewMore}
                        onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
                    >
                        <SortIcon direction={isDescriptionOpen ? 'asc' : 'desc'} />
                    </div>
                </div>
            )}

            <MoreDetails />
        </div>
    );
}

export default Bookmark;
