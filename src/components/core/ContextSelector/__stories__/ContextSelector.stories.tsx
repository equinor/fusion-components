import * as React from 'react';
import { storiesOf } from '@storybook/react';
import ContextSelector from '../index';
import FusionHeader from '../../Header';
import FusionContent from '../../Content';

const PDPContextSelectorStory = () => (
    <React.Fragment>
        <FusionHeader start={null} content={<ContextSelector />} aside={null} />
        <FusionContent>
            <h1 style={{ textAlign: 'center', margin: 16 }}>PDP</h1>
        </FusionContent>
    </React.Fragment>
);

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
