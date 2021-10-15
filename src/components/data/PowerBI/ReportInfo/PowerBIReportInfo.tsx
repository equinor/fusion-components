import { FC, useEffect, useMemo } from 'react';

import { useApiClients } from '@equinor/fusion';
import { useSelector } from '@equinor/fusion/lib/epic';

import { MarkdownViewer, PersonCard, useElevationClassName } from '@equinor/fusion-components';

import Store, { createStore } from './store/store';

import { PowerBIInfoStatus } from './PowerBIReportInfoStatus';
import { PowerBIInfoUserIdentity } from './PowerBIUserIdentity';
import { PowerBIInfoRequirements } from './PowerBIRequirements';

import classNames from 'classnames';
import styles from './styles.less';

type Props = {
    id: string;
    header?: string;
    subHeader?: string;
};

export const PowerBIReportInfo: FC<Props> = ({
    id,
    header = 'Restricted Access',
    subHeader = 'It looks like you do not have access to this report',
}: Props) => {
    const clients = useApiClients();
    const store = useMemo<Store>(() => {
        return createStore(id, { clients });
    }, [id, clients]);
    const initialized = useSelector(store, 'initialized');

    const restrictedAccessContainer = useMemo(
        () => classNames(useElevationClassName(3), styles.restrictedAccessContainer),
        []
    );

    useEffect(() => {
        return store.initialize();
    }, [store]);

    if (!initialized) {
        return <PowerBIInfoStatus store={store} />;
    }

    const { report, description, accessDescription } = store.value;
    const personId = report?.ownedBy?.azureUniqueId;

    return (
        <div className={styles.pbiErrorMessage}>
            <div className={styles.container}>
                <h2 className={styles.header}>{header}</h2>
                <div className={restrictedAccessContainer}>
                    <h2>{subHeader}</h2>
                    {accessDescription && <MarkdownViewer markdown={accessDescription} />}
                    <div className={styles.reportInfoContainer}>
                        {description && (
                            <div className={styles.reportDescription}>
                                <h5>Report description</h5>
                                <MarkdownViewer markdown={description} />
                            </div>
                        )}
                        {personId && (
                            <div className={styles.reportOwner}>
                                <h5>Report owner</h5>
                                <PersonCard personId={personId}></PersonCard>
                            </div>
                        )}
                    </div>
                </div>
                <PowerBIInfoUserIdentity />
                <PowerBIInfoRequirements store={store} />
            </div>
        </div>
    );
};

export default PowerBIReportInfo;
