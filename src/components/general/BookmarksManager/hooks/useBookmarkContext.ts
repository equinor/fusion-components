import { useContext } from 'react';
import { bookmarkContext } from '../BookmarkContext';

const useBookmarkContext = () => {
    return useContext(bookmarkContext);
};
export default useBookmarkContext;
