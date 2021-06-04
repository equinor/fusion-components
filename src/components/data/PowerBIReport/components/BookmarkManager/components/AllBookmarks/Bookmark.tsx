import { IconButton, SaveIcon, CloseIcon, TextInput } from '@equinor/fusion-components';
import { useState, useCallback } from 'react';

import { PBIBookmark } from '../../useBookmarks';
import BookmarkOptions from './BookmarkOptions';
import styles from './styles.less';
import { FC } from 'react';

type BookmarkProps = {
    bookmark: PBIBookmark;
    onDelete: (bookmark: PBIBookmark) => void;
    onUpdate: (bookmark: PBIBookmark) => void;
    onSelect: () => void;
    accordionOpen?: boolean;
};

type EditBookmarkProps = {
    name: string;
    onExit: () => void;
    onSave: (newName: string) => void;
};

const EditBookmark: FC<EditBookmarkProps> = ({ name, onExit, onSave }) => {
    const [bookmarkName, setBookmarkName] = useState<string>(name);
    const updateBookmarkName = useCallback((newName: string) => setBookmarkName(newName), []);

    const handleExit = useCallback(() => {
        setBookmarkName(name);
        onExit();
    }, [onExit, name]);

    const handleSave = useCallback(() => onSave(bookmarkName), [bookmarkName]);

    return (
        <>
            <IconButton onClick={handleSave}>
                <SaveIcon />
            </IconButton>
            <div className={styles.editInput}>
                <TextInput onChange={updateBookmarkName} value={bookmarkName} />
            </div>
            <IconButton onClick={handleExit}>
                <CloseIcon />
            </IconButton>
        </>
    );
};

const Bookmark: FC<BookmarkProps> = ({ bookmark, onUpdate, onDelete, onSelect, accordionOpen }) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const enableEditing = useCallback(() => setIsEditing(true), []);
    const disableEditing = useCallback(() => setIsEditing(false), []);

    const saveBookmark = useCallback(
        (newName: string) => {
            disableEditing();
            onUpdate({ ...bookmark, bookmarkName: newName });
        },
        [bookmark, disableEditing]
    );

    const deleteBookmark = useCallback(() => onDelete(bookmark), [bookmark]);

    return (
        <div className={styles.bookmarkContainer}>
            {isEditing ? (
                <EditBookmark
                    onExit={disableEditing}
                    onSave={saveBookmark}
                    name={bookmark.bookmarkName}
                />
            ) : (
                <>
                    <BookmarkOptions
                        onDelete={deleteBookmark}
                        onEdit={enableEditing}
                        accordionOpen={accordionOpen}
                    />
                    <span className={styles.bookmarkLink} onClick={onSelect}>
                        {bookmark.bookmarkName}
                    </span>
                </>
            )}
        </div>
    );
};
export default Bookmark;
