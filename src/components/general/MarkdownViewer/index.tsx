import React from 'react';
import marked from 'marked';
import styles from './styles.less';

type MarkdownViewerProps = {
    markdown: string;
};

const MarkdownViewer: React.FC<MarkdownViewerProps> = ({ markdown }) => {
    const sanitizer = () => {
        // This function callback receives non-markdown tokens for
        // examination. For instance, for the input "<html>some text</html>",
        // this function will be called twice with "<html>" and "</html>" as tokens respectively.

        // For now, we will handle all non-markdown tokens equally and simply strip them away.
        return '';
    };

    marked.setOptions({
        sanitize: true,
        sanitizer,
    });

    return (
        <div className={styles.container} dangerouslySetInnerHTML={{ __html: marked(markdown) }} />
    );
};

export default MarkdownViewer;
