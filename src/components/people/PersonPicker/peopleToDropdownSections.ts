import { PersonDetails, PersonAccountType } from '@equinor/fusion';
import { SearchableDropdownSection } from '@equinor/fusion-components';

const filterPeople = (people: PersonDetails[], includedAccountTypes: PersonAccountType[]) => {
    return people.reduce((acc: PersonDetails[], curr: PersonDetails) => {
        const include = includedAccountTypes.indexOf(curr.accountType) !== -1;

        if (include) {
            acc.push(curr);
        }

        return acc;
    }, []);
};

export default function(
    people: PersonDetails[],
    selectedId: string,
    searchQuery: string,
    isQuerying: boolean
): SearchableDropdownSection[] {
    const primary = filterPeople(people, ['Consultant', 'Employee']);
    const secondary = filterPeople(people, ['External']);

    const isNoMatches = primary.length === 0 && secondary.length === 0;

    if ((isNoMatches && searchQuery !== '') || isQuerying) {
        return [
            {
                key: 'nomatches',
                items: [
                    {
                        key: 'empty',
                        title: isQuerying ? 'Searching...' : 'No results.',
                        isDisabled: true,
                    },
                ],
            },
        ];
    }

    const sections: SearchableDropdownSection[] = [];

    if (primary.length > 0) {
        sections.push({
            key: 'primary',
            title: 'Employees and consultants',
            items: primary.map((p: PersonDetails) => ({
                key: p.azureUniqueId,
                title: p.name,
                person: p,
                isSelected: p.azureUniqueId === selectedId,
            })),
        });
    }

    if (secondary.length > 0) {
        sections.push({
            key: 'secondary',
            title: 'External',
            items: secondary.map((p: PersonDetails) => ({
                key: p.azureUniqueId,
                title: p.name,
                person: p,
                isSelected: p.azureUniqueId === selectedId,
            })),
        });
    }

    return sections;
}
