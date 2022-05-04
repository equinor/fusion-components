import {
    fusionElement,
    LitElement,
    property,
    html,
    throttle,
    queryAsync,
    PropertyValues,
    TemplateResult,
    state,
} from '../base';

import { baseKeymap } from 'prosemirror-commands';
import { keymap } from 'prosemirror-keymap';
import { schema, defaultMarkdownSerializer, defaultMarkdownParser } from 'prosemirror-markdown';
import { history } from 'prosemirror-history';
import { EditorState, TextSelection, Transaction, Plugin } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { buildKeymap } from './keymap';
import menuPlugin from './menu';

import styles from './element.css';
import { MdMenuItemType } from './menuItems';
import { classMap } from 'lit-html/directives/class-map';

export interface MarkdownEditorElementProps {
    menuItems?: Array<MdMenuItemType>;
}

const defaultMenuItem: Array<MdMenuItemType> = ['strong', 'em', 'bullet_list', 'ordered_list'];

/**
 * Element for editing markdown.
 *
 * @example
 *
 * ```html
 * <fusion-markdown-editor>**some** markdown *text*</fusion-markdown-editor>
 * ```
 *
 * ```ts
 * const md = '#my heading';
 * html`<fusion-markdown-editor .value="md" @change=${console.log}></fusion-markdown-editor>`
 * ```
 *
 */
@fusionElement('fusion-markdown-editor')
export class MarkdownEditorElement extends LitElement implements MarkdownEditorElementProps {
    static styles = styles;

    @property({ reflect: false, type: Array, converter: (a) => a.split(',') })
    menuItems: Array<MdMenuItemType> = defaultMenuItem;

    @property({ type: String, reflect: false })
    value: string;

    @state()
    _focused: boolean;

    protected view: EditorView;

    @queryAsync('#editor')
    editor: Promise<HTMLDivElement>;

    @queryAsync('#menu')
    menu: Promise<HTMLDivElement>;

    // internal state of markdown
    protected _value: string;

    /**
     * update editor state with new markdown
     * @todo move to function for setState and create a clearState
     */
    public set markdown(value: string) {
        const {
            state,
            view,
            state: { tr: transaction },
        } = this;
        const selection = TextSelection.create(transaction.doc, 0, transaction.doc.content.size);
        transaction.setSelection(selection);
        transaction.replaceSelectionWith(defaultMarkdownParser.parse(value));
        view.updateState(state.apply(transaction));
    }

    /**
     * get markdown from the current state of the editor
     */
    public get markdown(): string {
        const { view } = this;
        return defaultMarkdownSerializer.serialize(view.state.doc);
    }

    public get state() {
        return this.view.state;
    }

    firstUpdated(props: PropertyValues) {
        super.firstUpdated(props);

        /**
         * @todo this should get content from main slot
         * if value not provided, look in dom
         */
        if (!props.has('value') || !this.value) {
            this.value = this.innerHTML;
        }
        this.innerHTML = null;
    }

    protected updated(props: PropertyValues): void {
        // update markdown state if editor is created and value has changed
        if (this.view && props.has('value') && this.value !== this._value) {
            this.markdown = this.value;
        }
    }

    /**
     * create editor when element connects to dom
     */
    connectedCallback() {
        super.connectedCallback();
        this.initializeEditor();
    }

    /**
     * teardown editor when element disconnects from dom
     */
    disconnectedCallback() {
        super.disconnectedCallback();
        this.view && this.view.destroy();
    }

    private async initializeEditor() {
        const state = await this.createEditorState();
        this.view = await this.createEditorView(state);
    }

    focusPlugin(element, handleActiveState) {
        return new Plugin({
            props: {
                handleDOMEvents: {
                    focus(view) {
                        view.dom.classList.add('ProseMirror-focused');
                        handleActiveState(element, true);
                        return true;
                    },
                    blur() {
                        handleActiveState(element, false);
                        return true;
                    },
                },
            },
        });
    }

    handleActiveState(element: this, state: boolean): void {
        element._focused = state;
    }

    protected async createEditorState() {
        const menu = await this.menu;
        const { menuItems, value } = this;
        return EditorState.create({
            schema,
            doc: defaultMarkdownParser.parse(value),
            plugins: [
                history(),
                keymap(buildKeymap(schema)),
                keymap(baseKeymap),
                menuPlugin(menu, menuItems),
                this.focusPlugin(this, this.handleActiveState),
            ],
        });
    }

    protected async createEditorView(state: EditorState) {
        const editor = await this.editor;
        const options = {
            state,
            dispatchTransaction: this.handleTransaction.bind(this),
        };
        return new EditorView(editor, options);
    }

    /**
     *  handle editor transitions
     */
    protected handleTransaction(tr: Transaction) {
        const state = this.view.state.apply(tr);
        this.view.updateState(state);
        if (tr.docChanged) {
            this.dispatchEvent(new CustomEvent('input', { detail: tr }));
            this.handleChange(tr);
        }
    }

    /**
     * this should actually only be handle on blur
     * throttle incase some one two-way binds this component
     * cache the current markdown, to compare with incoming values
     *
     * @todo this value might need to be increased
     */
    @throttle(250, { leading: false })
    protected handleChange(tr: Transaction) {
        const { markdown } = this;
        this._value = markdown;
        const event = new CustomEvent('change', { detail: markdown });
        this.dispatchEvent(event);
    }

    protected render(): TemplateResult {
        return html`
            <div class=${classMap({ container: true, focused: this._focused })}>
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
