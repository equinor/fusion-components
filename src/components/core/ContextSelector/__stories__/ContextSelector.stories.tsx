import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { ContextTypes } from '@equinor/fusion';
import ContextSelector from '../index';
import FusionHeader from '../../Header';
import FusionContent from '../../Content';
import Button from '../../../general/Button';

const PDPContextSelectorStory = () => (
    <React.Fragment>
        <FusionHeader
            start={null}
            content={<ContextSelector types={[ContextTypes.PDP]} />}
            aside={null}
        />
        <FusionContent>
            <h1 style={{ textAlign: 'center', margin: 16 }}>PDP</h1>
        </FusionContent>
    </React.Fragment>
);

const OrgChartContextSelectorStory = () => (
    <React.Fragment>
        <FusionHeader
            start={null}
            content={<ContextSelector types={[ContextTypes.OrgChart, ContextTypes.Contract]} />}
            aside={null}
        />

        <FusionContent>
            <h1 style={{ textAlign: 'center', margin: 16 }}>Pro Org</h1>
        </FusionContent>
    </React.Fragment>
);

const ContractContextSelectorStory = () => (
    <React.Fragment>
        <FusionHeader
            start={null}
            content={<ContextSelector types={[ContextTypes.Contract]} />}
            aside={null}
        />
        <FusionContent>
            <h1 style={{ textAlign: 'center', margin: 16 }}>Contracts</h1>
        </FusionContent>
    </React.Fragment>
);

storiesOf('Core components/Context Selector', module).add('PDP', () => <PDPContextSelectorStory />);

storiesOf('Core components/Context Selector', module).add('OrgChart', () => (
    <OrgChartContextSelectorStory />
));

storiesOf('Core components/Context Selector', module).add('Contract', () => (
    <ContractContextSelectorStory />
));
