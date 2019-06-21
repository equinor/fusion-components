import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { ContextTypes } from '@equinor/fusion';
import ContextSelector from '../index';
import FusionHeader from '../../Header';
import FusionContent from '../../Content';
import Button from "../../../general/Button";

const PDPContextSelectorStory = () => (
    <React.Fragment>
        <FusionHeader>
            <ContextSelector types={[ContextTypes.PDP]} />
        </FusionHeader>
        <FusionContent>
            <h1 style={{ textAlign: "center", margin: 16 }}>PDP</h1>
        </FusionContent>
    </React.Fragment>
);

const OrgChartContextSelectorStory = () => (
    <React.Fragment>
        <FusionHeader>
            <ContextSelector types={[ContextTypes.OrgChart, ContextTypes.Contract]} />
        </FusionHeader>
        
        <FusionContent>
            {/* <div style={{  borderBottom: "1px solid #E6E6E6" }}>
                <span style={{padding: "0 16px", height: 48, lineHeight: "48px", marginRight: 40, fontSize: 14 }}>Would you like to connect <strong>MAR. Mariner Project (L.OMARC.001)</strong> to <strong>Johan Sverdrup Ph2 DG3-DG4</strong>?</span>
                <Button frameless primary comfortable>Dismiss</Button>
                <Button frameless primary comfortable>Yes</Button>
            </div> */}
            <h1 style={{ textAlign: "center", margin: 16 }}>Pro Org</h1>
        </FusionContent>
    </React.Fragment>
);

const ContractContextSelectorStory = () => (
    <React.Fragment>
        <FusionHeader>
            <ContextSelector types={[ContextTypes.Contract]} />
        </FusionHeader>
        
        <FusionContent>
        <h1 style={{ textAlign: "center", margin: 16 }}>Contracts</h1>
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
