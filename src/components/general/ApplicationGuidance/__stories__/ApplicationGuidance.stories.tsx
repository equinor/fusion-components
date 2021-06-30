import { useState, FC } from 'react';

import { storiesOf } from '@storybook/react';
import withFusionStory from '../../../../../.storybook/withFusionStory';

import { Button } from '../../Button';
import { SideSheet } from '../../SideSheet';

import '../../../../customElements/components/application-guide';
import { ApplicationGuidanceAnchor, useAnchor } from '../components/Anchor';

import '../components/Overlay';
import { background } from '@storybook/theming';

const Story: FC = () => {
    const scope = 'storybook/application-guide';
    const [showSideSheet, setShowSideSheet] = useState(true);
    const buttonRef = useAnchor({ scope, id: 'buttonz' });
    return (
        <div style={{display:'flex'}}>
            <div style={{ display: 'flex', flex:'auto', flexFlow:'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-evenly', flexGrow: 1 }}>
                    <Button ref={buttonRef}>
                        This button has snuggly fitted anchor
                    </Button>
                    <ApplicationGuidanceAnchor
                        anchor="another-button"
                        scope={scope}
                        style={{ display: 'block' }}
                    >
                        <Button>Another button</Button>
                        <p>This anchor contains multiple components</p>
                    </ApplicationGuidanceAnchor>
                </div>
                <div style={{background: '#eee', borderRadius: 10, margin: 10, padding: 10}}>
                    <p>These components needs to be inside a fusion-application-guide element (provided by the portal)</p>
                    <h4>Overlay</h4>
                    <p>The OverLay component is the container for a selection of anchors</p>
                    <ul>
                        <li><b>Scope</b> - When providing scope the overlay will filter items, &#123;['apps/my-app']: []&#125; or  &#123;['apps/my-app']: ['foo-btn', 'bar-txt']&#125;</li>
                    </ul>
                    <h4>Anchor</h4>
                    The <b>Scope</b> attribute defines the path for the quick-fact, this should be apps/[APP_KEY] for most cases.
                    the <b>Id</b> attribute reference the unique id for the quick fact
                    <ul>
                        <li><b>useAnchor</b> - hook that generates an hook and attaches to the application guidance</li>
                        <li><b>useAnchorRef</b> - hook for attaching threw existing ref</li>
                        <li><b>ApplicationGuidanceAnchor</b> - wraps element inside an anchor <i>*note: will insert element to markup*</i></li>
                    </ul> 
                </div>
            </div>
            <SideSheet
                id="stoybook"
                title="Stuff in here"
                isOpen={showSideSheet}
                onClose={setShowSideSheet}
            >
                <fusion-overlay-anchor anchor="just-texts" scope={scope+'/sidesheet'}>
                    <p style={{ margin: 32, display: 'block' }}>
                        Text needs to be wrapped in something. This text is wrapped with
                        &lt;p&gt;&lt;/p&gt;
                    </p>
                </fusion-overlay-anchor>
            </SideSheet>
        </div>
    );
};

storiesOf('Application Guidance/Application Guidance', module)
    .addParameters({ jest: ['DataTable.stories.jsx'] })
    .addDecorator(withFusionStory('Data Table'))
    .add('Default', () => <Story />);
