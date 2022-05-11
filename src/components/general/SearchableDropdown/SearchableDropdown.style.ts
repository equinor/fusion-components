import { makeStyles, createStyles } from '@equinor/fusion-react-styles';

export const useStyles = makeStyles(
    createStyles({
        menuContainer: {
            pointerEvents: 'all',
            minHeight: 'calc(var(--grid-unit) * 8px)',
        },
        selectedItem: {
            flexGrow: 2,
            paddingLeft: 'calc(var(--grid-unit) * 2px)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
        },
        buttonContainer: {
            display: 'flex',
            flexDirection: 'column',
        },
        buttonContent: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            minHeight: 'calc(var(--grid-unit) * 5px)',
            maxHeight: 'calc(var(--grid-unit) * 7px)',
            backgroundColor: 'var(--color-black-alt5)',
            borderBottom: '1px solid var(--color-primary-accent)',
            caretColor: 'var(--color-primary)',
            padding: 'calc(var(--grid-unit) * 1px) calc(var(--grid-unit) * 2px)',
            borderRadius: '4px 4px 0 0',
        },
        dropDownArrow: {
            minWidth: 'calc(var(--grid-unit) * 3px)',
        },
        customSlot: {
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
        },
        noResultsContainer: {
            display: 'flex',
            alignItems: 'center',
            fontSize: '16px',
            minHeight: 'calc(var(--grid-unit) * 8px)',
            padding: '0 calc(var(--grid-unit) * 2px)',
        },
    }),
    { name: 'fusion-component-SearchableDropdown' }
);
export default useStyles;
