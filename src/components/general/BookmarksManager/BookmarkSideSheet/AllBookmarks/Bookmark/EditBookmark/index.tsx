import { IconButton, SaveIcon, CloseIcon, TextInput } from '@equinor/fusion-components';
import { useCallback, useState } from 'react';
import styles from './styles.less';

type EditBookmarkProps = {
    name: string;
    description: string;
    onExit: () => void;
    onSave: (newName: string, newDescription: string) => void;
};
function EditBookmark({ name, description, onExit, onSave }: EditBookmarkProps) {
    const [bookmarkName, setBookmarkName] = useState<string>(name);
    const updateBookmarkName = useCallback((newName: string) => setBookmarkName(newName), []);
    const [bookmarkDescription, setBookmarkDescription] = useState<string>(description);

    const updateBookmarkDescription = useCallback(
        (newDescription: string) => setBookmarkDescription(newDescription),
        []
    );
    const handleExit = useCallback(() => {
        setBookmarkName(name);
        setBookmarkDescription(description);
        onExit();
    }, [onExit, name, description]);

    const handleSave = useCallback(() => onSave(bookmarkName, bookmarkDescription), [
        bookmarkName,
        bookmarkDescription,
    ]);

    return (
        <>
            <IconButton onClick={handleSave}>
                <SaveIcon />
            </IconButton>
            <div className={styles.editInput}>
                <TextInput onChange={updateBookmarkName} value={bookmarkName} />
            </div>
            <div className={styles.editInput}>
                <TextInput onChange={updateBookmarkDescription} value={bookmarkDescription} />
            </div>
            <IconButton onClick={handleExit}>
                <CloseIcon />
            </IconButton>
        </>
    );
}

export default EditBookmark;
