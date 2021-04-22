import { useNotificationCenter } from '@equinor/fusion';
import { Button, TextInput } from '@equinor/fusion-components';
import { useCallback, useState } from 'react';
import styles from './styles.less';
type NewBookmarkProps = {
    contextName: string;
    onCancel: () => void;
    onSave: (name: string, description: string) => Promise<void>;
};
function NewBookmark({ contextName, onCancel, onSave }: NewBookmarkProps) {
    const createNotification = useNotificationCenter();

    const [name, setName] = useState<string>('');
    const updateName = useCallback((newName: string) => setName(newName), []);
    const [description, setDescription] = useState<string>('');
    const updateDescription = useCallback(
        (newDescription: string) => setDescription(newDescription),
        []
    );

    const saveBookmark = useCallback(async () => {
        try {
            await onSave(name, description);
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
    }, [name, description]);

    const clearAndCancel = useCallback(() => {
        setName('');
        onCancel();
    }, [onCancel]);
    return (
        <div className={styles.container}>
            <div className={styles.newItem}>
                <span className={styles.itemLabel}>Context</span>
                <div className={styles.itemContent}>{contextName}</div>
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
                        placeholder="Give your bookmark a description"
                    />{' '}
                </div>
            </div>
            <div className={styles.newItemAction}>
                <div className={styles.cancel}>
                    <Button outlined onClick={clearAndCancel}>
                        Cancel
                    </Button>
                </div>
                <div className={styles.save}>
                    <Button primary onClick={saveBookmark} disabled={name.length === 0}>
                        Save
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default NewBookmark;
