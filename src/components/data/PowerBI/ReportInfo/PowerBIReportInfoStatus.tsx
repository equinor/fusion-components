import { FunctionComponent } from 'react';

import { useSelector } from '@equinor/fusion/lib/epic';

import { Spinner } from '@equinor/fusion-components';

import { Status } from './state';
import Store from './store';

const statusText = (status: Status) => {
    switch (status) {
        case Status.LoadingReport:
            return 'Loading report info';
        case Status.LoadingDescription:
            return 'Loading descrption';
        case Status.LoadingAccessDescription:
            return 'Loading access description';
        case Status.LoadingRequirements:
            return 'Loading report requirements';
    }
};

export const PowerBIInfoStatus: FunctionComponent<{ store: Store }> = ({ store }) => {
    const status = useSelector(store, 'status');
    const title = status?.map(statusText).shift();
    return status?.length ? <Spinner title={title} floating centered /> : null;
};

export default PowerBIInfoStatus;
