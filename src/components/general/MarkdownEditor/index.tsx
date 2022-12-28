import {
    useRef,
    useCallback,
    useEffect,
    FC,
    DetailedHTMLFactory,
    DetailedHTMLProps,
    Props,
    PropsWithChildren,
} from 'react';
import {
    MarkdownEditorElement,
    MarkdownEditorElementProps,
} from '../../../customElements/components/markdown-editor';

export type MarkdownEditorProps = PropsWithChildren<
    MarkdownEditorElementProps & {
        onChange: (markdown: string) => void;
    }
>;

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace JSX {
        interface ReactHTML {
            'fusion-markdown-editor': DetailedHTMLFactory<
                Props<MarkdownEditorElementProps>,
                MarkdownEditorElement
            >;
        }
        interface IntrinsicElements {
            'fusion-markdown-editor': DetailedHTMLProps<
                Props<MarkdownEditorElementProps>,
                MarkdownEditorElement
            >;
        }
    }
}

export const MarkdownEditor: FC<MarkdownEditorProps> = (props: MarkdownEditorProps) => {
    const editorRef = useRef<MarkdownEditorElement>(null);
    const { onChange, children, ...attr } = props;

    const onMarkdownChange = useCallback(
        (e: CustomEvent) => {
            onChange(e.detail);
        },
        [onChange]
    );

    useEffect(() => {
        if (!editorRef.current) return;
        editorRef.current.addEventListener('change', onMarkdownChange);
        Object.assign(editorRef.current, attr);
        return () => editorRef?.current?.removeEventListener('change', onMarkdownChange);
    }, [editorRef]);

    return (
        <fusion-markdown-editor ref={editorRef} {...attr}>
            {children}
        </fusion-markdown-editor>
    );
};

export default MarkdownEditor;
