import { useNotificationCenter } from '@equinor/fusion';
import { Button, TextInput } from '@equinor/fusion-components';
import * as React from 'react';
import * as styles from './../styles.less';

type NewBookmarkProps = {
    contextName: string;
    onCancel: () => void;
    onSave: (name: string) => Promise<void>;
};
const NewBookmark: React.FC<NewBookmarkProps> = ({ contextName, onCancel, onSave }) => {
    const [name, setName] = React.useState<string>('');
    const createNotification = useNotificationCenter();

    const updateName = React.useCallback((newName: string) => setName(newName), []);

    const saveBookmark = React.useCallback(async () => {
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

    const clearAndCancel = React.useCallback(() => {
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
