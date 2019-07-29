import React, { useState, useEffect, useMemo } from 'react';
import { Router } from 'react-router-dom';
import { History, Path, LocationState, LocationDescriptorObject, createPath } from 'history';
import { useFusionContext, combineUrls, HistoryContext } from '@equinor/fusion';

const hasBasename = (path: string, prefix: string) => {
    return new RegExp('^' + prefix + '(\\/|\\?|#|$)', 'i').test(path);
};

const stripBasename = (path: string, prefix: string) => {
    return hasBasename(path, prefix) ? path.substr(prefix.length) : path;
};

const createAppHistory = (history: History, appKey?: string): History => {
    const basename = combineUrls('/apps', appKey || '');

    const ensurePathBaseName = (path: Path | LocationDescriptorObject<LocationState>) => {
        if (typeof path === "string") {
            return combineUrls(basename, path.toString());
        }

        const location = path as LocationDescriptorObject<LocationState>;
        return combineUrls(basename, createPath(location));
    };

    return {
        ...history,
        location: {
            ...history.location,
            pathname: stripBasename(history.location.pathname, basename),
        },
        createHref: location => basename + history.createHref(location),
        push: (path: Path | LocationDescriptorObject<LocationState>, state?: LocationState) =>
            history.push(ensurePathBaseName(path), state),
        replace: (path: Path | LocationDescriptorObject<LocationState>, state?: LocationState) =>
            history.replace(ensurePathBaseName(path), state),
        listen: func =>
            history.listen((location, action) =>
                func(
                    {
                        ...location,
                        pathname: stripBasename(location.pathname, basename),
                    },
                    action
                )
            ),
    };
};

type AppWrapperProps = {
    appKey?: string;
};

const AppWrapper: React.FC<AppWrapperProps> = ({ appKey }) => {
    const {
        app: { container: appContainer },
        history,
    } = useFusionContext();
    const [isFetching, setIsFetching] = useState(false);

    const currentApp = appContainer.get(appKey || null);

    const setCurrentApp = async () => {
        setIsFetching(true);
        await appContainer.setCurrentAppAsync(appKey || null);
        setIsFetching(false);
    };

    useEffect(() => {
        setCurrentApp();
        return () => {
            appContainer.setCurrentAppAsync(null);
        };
    }, [appKey]);

    const [, forceUpdate] = useState();
    useEffect(() => {
        // If the app has been registered between rendering the app and useEffect
        if (appKey && !currentApp && appContainer.get(appKey)) {
            forceUpdate(null);
        }

        return appContainer.on('update', app => {
            if (app.key === appKey) {
                forceUpdate(null);
            }
        });
    }, [appKey]);

    const appHistory = useMemo(() => createAppHistory(history, appKey), [appKey]);

    if (currentApp === null && isFetching) {
        return <div>Is fetching</div>;
    }

    if (!currentApp) {
        return <div>Unable to find app</div>;
    }

    const AppComponent = currentApp.AppComponent;
    if (!AppComponent) {
        return null;
    }

    return (
        <HistoryContext.Provider value={{ history: appHistory }}>
            <Router history={appHistory}>
                <AppComponent />
            </Router>
        </HistoryContext.Provider>
    );
};

export default AppWrapper;
