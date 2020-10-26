import { IconButton, SaveIcon, CloseIcon, TextInput } from '@equinor/fusion-components';
import * as React from 'react';
import { PBIBookmark } from '../../useBookmarks';
import BookmarkOptions from './BookmarkOptions';
import * as styles from './styles.less';

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

const EditBookmark: React.FC<EditBookmarkProps> = ({ name, onExit, onSave }) => {
    const [bookmarkName, setBookmarkName] = React.useState<string>(name);
    const updateBookmarkName = React.useCallback((newName: string) => setBookmarkName(newName), []);

    const handleExit = React.useCallback(() => {
        setBookmarkName(name);
        onExit();
    }, [onExit, name]);

    const handleSave = React.useCallback(() => onSave(bookmarkName), [bookmarkName]);

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

const Bookmark: React.FC<BookmarkProps> = ({
    bookmark,
    onUpdate,
    onDelete,
    onSelect,
    accordionOpen,
}) => {
    const [isEditing, setIsEditing] = React.useState<boolean>(false);

    const enableEditing = React.useCallback(() => setIsEditing(true), []);
    const disableEditing = React.useCallback(() => setIsEditing(false), []);

    const saveBookmark = React.useCallback(
        (newName: string) => {
            disableEditing();
            onUpdate({ ...bookmark, bookmarkName: newName });
        },
        [bookmark, disableEditing]
    );

    const deleteBookmark = React.useCallback(() => onDelete(bookmark), [bookmark]);

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
