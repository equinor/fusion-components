import * as React from 'react';
import { storiesOf } from '@storybook/react';
import ContextSelector from '../index';
import FusionHeader from '../../Header';
import FusionContent from '../../Content';
import { ContextTypes, useFusionContext } from '@equinor/fusion';

const CurrentContextPDP: React.FC = ({ children }) => {
    const { app } = useFusionContext();

    (app.container as any)._currentApp.state = {
        AppComponent: ContextSelector,
        key: 'PDP',
        name: 'PDP',
        shortName: 'PDP',
        version: '1',
        description: 'pdp',
        tags: ['PDP'],
        context: {
            types: [ContextTypes.Project, ContextTypes.PDP],
        },
    };

    return <> {children} </>;
};

const PDPContextSelectorStory = () => {
    return (
        <React.Fragment>
            <CurrentContextPDP>
                <FusionHeader start={null} content={<ContextSelector />} aside={null} />
                <FusionContent>
                    <h1 style={{ textAlign: 'center', margin: 16 }}>PDP</h1>
                </FusionContent>
            </CurrentContextPDP>
        </React.Fragment>
    );
};

const OrgChartContextSelectorStory = () => (
    <React.Fragment>
        <FusionHeader start={null} content={<ContextSelector />} aside={null} />

        <FusionContent>
            <h1 style={{ textAlign: 'center', margin: 16 }}>Pro Org</h1>
        </FusionContent>
    </React.Fragment>
);

const ContractContextSelectorStory = () => (
    <React.Fragment>
        <FusionHeader start={null} content={<ContextSelector />} aside={null} />
        <FusionContent>
            <h1 style={{ textAlign: 'center', margin: 16 }}>Contracts</h1>
        </FusionContent>
    </React.Fragment>
);

storiesOf('Core|Context Selector', module)
    .add('PDP', () => <PDPContextSelectorStory />)
    .add('OrgChart', () => <OrgChartContextSelectorStory />)
    .add('Contract', () => <ContractContextSelectorStory />);
