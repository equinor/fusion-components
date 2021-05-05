import { BookmarkListResponse, BookmarkPatchRequest, useNotificationCenter } from '@equinor/fusion';
import { Button, TextInput } from '@equinor/fusion-components';
import { useCallback, useState } from 'react';
import styles from './styles.less';
type BookmarkFormProps = {
    contextName?: string;
    onCancel: () => void;
    onSave?: (name: string, description: string) => Promise<void>;
    onEditSave?: (bookmarkId: string, bookmarkRequest: BookmarkPatchRequest) => Promise<void>;
    bookmark?: BookmarkListResponse;
};
export const BookmarkForm = ({
    contextName,
    onCancel,
    onSave,
    bookmark,
    onEditSave,
}: BookmarkFormProps): JSX.Element => {
    const [name, setName] = useState<string>(bookmark?.name ? bookmark.name : '');
    const [description, setDescription] = useState<string>(
        bookmark?.description ? bookmark.description : ''
    );

    const createNotification = useNotificationCenter();

    const updateName = useCallback((newName: string) => setName(newName), []);

    const updateDescription = useCallback(
        (newDescription: string) => setDescription(newDescription),
        []
    );

    const saveBookmark = useCallback(async () => {
        try {
            await onSave!(name, description);
            createNotification({
                level: 'low',
                title: 'New bookmark was added',
            });
            setName('');
        } catch (e) {
            createNotification({
                level: 'high',
                title: 'Unable to create new notification',
            });
        }
    }, [name, description, onSave, createNotification]);

    const saveEditBookmark = useCallback(async () => {
        try {
            await onEditSave!(bookmark!.id, { name, description });
            createNotification({
                level: 'low',
                title: 'Bookmark was successfully edited',
            });
            setName('');
        } catch (e) {
            createNotification({
                level: 'high',
                title: 'Unable to create new notification',
            });
        }
    }, [name, description, bookmark, createNotification, onEditSave]);

    const clearAndCancel = useCallback(() => {
        setName('');
        onCancel();
    }, [onCancel]);

    return (
        <div className={styles.container}>
            <div className={styles.newItem}>
                <span className={styles.itemLabel}>Context</span>
                <div className={styles.itemContent}>{contextName && contextName}</div>
            </div>
            <div className={styles.newItem}>
                <span className={styles.itemLabel}>Name</span>
                <div className={styles.itemContent}>
                    <TextInput
                        onChange={updateName}
                        value={name}
                        placeholder="Name your bookmark"
                    />
                </div>
            </div>
            <div className={styles.newItem}>
                <span className={styles.itemLabel}>Description</span>
                <div className={styles.itemContent}>
                    <TextInput
                        onChange={updateDescription}
                        value={description}
                        placeholder="Optional description, helpful when shared"
                    />
                </div>
            </div>
            <div className={styles.newItemAction}>
                <div className={styles.cancel}>
                    <Button outlined onClick={clearAndCancel}>
                        Cancel
                    </Button>
                </div>
                <div className={styles.save}>
                    <Button
                        primary
                        onClick={bookmark ? saveEditBookmark : saveBookmark}
                        disabled={name.length === 0}
                    >
                        Save
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default BookmarkForm;
