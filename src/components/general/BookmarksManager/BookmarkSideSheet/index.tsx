import { ModalSideSheet } from '@equinor/fusion-components';
import { BookmarksManagerProps } from '..';
import useBookmarks from '../useBookmarks';
import AllBookmarks from './AllBookmarks';

type BookmarkSideSheetProps<T> = BookmarksManagerProps<T> & {
    isOpen: boolean;
    onClose: () => void;
};
function BookmarkSideSheet<T>({
    isOpen,
    onClose,
    hasContext,
    name,
    anchorId,
    ...props
}: BookmarkSideSheetProps<T>) {
    const { allBookmarks, currentContextId } = useBookmarks(hasContext);
    return (
        <ModalSideSheet header={name} onClose={onClose} show={isOpen} size="medium" id={anchorId}>
            <AllBookmarks allBookmarks={allBookmarks} currentContextId={currentContextId} />
        </ModalSideSheet>
    );
}

export default BookmarkSideSheet;
