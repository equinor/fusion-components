import React from 'react';
import {
    MarkdownEditorElement,
    MarkdownEditorElementProps,
} from '../../../customElements/components/markdown-editor';

export type MarkdownEditorProps = MarkdownEditorElementProps & {
    onChange: (markDown: string) => void;
};

declare global {
    namespace JSX {
        interface ReactHTML {
            'fusion-markdown-editor': React.DetailedHTMLFactory<
                React.Props<MarkdownEditorElementProps>,
                MarkdownEditorElement
            >;
        }
        interface IntrinsicElements {
            'fusion-markdown-editor': React.DetailedHTMLProps<
                React.Props<MarkdownEditorElementProps>,
                MarkdownEditorElement
            >;
        }
    }
}

export const MarkdownEditor: React.FC<MarkdownEditorProps> = (props: MarkdownEditorProps) => {
    const editorRef = React.useRef<MarkdownEditorElement>(null);
    const { onChange, ...attr } = props;

    const change = (e: CustomEvent<HTMLInputElement>) => {
        onChange(e.detail.toString());
    };

    React.useEffect(() => {
        if (!editorRef.current) return;
        editorRef.current.addEventListener('change', change);

        return () => editorRef.current.removeEventListener('change', change);
    }, [editorRef]);

    return <fusion-markdown-editor ref={editorRef} {...attr} />;
};

export default MarkdownEditor;
