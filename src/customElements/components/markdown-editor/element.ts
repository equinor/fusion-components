import { fusionElement, LitElement, property, html } from '../base';

import { baseKeymap } from 'prosemirror-commands';
import { keymap } from 'prosemirror-keymap';
import { schema, defaultMarkdownSerializer, defaultMarkdownParser } from 'prosemirror-markdown';
import { history } from 'prosemirror-history';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { buildKeymap } from './keymap';
import menuPlugin from './menu';

import styles from './element.css';
import { MdMenuItemType } from './menuItems';

export interface MarkdownEditorElementProps {
    initialValue: string;
    menuItems?: Array<MdMenuItemType>;
}

@fusionElement('fusion-markdown-editor')
export class MarkdownEditorElement extends LitElement implements MarkdownEditorElementProps {
    static styles = styles;

    private editorView;

    @property({ reflect: false })
    initialValue: string;

    @property({ type: Array, reflect: false })
    menuItems: Array<MdMenuItemType>;

    firstUpdated() {
        const editor = this.shadowRoot.querySelector('#editor');
        const menu = this.shadowRoot.querySelector('#menu');
        this.initializeEditor(editor, menu);
    }

    updateValue() {
        if (!this.editorView) return;
    }

    getDefaultMenuItems(): Array<MdMenuItemType> {
        return ['strong', 'em', 'bullet_list', 'ordered_list'];
    }

    private initializeEditor(editor: Element, menu: Element) {
        const mdMenuItems = this.menuItems || this.getDefaultMenuItems();
        const state = EditorState.create({
            schema,
            doc: defaultMarkdownParser.parse(this.initialValue),
            plugins: [
                history(),
                keymap(buildKeymap(schema)),
                keymap(baseKeymap),
                menuPlugin(menu, mdMenuItems),
            ],
        });

        const onChange = (markdown: string) => {
            const event = new CustomEvent('change', {
                detail: markdown,
                composed: true,
                bubbles: true,
            });
            this.dispatchEvent(event);
        };

        this.editorView = new EditorView(editor, {
            state,
            dispatchTransaction(transaction) {
                onChange(defaultMarkdownSerializer.serialize(transaction.doc));
                const newState = this.state.apply(transaction);
                this.updateState(newState);
            },
        });
    }

    render() {
        return html`
            <div class="container">
                <div id="menu"></div>
                <div id="editor"></div>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'fusion-markdown-editor': MarkdownEditorElement;
    }
}

export default MarkdownEditorElement;
