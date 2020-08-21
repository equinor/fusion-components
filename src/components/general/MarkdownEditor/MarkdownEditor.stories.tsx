import * as React from 'react';
import { storiesOf } from '@storybook/react';
import withFusionStory from '../../../../.storybook/withFusionStory';
import { MarkdownEditor } from '.';
import '.';

const initialMarkdown = `# This is markdown \n ## This is also markdown \n ### This is also markdown \n\n * Some \n * List \n * Items`;

const MarkdownEditorStory = () => {
    return (
        <>
            <MarkdownEditor value={initialMarkdown} onChange={(e) => ''} />
        </>
    );
};

storiesOf('General|Markdown Editor', module)
    .addDecorator(withFusionStory('Markdown Editor'))
    .add('Default', () => <MarkdownEditorStory />);
