import { BookmarkListResponse, useNotificationCenter } from '@equinor/fusion';
import { SortIcon, useTooltipRef, PersonPhoto, Button } from '@equinor/fusion-components';
import { useState } from 'react';
import useBookmarkContext from '../../../hooks/useBookmarkContext';
import { BookmarkView } from '../../../types';
import Options from './Options';
import styles from './styles.less';
// TODO: replace with FusionIcon
import '@equinor/fusion-wc-icon';

type BookmarkProps = {
    bookmark: BookmarkListResponse;
    accordionOpen: boolean;
    onViewChange: (view: BookmarkView) => void;
    setEditBookmark: (bookmark: BookmarkListResponse) => void;
    onClose: () => void;
};
export const Bookmark = ({
    bookmark,
    accordionOpen,
    onViewChange,
    setEditBookmark,
    onClose,
}: BookmarkProps): JSX.Element => {
    const [isDescriptionOpen, setIsDescriptionOpen] = useState<boolean>(false);

    const { store } = useBookmarkContext();
    const bookmarkRef = useTooltipRef('Shared', 'below');
    const createNotification = useNotificationCenter();

    const bookmarkShareUrl = () => {
        const base = `${window.location.origin}/apps/${bookmark.appKey}`;

        if (bookmark.context) return `${base}/${bookmark.context.id}?bookmarkId=${bookmark.id}`;
        else return `${base}/?bookmarkId=${bookmark.id}`;
    };

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

        store.deleteBookmark(bookmark.appKey, bookmark.id);
    };

    const handleRemove = () => {
        store.unFavouriteBookmark(bookmark.appKey, bookmark.id);
    };

    const handleEdit = () => {
        setEditBookmark(bookmark);
        onViewChange('Editing');
    };

    const handleApply = () => {
        onClose();
        store.applyBookmark(bookmark.id);
    };

    function ShareBody() {
        return (
            <>
                <div>This URL has been copied:</div>
                <div className={styles.shareContainer}>
                    <div className={styles.inputContainer}>
                        <input
                            type="text"
                            readOnly
                            value={bookmarkShareUrl()}
                            onFocus={(e) => e.target.select()}
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.buttonContainer}>
                        <Button
                            outlined
                            onClick={() => navigator.clipboard.writeText(bookmarkShareUrl())}
                        >
                            Copy
                        </Button>
                    </div>
                </div>
            </>
        );
    }

    const handleSharing = async (share: boolean) => {
        if (share) {
            navigator.clipboard.writeText(bookmarkShareUrl());
            createNotification({
                level: 'high',
                title: 'Copied to clipboard',
                confirmLabel: 'Close',
                hideCancelAction: true,
                body: <ShareBody />,
            });

            store.updateBookmark(bookmark.id, {
                isShared: share,
            });
        } else {
            const response = await createNotification({
                level: 'high',
                title: `Unshare bookmark: '${bookmark.name}`,
                confirmLabel: 'Unshare',
                cancelLabel: 'Cancel',
                body: 'By unsharing this bookmark, it will also be removed from the people you have shared it with.',
            });
            if (!response.confirmed) return;

            store.updateBookmark(bookmark.id, {
                isShared: share,
            });
        }
    };

    function MoreDetails() {
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
                                <div>{bookmark.createdBy.name}</div>

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
    }
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
                            <fwc-icon icon="share" />
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
};

export default Bookmark;
