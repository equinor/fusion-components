import React from 'react';
import {
    MarkdownEditorElement,
    MarkdownEditorElementProps,
} from '../../../customElements/components/markdown-editor';

export type MarkdownEditorProps = React.PropsWithChildren<
    MarkdownEditorElementProps & {
        onChange: (markdown: string) => void;
    }
>;

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
    const { onChange, children, ...attr } = props;

    const onMarkdownChange = React.useCallback(
        (e: CustomEvent) => {
            onChange(e.detail);
        },
        [onChange]
    );

    React.useEffect(() => {
        if (!editorRef.current) return;
        editorRef.current.addEventListener('change', onMarkdownChange);
        Object.assign(editorRef.current, attr);
        return () => editorRef.current.removeEventListener('change', onMarkdownChange);
    }, [editorRef]);

    return (
        <fusion-markdown-editor ref={editorRef} {...attr}>
            {children}
        </fusion-markdown-editor>
    );
};

export default MarkdownEditor;
