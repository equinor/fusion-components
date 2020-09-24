import * as React from 'react';
import { storiesOf } from '@storybook/react';
import withFusionStory from '../../../../.storybook/withFusionStory';
import MarkdownViewer from '.';

const initialMarkdown = `# This is markdown \n ## This is also markdown \n ### This is also markdown \n\n * Some \n * List \n * Items`;

const MarkdownViewerStory = () => {
    const [markdown, setMarkdown] = React.useState(initialMarkdown);

    const handleTextareaChanged = React.useCallback(event => {
        setMarkdown(event.target.value);
    }, []);

    return (
        <div style={{ margin: '8px' }}>
            <textarea
                style={{ width: 500, height: 150 }}
                value={markdown}
                onChange={handleTextareaChanged}
                placeholder="Type markdown here"
            />
            <MarkdownViewer id="markdown-viewer" markdown={markdown} quickFactScope="storybook"/>
        </div>
    );
};

storiesOf('General|Markdown Viewer', module)
    .addDecorator(withFusionStory('Markdown Viewer'))
    .add('Default', () => <MarkdownViewerStory />);
