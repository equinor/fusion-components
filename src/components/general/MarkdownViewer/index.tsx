import React from 'react';
import marked from 'marked';
import styles from './styles.less';

type MarkdownViewerProps = {
    markdown: string;
};

const MarkdownViewer: React.FC<MarkdownViewerProps> = ({ markdown }) => {
    return (
        <div className={styles.container} dangerouslySetInnerHTML={{ __html: marked(markdown) }} />
    );
};

export default MarkdownViewer;
