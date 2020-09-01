import { toggleMark, setBlockType } from 'prosemirror-commands';
import { wrapInList } from 'prosemirror-schema-list';
import { schema } from 'prosemirror-markdown';
import strongIcon from './svg/strongIcon.svg';
import emIcon from './svg/emIcon.svg';
import orderedListIcon from './svg/orderedListIcon.svg';
import bulletListIcon from './svg/bulletListIcon.svg';
import quoteIcon from './svg/quoteIcon.svg';
import { MenuItem } from './menu';

export type MdMenuItemType =
    | 'strong'
    | 'em'
    | 'ordered_list'
    | 'bullet_list'
    | 'paragraph'
    | 'blockquote'
    | 'h1'
    | 'h2'
    | 'h3';

const icon = (text: string, name: string) => {
    let button = document.createElement('button');
    button.className = 'button small borderless ' + name;
    button.title = name;
    button.innerHTML = text;
    return button;
};

const heading = (level) => ({
    command: setBlockType(schema.nodes.heading, { level }),
    dom: icon('H' + level, 'heading ' + level),
    type: schema.nodes.heading,
});

export const getMenuitemByType = (type: MdMenuItemType): MenuItem => {
    switch (type) {
        case 'em':
            return {
                command: toggleMark(schema.marks.em),
                dom: icon(emIcon.getHTML(), 'em'),
                type: schema.marks.em,
            };
        case 'strong':
            return {
                command: toggleMark(schema.marks.strong),
                dom: icon(strongIcon.getHTML(), 'strong'),
                type: schema.marks.strong,
            };
        case 'ordered_list':
            return {
                command: wrapInList(schema.nodes.ordered_list),
                dom: icon(orderedListIcon.getHTML(), 'Ordered list'),
                type: schema.nodes.ordered_list,
            };
        case 'bullet_list':
            return {
                command: wrapInList(schema.nodes.bullet_list),
                dom: icon(bulletListIcon.getHTML(), 'Bullet list'),
                type: schema.nodes.bullet_list,
            };
        case 'blockquote':
            return {
                command: wrapInList(schema.nodes.blockquote),
                dom: icon(quoteIcon.getHTML(), 'blockquote'),
                type: schema.nodes.blockquote,
            };
        case 'paragraph':
            return {
                command: setBlockType(schema.nodes.paragraph),
                dom: icon('p', 'paragraph'),
                type: schema.nodes.paragraph,
            };

        case 'h1':
            return heading(1);
        case 'h2':
            return heading(2);
        case 'h3':
            return heading(3);
        default:
            return null;
    }
};
