import * as React from 'react';
import { storiesOf } from '@storybook/react';
import withFusionStory from '../../../../.storybook/withFusionStory';
import { MarkdownEditor } from '.';
import '.';

const initialMarkdown = `# This is markdown \n ## This is also markdown \n ### This is also markdown \n\n * Some \n * List \n * Items`;

const MarkdownEditorStory = () => {
    const [markdown, setMarkDown] = React.useState(initialMarkdown);

    return (
        <div>
            <MarkdownEditor
                onChange={setMarkDown}
                menuItems={[
                    'strong',
                    'em',
                    'bullet_list',
                    'ordered_list',
                    'blockquote',
                    'h1',
                    'h2',
                    'h3',
                    'paragraph',
                ]}
            >
                {markdown}
            </MarkdownEditor>
        </div>
    );
};

storiesOf('General|Markdown Editor', module)
    .addDecorator(withFusionStory('Markdown Editor'))
    .add('Default', () => <MarkdownEditorStory />);
