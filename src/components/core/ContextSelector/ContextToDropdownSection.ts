import { SearchableDropdownSection } from '@equinor/fusion-components';
import { Context, ContextTypes } from '@equinor/fusion';

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

const ContextTypesStrings = {
    Contract: 'Contract',
    OrgChart: 'Org Chart',
    PDP: 'PDP/Procosys',
    PimsDomain: 'Pims Domain',
    Portfolio: 'Portfolio',
    Project: 'Project',
    ProjectMaster: 'Project Master',
    Facility: 'Facility',
};

const formattedContextType = (contextType: string): string =>
    contextType in ContextTypesStrings ? ContextTypesStrings[contextType] : contextType;

export default function(
    contexts: Context[],
    searchQuery: string,
    isQuerying: boolean,
    selectecContext?: Context | null
): SearchableDropdownSection[] {
    const isNoMatches = !contexts.length;

    if ((isNoMatches && searchQuery !== '') || isQuerying) {
        return [getEmptySection(isQuerying)];
    }

    const sections: SearchableDropdownSection[] = [];

    return contexts.reduce((s, c): SearchableDropdownSection[] => {
        const context = {
            key: c.id,
            title: c.title,
            contextType: c.type,
            isSelected: selectecContext && selectecContext.id === c.id,
        };

        const sectionIndex = s.findIndex(s => s.key === c.type.id);

        sectionIndex > -1
            ? sections[sectionIndex].items.push(context)
            : sections.push({
                  key: c.type.id,
                  title: formattedContextType(c.type.id),
                  items: [context],
              });

        return sections;
    }, sections);
}
