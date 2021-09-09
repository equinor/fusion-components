import { storiesOf } from '@storybook/react';

import { PowerBIReportInfo } from '../';
import ContextSelector from '../../../core/ContextSelector';
import { ContextTypes, useFusionContext } from '@equinor/fusion';
import { FusionHeader, FusionContent, Button } from '../../../..';
import { PowerBIReportContext, PowerBI } from '../Report';
import { Debugger } from './debugger';
import { FC, useRef } from 'react';

const CurrentContext: FC = ({ children }) => {
    const { app } = useFusionContext();

    (app.container as any)._currentApp.state = {
        AppComponent: ContextSelector,
        context: {
            types: [ContextTypes.ProjectMaster],
        },
    };

    return <> {children} </>;
};

const Report = ({ hasContext, reportId }) => {
    const contextRef = useRef<PowerBIReportContext>();
    return (
        <CurrentContext>
            <FusionHeader start={null} content={ContextSelector} aside={null} settings={null} />
            <FusionContent>
                <div style={{ display: 'flex', flex: '1 1 auto', flexFlow: 'column', height: '100%', minWidth: 0 }}>
                    <div>
                        <Debugger context={contextRef} />
                    </div>
                    <div style={{ width: '100%', height: '500px' }}>
                        <PowerBI reportId={reportId} contextRef={contextRef} hasContext={hasContext}></PowerBI>
                    </div>
                </div>
            </FusionContent>
        </CurrentContext>
    );
};

storiesOf('Data/PowerBI', module)
    // .addDecorator(withFusionStory('PowerBI', undefined, ContextSelector))
    .add('Info', () => <PowerBIReportInfo id="224730e8-d5b9-46c5-9d85-644757374094" />)
    .add('Info without context', () => <PowerBIReportInfo id="2e90a309-625e-4396-9a5d-45e99f5b3493" />)
    .add('Report Standard', () => <Report reportId={'2e90a309-625e-4396-9a5d-45e99f5b3493'} />)
    .add('Report Standard - context', () => (
        <Report hasContext={true} reportId={'5dcdce30-2817-4d6a-8cb8-090a29f06036'} />
    ));
// .add('Report with filter', () => <ReportWithFilter />);
