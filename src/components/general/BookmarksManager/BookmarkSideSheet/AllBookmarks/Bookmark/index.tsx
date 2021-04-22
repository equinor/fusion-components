import { BookmarkListResponse } from '@equinor/fusion';
import { useCallback, useState } from 'react';
import { ApplyBookmark } from '../../..';
import EditBookmark from './EditBookmark';
import Options from './Options';
import styles from './styles.less';
type BookmarkProps<TPayload> = {
    bookmark: BookmarkListResponse;
    applyBookmark: (bookmarkSetting: ApplyBookmark<TPayload>) => Promise<void>;
    accordionOpen: boolean;
};
function Bookmark<T>({ bookmark, applyBookmark, accordionOpen }: BookmarkProps<T>) {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const enableEditing = useCallback(() => setIsEditing(true), []);
    const disableEditing = useCallback(() => setIsEditing(false), []);
    return (
        <div className={styles.bookmarkContainer}>
            {isEditing ? (
                <EditBookmark
                    name={bookmark.name}
                    description={bookmark.description}
                    onExit={disableEditing}
                    onSave={() => {}}
                />
            ) : (
                <>
                    <Options
                        onDelete={() => {}}
                        onEdit={enableEditing}
                        accordionOpen={accordionOpen}
                    />
                    <div className={styles.bookmarkLink} onClick={() => applyBookmark}>
                        {bookmark.name}
                    </div>
                </>
            )}
        </div>
    );
}

export default Bookmark;
