import { toggleMark, setBlockType } from 'prosemirror-commands';
import { wrapInList } from 'prosemirror-schema-list';
import { schema } from 'prosemirror-markdown';

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

function icon(text: string, name: string) {
    let span = document.createElement('button');
    span.className = 'button small borderless ' + name;
    span.title = name;
    span.innerHTML = text;
    return span;
}

function heading(level) {
    return {
        command: setBlockType(schema.nodes.heading, { level }),
        dom: icon('H' + level, 'heading'),
    };
}

export const getMenuitemByType = (type: MdMenuItemType) => {
    switch (type) {
        case 'em':
            return {
                command: toggleMark(schema.marks.em),
                dom: icon(
                    '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 5V8H12.21L8.79 16H6V19H14V16H11.79L15.21 8H18V5H10Z" fill="currentColor"/></svg>',
                    'em'
                ),
            };
        case 'strong':
            return {
                command: toggleMark(schema.marks.strong),
                dom: icon(
                    '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M15.225 11.79C16.195 11.12 16.875 10.02 16.875 9C16.875 6.74 15.125 5 12.875 5H6.625V19H13.665C15.755 19 17.375 17.3 17.375 15.21C17.375 13.69 16.515 12.39 15.225 11.79ZM9.625 7.5H12.625C13.455 7.5 14.125 8.17 14.125 9C14.125 9.83 13.455 10.5 12.625 10.5H9.625V7.5ZM9.625 16.5H13.125C13.955 16.5 14.625 15.83 14.625 15C14.625 14.17 13.955 13.5 13.125 13.5H9.625V16.5Z" fill="currentColor"/></svg>',
                    'strong'
                ),
            };
        case 'ordered_list':
            return {
                command: wrapInList(schema.nodes.ordered_list),
                dom: icon(
                    '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M4.5 8H3.5V5H2.5V4H4.5V8ZM4.5 17.5V17H2.5V16H5.5V20H2.5V19H4.5V18.5H3.5V17.5H4.5ZM2.5 11H4.3L2.5 13.1V14H5.5V13H3.7L5.5 10.9V10H2.5V11ZM7.5 7V5H21.5V7H7.5ZM7.5 19H21.5V17H7.5V19ZM21.5 13H7.5V11H21.5V13Z" fill="currentColor"/></svg>',
                    'Numbered list'
                ),
            };
        case 'bullet_list':
            return {
                command: wrapInList(schema.nodes.bullet_list),
                dom: icon(
                    '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M2.75 6C2.75 5.17 3.42 4.5 4.25 4.5C5.08 4.5 5.75 5.17 5.75 6C5.75 6.83 5.08 7.5 4.25 7.5C3.42 7.5 2.75 6.83 2.75 6ZM2.75 12C2.75 11.17 3.42 10.5 4.25 10.5C5.08 10.5 5.75 11.17 5.75 12C5.75 12.83 5.08 13.5 4.25 13.5C3.42 13.5 2.75 12.83 2.75 12ZM4.25 16.5C3.42 16.5 2.75 17.18 2.75 18C2.75 18.82 3.43 19.5 4.25 19.5C5.07 19.5 5.75 18.82 5.75 18C5.75 17.18 5.08 16.5 4.25 16.5ZM21.25 19H7.25V17H21.25V19ZM7.25 13H21.25V11H7.25V13ZM7.25 7V5H21.25V7H7.25Z" fill="currentColor"/></svg>',
                    'Bullet list'
                ),
            };
        case 'blockquote':
            return { command: wrapInList(schema.nodes.blockquote), dom: icon('>', 'blockquote') };
        case 'paragraph':
            return { command: setBlockType(schema.nodes.paragraph), dom: icon('p', 'paragraph') };

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
