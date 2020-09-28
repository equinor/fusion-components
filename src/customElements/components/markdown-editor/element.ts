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
    menuItems?: Array<MdMenuItemType>;
}

const defaultMenuItem: Array<MdMenuItemType> = ['strong', 'em', 'bullet_list', 'ordered_list'];

@fusionElement('fusion-markdown-editor')
export class MarkdownEditorElement extends LitElement implements MarkdownEditorElementProps {
    static styles = styles;

    @property({ reflect: false, type: Array, converter: (a) => a.split(',') })
    menuItems: Array<MdMenuItemType>;

    firstUpdated() {
        const editor = this.shadowRoot.querySelector('#editor');
        const menu = this.shadowRoot.querySelector('#menu');
        const initialValue = this.innerHTML;
        this.innerHTML = null;
        this.initializeEditor(editor, menu, initialValue);
    }

    protected crateChangeEvent(markdown: string) {
        return new CustomEvent('change', {
            detail: markdown,
            composed: true,
            bubbles: true,
        });
    }

    protected createEditorState(
        mdMenuItems: MdMenuItemType[],
        menu: Element,
        initialValue: string
    ) {
        return EditorState.create({
            schema,
            doc: defaultMarkdownParser.parse(initialValue),
            plugins: [
                history(),
                keymap(buildKeymap(schema)),
                keymap(baseKeymap),
                menuPlugin(menu, mdMenuItems),
            ],
        });
    }

    protected createEditorView(editor: Element, state) {
        const onChange = (md: string) => {
            const event = this.crateChangeEvent(md);
            this.dispatchEvent(event);
        };

        const editorView = new EditorView(editor, {
            state,
            dispatchTransaction(transaction) {
                onChange(defaultMarkdownSerializer.serialize(transaction.doc));
                const newState = editorView.state.apply(transaction);
                editorView.updateState(newState);
            },
        });
    }

    private initializeEditor(editor: Element, menu: Element, initialValue: string) {
        const mdMenuItems = this.menuItems || defaultMenuItem;
        const state = this.createEditorState(mdMenuItems, menu, initialValue);
        this.createEditorView(editor, state);
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
