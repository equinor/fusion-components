import { makeStyles, createStyles } from '@equinor/fusion-react-styles';

export const useStyles = makeStyles(
    (theme) =>
        createStyles({
            chipContainer: {
                display: 'inline-block',

                '&:hover': {
                    '& $title': {
                        color: 'var(--chip-hover-color)',
                    },
                    '& $removeButton': {
                        color: 'var(--chip-hover-color)',
                    },
                },

                '--chip-color': `var(--sidebar-chipTextColor, ${theme.colors.interactive.primary__resting.getVariable(
                    'color'
                )})`,
                '--chip-background-color': `var(--sidebar-chipBackgroundColor, ${theme.colors.interactive.table__header__fill_resting.getVariable(
                    'color'
                )})`,
                '--chip-hover-color': `var(--sidebar-chipHoverTextColor, ${theme.colors.interactive.primary__hover.getVariable(
                    'color'
                )})`,
            },
            chip: {
                alignItems: 'center',
                backgroundColor: 'var(--chip-background-color)',
                borderRadius: '16px',
                color: 'var(--chip-color)',
                cursor: 'default',
                display: 'inline-flex',
                padding: 'calc(var(--grid-unit) * 1px) calc(var(--grid-unit) * 2px)',
            },
            removeButton: {
                cursor: 'pointer',
                display: 'flex',
            },
            title: {
                margin: 0,
                '& + $removeButton': {
                    paddingLeft: 'calc(var(--grid-unit) * 1px)',
                },
            },
            secondary: {
                '--chip-color': 'var(--color-secondary)',
                '--chip-background-color': 'var(--color-secondary-alt3)',
                '--chip-hover-color': 'var(--color-secondary)',
            },
            primary: {
                '--chip-color': 'var(--color-primary)',
                '--chip-background-color': 'var(--color-primary-alt4)',
                '--chip-hover-color': 'var(--color-primary-hover)',
            },
            disabled: {
                '--chip-color': 'var(--color-black-alt2)',
                '--chip-background-color': 'var(--color-black-alt5)',
                '--chip-hover-color': 'var(--color-black-alt2)',

                '& $chip': {
                    cursor: 'not-allowed',
                },
            },
        }),
    { name: 'fusion-component-chip' }
);
export default useStyles;
