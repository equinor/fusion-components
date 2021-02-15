import { useNotificationCenter } from '@equinor/fusion';
import { Button, TextInput } from '@equinor/fusion-components';
import { useState, useCallback, FC } from 'react';

import styles from './../styles.less';

type NewBookmarkProps = {
    contextName: string;
    onCancel: () => void;
    onSave: (name: string) => Promise<void>;
};
const NewBookmark: FC<NewBookmarkProps> = ({ contextName, onCancel, onSave }) => {
    const [name, setName] = useState<string>('');
    const createNotification = useNotificationCenter();

    const updateName = useCallback((newName: string) => setName(newName), []);

    const saveBookmark = useCallback(async () => {
        try {
            await onSave(name);
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
    }, [name]);

    const clearAndCancel = useCallback(() => {
        setName('');
        onCancel();
    }, [onCancel]);

    return (
        <div className={styles.container}>
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
                <span className={styles.itemLabel}>Context</span>
                <span className={styles.itemContent}>{contextName}</span>
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
};

export default NewBookmark;
