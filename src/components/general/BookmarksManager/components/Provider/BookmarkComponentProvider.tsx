import { createContext, FC, useContext, useReducer } from 'react';

type View = 'Creating' | 'Editing' | 'AllBookmarks';

type State = View;

type Dispatch = (view: View) => void;

const ViewContext = createContext<State>('AllBookmarks');

const DispatchViewContext = createContext<Dispatch | undefined>(undefined);

const reducer = (_: State, view: View): State => {
    return view;
};

export const ViewProvider: FC = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, 'AllBookmarks');

    return (
        <ViewContext.Provider value={state}>
            <DispatchViewContext.Provider value={dispatch}>{children}</DispatchViewContext.Provider>
        </ViewContext.Provider>
    );
};

export const useViewContext = () => {
    const context = useContext(ViewContext);
    if (context === undefined) {
        throw new Error('useViewContext must be used within a ViewProvider');
    }
    return context;
};

export const useViewDispatchContext = () => {
    const context = useContext(DispatchViewContext);
    if (context === undefined) {
        throw new Error('useViewDispatchContext must be used within a DispatchViewContext');
    }
    return context;
};
