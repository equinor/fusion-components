import React from 'react';
import marked from 'marked';
import styles from './styles.less';
import dompurify from 'dompurify';
import { useAnchor } from '@equinor/fusion-components';

type MarkdownViewerProps = {
    id?:string;
    markdown: string;
    quickFactScope?: string;
};

const MarkdownViewer: React.FC<MarkdownViewerProps> = ({ id="markdown-viewer", markdown, quickFactScope }) => {
    return (
        <div
            className={styles.container}
            dangerouslySetInnerHTML={{ __html: dompurify.sanitize(marked(markdown)) }}
            ref={useAnchor({ scope: quickFactScope, id })}
        />
    );
};

export default MarkdownViewer;
