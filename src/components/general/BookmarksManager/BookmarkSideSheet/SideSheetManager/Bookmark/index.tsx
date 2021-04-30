import { BookmarkListResponse, useNotificationCenter } from '@equinor/fusion';
import { SortIcon, ShareIcon, useTooltipRef, PersonPhoto } from '@equinor/fusion-components';
import { Dispatch, SetStateAction, useState } from 'react';
import useBookmarkContext from '../../../hooks/useBookmarkContext';
import { BookmarkView } from '../../../types';
import Options from './Options';
import styles from './styles.less';

type BookmarkProps = {
    bookmark: BookmarkListResponse;
    accordionOpen: boolean;
    onViewChange: (view: BookmarkView) => void;
    setEditBookmark: Dispatch<SetStateAction<BookmarkListResponse>>;
    onClose: () => void;
};
function Bookmark({
    bookmark,
    accordionOpen,
    onViewChange,
    setEditBookmark,
    onClose,
}: BookmarkProps) {
    const [isDescriptionOpen, setIsDescriptionOpen] = useState<boolean>(false);

    const { store } = useBookmarkContext();
    const bookmarkRef = useTooltipRef('Shared', 'below');
    const createNotification = useNotificationCenter();

    const handleDelete = async () => {
        const response = await createNotification({
            level: 'high',
            title: `Remove bookmark ${bookmark.name}`,
            confirmLabel: 'Remove',
            cancelLabel: 'Cancel',
            body: bookmark.isShared
                ? 'By removing this bookmark, it will also be removed from the people you have shared it with.'
                : 'Are you sure you want to delete this bookmark?',
        });
        if (!response.confirmed) return;

        try {
            store.deleteBookmark(bookmark.appKey, bookmark.id);
        } catch (e) {}
    };
    const handleRemove = () => {
        try {
            store.unFavouriteBookmark(bookmark.appKey, bookmark.id);
        } catch (e) {}
    };
    const handleSharing = async (share: boolean) => {
        try {
            store.updateBookmark(bookmark.id, {
                isShared: share,
            });
        } catch (e) {}

        if (share) {
            await createNotification({
                level: 'high',
                title: 'Copied to clipboard',
                confirmLabel: 'Close',
                cancelLabel: null,
                body: `This URL has been copied: ${window.location.href}/${bookmark.id}`,
            });
        }
    };
    const handleEdit = () => {
        setEditBookmark(bookmark);
        onViewChange('Editing');
    };
    const handleApply = () => {
        onClose();
        store.applyBookmark(bookmark.id);
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
                            <PersonPhoto personId={bookmark.createdBy.azureUniqueId} />
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
                    onRemove={handleRemove}
                    accordionOpen={accordionOpen}
                    bookmarkInfo={{
                        createdBy: bookmark.createdBy,
                        isShared: bookmark.isShared,
                    }}
                />
                <div className={styles.content}>
                    <div className={styles.link} onClick={handleApply}>
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
