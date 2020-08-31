import { Plugin } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { MdMenuItemType, getMenuitemByType } from './menuItems';

export type MenuItem = {
    command: Function;
    dom: HTMLButtonElement;
    type: any;
};

export class MenuView {
    editorView: EditorView;
    items: MenuItem[];
    dom: Element;

    constructor(items: MenuItem[], editorView: EditorView, menuContainer: Element) {
        this.items = items;
        this.editorView = editorView;

        this.dom = menuContainer;
        items.forEach(({ dom }) => this.dom.appendChild(dom));
        this.update();

        this.dom.addEventListener('mousedown', (e: MouseEvent) => {
            e.preventDefault();
            editorView.focus();
            items.forEach(({ command, dom }) => {
                if (dom.contains(e.target as any))
                    command(editorView.state, editorView.dispatch, editorView);
            });
        });
    }

    update() {
        this.items.forEach(({ command, dom, type }) => {
            const { state } = this.editorView;
            const { from, $from, to, empty } = state.selection;

            const activeMark = empty
                ? type.isInSet && type.isInSet(this.editorView.state.storedMarks || $from.marks())
                : this.editorView.state.doc.rangeHasMark(from, to, type);

            const applicable = command(this.editorView.state, null, this.editorView);
            if (applicable) {
                dom.classList.remove('disabled');
            } else {
                dom.classList.add('disabled');
            }
            if (activeMark) {
                dom.classList.add('active');
            } else {
                dom.classList.remove('active');
            }
        });
    }

    destroy() {
        this.dom.remove();
    }
}

export default function menuPlugin(menuContainer, itemTypes: Array<MdMenuItemType>) {
    return new Plugin({
        view(editorView) {
            const items = itemTypes.map((type) => getMenuitemByType(type));
            let menuView = new MenuView(items, editorView, menuContainer);
            return menuView;
        },
    });
}
