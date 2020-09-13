import { fusionElement, LitElement, property, html } from '../../../base';

import { baseKeymap } from 'prosemirror-commands';
import { keymap } from 'prosemirror-keymap';
import { schema, defaultMarkdownSerializer, defaultMarkdownParser } from 'prosemirror-markdown';
import { history } from 'prosemirror-history';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { buildKeymap } from './keymap';
import menuPlugin from './menu';

import styles from './element.css';

@fusionElement('fusion-app-guide-editor')
export class AppGuideEditorElement extends LitElement {
    static styles = styles;

    @property({reflect: false})
    value: string;

    firstUpdated() {
        const editor = this.shadowRoot.querySelector('#editor');
        const menu = this.shadowRoot.querySelector('#menu');
        this.initializeEditor(editor, menu);
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
    interface HTMLElementTagNameMap {
        'fusion-app-guide-editor': AppGuideEditorElement;
    }
}

export default AppGuideEditorElement;