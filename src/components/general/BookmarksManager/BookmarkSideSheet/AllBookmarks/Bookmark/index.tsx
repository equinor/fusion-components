import {
    BookmarkListResponse,
    useCurrentUser,
    useHistory,
    useNotificationCenter,
} from '@equinor/fusion';
import { SortIcon, ShareIcon, useTooltipRef, PersonPhoto } from '@equinor/fusion-components';
import { useState } from 'react';
import { ApplyBookmark } from '../../..';
import useBookmarkContext from '../../../hooks/useBookmarkContext';

import Options from './Options';
import styles from './styles.less';

type BookmarkProps<TPayload> = {
    bookmark: BookmarkListResponse;
    applyBookmark: (bookmarkSetting: ApplyBookmark<TPayload>) => Promise<void>;
    accordionOpen: boolean;
    setBookmarkState: any;
    setEditBookmark: any;
};
function Bookmark<T>({
    bookmark,
    applyBookmark,
    accordionOpen,
    setBookmarkState,
    setEditBookmark,
}: BookmarkProps<T>) {
    const [isDescriptionOpen, setIsDescriptionOpen] = useState<boolean>(false);
    const { store } = useBookmarkContext();
    const bookmarkRef = useTooltipRef('Shared', 'below');
    const createNotification = useNotificationCenter();
    const history = useHistory();

    const handleDelete = async () => {
        const response = await createNotification({
            level: 'high',
            title: `Remove bookmark ${bookmark.name}`,
            confirmLabel: 'Remove',
            cancelLabel: 'Cancel',
            body:
                'By removing this bookmark, it will also be removed from the people you have shared it with.',
        });
        if (!response.confirmed) return;

        try {
            store.deleteBookmark(bookmark.appKey, bookmark.id);
        } catch (e) {}
    };

    const handleSharing = async () => {
        try {
            store.updateBookmark(bookmark.id, {
                isShared: true,
            });
        } catch (e) {}
        await createNotification({
            level: 'high',
            title: 'Copied to clipboard',
            confirmLabel: 'Close',
            cancelLabel: null,
            body: `This URL has been copied: ${history.location.pathname}/${bookmark.id}`,
        });
    };

    const handleEdit = () => {
        setEditBookmark(bookmark);
        setBookmarkState('Editing');
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
            <div className={styles.accordionContainer}>
                <Options
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                    onShare={handleSharing}
                    accordionOpen={accordionOpen}
                    bookmarkInfo={{ bookmarkId: bookmark.id, isShared: bookmark.isShared }}
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
            <MoreDetails />
        </div>
    );
}

export default Bookmark;
