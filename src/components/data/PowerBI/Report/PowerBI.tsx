import { FunctionComponent, MutableRefObject } from 'react';

import {
    PowerBIReportProvider,
    PowerBIReportErrorBoundary,
    PowerBIBookmark,
    PowerBIStatus,
} from './components';
import { PowerBIReportContext, context } from './context';
import PowerBIReportView, { PowerBIComponentConfig } from './components/view/PowerBIReportView';

export type PowerBIProps = {
    reportId: string;
    hasContext?: boolean;
    reloadOnContextChange?: boolean;
    contextRef?: MutableRefObject<PowerBIReportContext>;
    config?: PowerBIComponentConfig;
};

export const PowerBI: FunctionComponent<PowerBIProps> = ({
    reportId,
    hasContext = false,
    config,
    contextRef,
}: PowerBIProps) => (
    <PowerBIReportProvider id={reportId} hasContext={hasContext}>
        <PowerBIStatus />
        <PowerBIReportErrorBoundary>
            <PowerBIReportView config={config}></PowerBIReportView>
        </PowerBIReportErrorBoundary>
        <PowerBIBookmark hasContext={hasContext} />
        <context.Consumer>
            {(value) => {
                if (contextRef && contextRef?.current !== value) {
                    contextRef.current = value || undefined;
                }
                return null;
            }}
        </context.Consumer>
    </PowerBIReportProvider>
);

export default PowerBI;
