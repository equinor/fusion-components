import React, { useState, useEffect, useMemo } from 'react';
import { Router } from 'react-router-dom';
import { History, createBrowserHistory } from 'history';
import { useFusionContext, combineUrls, HistoryContext } from '@equinor/fusion';
import { Spinner, ErrorMessage, ErrorBoundary } from '@equinor/fusion-components';


const createAppHistory = (appKey?: string): History => {
    const basename = combineUrls('/apps', appKey || '');
    return createBrowserHistory({ basename });
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

    const currentApp = appContainer.currentApp;

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

    const appHistory = useMemo(() => createAppHistory(appKey), [appKey]);

    if (currentApp === null && isFetching) {
        return <Spinner centered floating />;
    }

    if (!currentApp) {
        return (
            <ErrorMessage
                hasError
                errorType="notFound"
                title="Unable to find the selected app"
                message=""
            />
        );
    }

    const AppComponent = currentApp.AppComponent;
    if (!AppComponent) {
        return (
            <ErrorMessage
                hasError
                errorType="error"
                title="There seems to be something wrong with this app"
                message=""
            />
        );
    }

    return (
        <ErrorBoundary>
            <HistoryContext.Provider value={{ history: appHistory }}>
                <Router key={appKey} history={appHistory}>
                    <AppComponent />
                </Router>
            </HistoryContext.Provider>
        </ErrorBoundary>
    );
};

export default AppWrapper;
