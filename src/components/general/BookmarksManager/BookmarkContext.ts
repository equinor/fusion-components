import { createContext } from 'react';
import { Store } from './store/store';
type BookmarkContext = {
    store: Store;
};

export const bookmarkContext = createContext<BookmarkContext | null>(null);
