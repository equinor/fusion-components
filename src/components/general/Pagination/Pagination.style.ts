import { makeStyles, createStyles } from '@equinor/fusion-react-styles';

export const useStyles = makeStyles(
    createStyles({
        container: {
            display: 'inline-flex',
            alignItems: 'center',
        },
        padding: {
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 'var(--padding-width)',
            fontSize: 'var(--padding-font-size)',
        },
        range: {
            margin: '0 calc(var(--range-padding))',
            whiteSpace: 'nowrap',
        },
        buttons: {
            margin: '0 calc(var(--range-padding))',
            whiteSpace: 'nowrap',
        },
        comfortable: {
            '--padding-width': 'calc(var(--grid-unit) * 5px)',
            '--padding-font-size': '16px',
            '--range-padding': 'calc(var(--grid-unit) * 8px)',
        },
        compact: {
            '--padding-width': 'calc(var(--grid-unit) * 4px)',
            '--padding-font-size': '14px',
            '--range-padding': 'calc(var(--grid-unit) * 6px)',
        },
    })
);
export default useStyles;
