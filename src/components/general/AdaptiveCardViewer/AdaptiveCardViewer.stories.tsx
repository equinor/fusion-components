import { storiesOf } from '@storybook/react';
import withFusionStory from '../../../../.storybook/withFusionStory';
import AdaptiveCardViewer from '.';
import { action } from '@storybook/addon-actions';

const payload = {
    type: 'AdaptiveCard',
    version: '1.0',
    body: [
        {
            type: 'Image',
            url: 'http://adaptivecards.io/content/adaptive-card-50.png',
        },
        {
            type: 'TextBlock',
            text: `# Hello Adaptive card \n ## This is markdown \n ### This is also markdown \n\n * Some \n * List \n * Items`,
        },
    ],
    actions: [
        {
            type: 'Action.Submit',
            title: 'Submit',
            url: 'http://adaptivecards.io',
        },
        {
            type: 'Action.OpenUrl',
            title: 'GitHub',
            url: 'http://github.com/Microsoft/AdaptiveCards',
        },
    ],
};
const AdaptiveCardViewerStory = () => {
    return (
        <div style={{ margin: '8px' }}>
            <AdaptiveCardViewer payload={payload} onActionSubmit={action('Submit')} />
        </div>
    );
};

storiesOf('General/Adaptive Card Viewer', module)
    .addDecorator(withFusionStory('Adaptive Card Viewer'))
    .add('Default', () => <AdaptiveCardViewerStory />);
