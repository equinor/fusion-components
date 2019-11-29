import { SearchableDropdownSection } from '@equinor/fusion-components';
import { Context } from '@equinor/fusion/lib/http/apiClients/models/context';

const getEmptySection = (isQuerying: boolean) => ({
    key: 'empty',
    items: [
        {
            key: 'empty',
            title: isQuerying ? 'Searching...' : 'No results.',
            isDisabled: true,
        },
    ],
});

const getDefaultSection = (items: any) => ({
    key: 'default',
    items,
});

export default function(
    contexts: Context[],
    searchQuery: string,
    isQuerying: boolean,
    context?: Context | null
): SearchableDropdownSection[] {
    const isNoMatches = !contexts.length;

    if ((isNoMatches && searchQuery !== '') || isQuerying) {
        return [getEmptySection(isQuerying)];
    }

    const sections: SearchableDropdownSection[] = [];

    const items = contexts.map(c => ({
        key: c.id,
        title: c.title,
        contextType: c.type,
        isSelected: context && c.id === context.id,
    }));

    sections.push(getDefaultSection(items));

    return sections;
}
