import { PersonDetails, PersonAccountType } from '@equinor/fusion';
import { SearchableDropdownSection } from '@equinor/fusion-components';

const isPersonAccountTypeIn = (person: PersonDetails, accountTypes: PersonAccountType[]) =>
    accountTypes.indexOf(person.accountType) !== -1;

const filterPeopleByAccountType = (
    people: PersonDetails[],
    includedAccountTypes: PersonAccountType[]
) => {
    return people.reduce((acc: PersonDetails[], curr: PersonDetails) => {
        if (isPersonAccountTypeIn(curr, includedAccountTypes)) {
            acc.push(curr);
        }

        return acc;
    }, []);
};

const getPrimarySection = items => ({
    key: 'primary',
    title: 'Employees and consultants',
    items,
});

const getSecondarySection = items => ({
    key: 'secondary',
    title: 'External',
    items,
});

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

export function singlePersonToDropdownSection(person: PersonDetails): SearchableDropdownSection[] {
    const items = [person].map(p => ({
        key: p.azureUniqueId,
        title: p.name,
        person: p,
        isSelected: true,
    }));

    if (isPersonAccountTypeIn(person, ['Consultant', 'Employee'])) {
        return [getPrimarySection(items)];
    } else {
        return [getSecondarySection(items)];
    }
}

export default function(
    people: PersonDetails[],
    selectedId: string,
    searchQuery: string,
    isQuerying: boolean
): SearchableDropdownSection[] {
    const primary = filterPeopleByAccountType(people, ['Consultant', 'Employee']);
    const secondary = filterPeopleByAccountType(people, ['External']);

    const isNoMatches = primary.length === 0 && secondary.length === 0;

    if ((isNoMatches && searchQuery !== '') || isQuerying) {
        return [getEmptySection(isQuerying)];
    }

    const sections: SearchableDropdownSection[] = [];

    if (primary.length > 0) {
        const items = primary.map((p: PersonDetails) => ({
            key: p.azureUniqueId,
            title: p.name,
            person: p,
            isSelected: p.azureUniqueId === selectedId,
        }));

        sections.push(getPrimarySection(items));
    }

    if (secondary.length > 0) {
        const items = secondary.map((p: PersonDetails) => ({
            key: p.azureUniqueId,
            title: p.name,
            person: p,
            isSelected: p.azureUniqueId === selectedId,
        }));

        sections.push(getSecondarySection(items));
    }

    return sections;
}
