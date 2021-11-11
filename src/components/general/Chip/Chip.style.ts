import { makeStyles, createStyles } from '@equinor/fusion-react-styles';

export const useStyles = makeStyles(
    createStyles({
        chipContainer: {
            display: 'inline-block',

            '&:hover': {
                '&$title, &$removeButton': {
                    color: 'var(--chip-hover-color)',
                },
            },

            '--chip-color': 'var(--color-primary)',
            '--chip-background-color': 'var(--color-black-alt5)',
            '--chip-hover-color': 'var(--color-primary-hover)',
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
            '&$removeButton': {
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

            '&$chip': {
                cursor: 'not-allowed',
            },
        },
    }),
    { name: 'fusion-component-Chip' }
);
export default useStyles;
