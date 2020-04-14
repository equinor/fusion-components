import React from 'react';
import marked from 'marked';
import styles from './styles.less';
import  dompurify from "dompurify";

type MarkdownViewerProps = {
    markdown: string;
};

const MarkdownViewer: React.FC<MarkdownViewerProps> = ({ markdown }) => {
    return (
        <div className={styles.container} dangerouslySetInnerHTML={{ __html: dompurify(markdown) }} />
    );
};

export default MarkdownViewer;
