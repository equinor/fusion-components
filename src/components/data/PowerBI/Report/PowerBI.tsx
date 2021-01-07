import React, { FunctionComponent, MutableRefObject } from 'react';

import { ReportLevelFilters } from 'powerbi-models';

import { PowerBIReportProvider, PowerBIReportErrorBoundry, PowerBIBookmark, PowerBIStatus } from './components';
import { PowerBIReportContext, context } from './context';
import PowerBIReportView from './components/view/PowerBIReportView';

export type PowerBIProps = {
    reportId: string;
    filters?: ReportLevelFilters[];
    hasContext?: boolean;
    contextRef?: MutableRefObject<PowerBIReportContext | undefined>;
};

export const PowerBI: FunctionComponent<PowerBIProps> = ({
    reportId,
    filters,
    hasContext,
    contextRef,
}: PowerBIProps) => (
    <PowerBIReportProvider id={reportId} hasContext={hasContext}>
        <PowerBIStatus />
        <PowerBIReportErrorBoundry>
            <PowerBIReportView config={{ filters }}></PowerBIReportView>
        </PowerBIReportErrorBoundry>
        <PowerBIBookmark hasContext={hasContext} />
        <context.Consumer>
            {(value) => {
                if (contextRef && contextRef?.current !== value) {
                    contextRef.current = value;
                }
                return null;
            }}
        </context.Consumer>
    </PowerBIReportProvider>
);

export default PowerBI;
