import { marked } from 'marked';
import styles from './styles.less';
import dompurify from 'dompurify';
import { FC } from 'react';

type MarkdownViewerProps = {
    markdown: string;
};

const MarkdownViewer: FC<MarkdownViewerProps> = ({ markdown }) => {
    return (
        <div
            className={styles.container}
            dangerouslySetInnerHTML={{ __html: dompurify.sanitize(marked.parse(markdown)) }}
        />
    );
};

export default MarkdownViewer;
