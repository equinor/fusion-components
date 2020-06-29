import { LitElement, customElement, html, css, property } from 'lit-element';
import { EditorState } from 'prosemirror-state';
import { baseKeymap } from 'prosemirror-commands';
import { EditorView } from 'prosemirror-view';
import { undo, redo, history } from 'prosemirror-history';
import { keymap } from 'prosemirror-keymap';
import { schema, defaultMarkdownSerializer, defaultMarkdownParser } from 'prosemirror-markdown';
import { buttonStyle, bodyStyle, cssVariables } from '../styles';
import menuPlugin from './menu';
import { buildKeymap } from './keymap';

@customElement('app-guide-editor')
export default class ApplicationGuidanceEditor extends LitElement {
    @property({ type: String, attribute: 'value' })
    value: string;

    firstUpdated() {
        const editor = this.shadowRoot.querySelector('#editor');
        const menu = this.shadowRoot.querySelector('#menu');
        this.initializeEditor(editor, menu);
    }

    static get styles() {
        return [
            cssVariables,
            buttonStyle,
            bodyStyle,
            css`
                :host {
                    --editor-color-background: #ffffff;
                    --editor-color-text: var(--color-primary);
                }

                .container {
                    background: var(--editor-color-background);
                    border-radius: var(--border-radius);
                    color: var(--editor-color-text);
                }

                .ProseMirror {
                    padding: var(--grid-unit);
                    border: none;
                }

                .ProseMirror-focused {
                    outline: none;
                }

                #menu {
                    display: flex;
                    padding: calc(var(--grid-unit) * 0.5);
                    background: var(--color-contrast);
                    border-radius: var(--border-radius) var(--border-radius) 0 0;
                }

                #menu .button {
                    color: white;
                }

                #menu .button:hover {
                    color: var(--color-primary);
                }
                
                #menu .button.active {
                    display: none;
                }
            `,
        ];
    }

    private initializeEditor(editor: Element, menu: Element) {
        const state = EditorState.create({
            schema,
            doc: defaultMarkdownParser.parse(this.value),
            plugins: [
                history(),
                keymap(buildKeymap(schema)),
                keymap(baseKeymap),
                menuPlugin(menu),
            ],
        });

        const onChange = (markdown: string) => {
            const event = new CustomEvent('change', { detail: markdown });
            this.dispatchEvent(event);
        };

        const view = new EditorView(editor, {
            state,
            dispatchTransaction(transaction) {
                onChange(defaultMarkdownSerializer.serialize(transaction.doc));

                const newState = view.state.apply(transaction);
                view.updateState(newState);
            },
        });
    }

    render() {
        return html`
            <div class="container">
                <div id="menu"></div>
                <div id="editor" class="quick-fact"></div>
            </div>
        `;
    }
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'app-guide-editor': any;
        }
    }
}
