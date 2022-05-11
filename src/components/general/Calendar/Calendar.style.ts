import { makeStyles, createStyles } from '@equinor/fusion-react-styles';

export const useStyles = makeStyles(
    createStyles({
        container: {
            '&$comfortable': {
                '--header-height': 'calc(var(--grid-unit) * 8px)',
                '--cell-size': 'calc(var(--grid-unit) * 6px)',
                '--week-margin': 'calc(var(--grid-unit) * 1px)',
            },

            '&$compact': {
                '--header-height': 'calc(var(--grid-unit) * 6px)',
                '--cell-size': 'calc(var(--grid-unit) * 4px)',
                '--week-margin': 'calc(var(--grid-unit) * 1px)',
            },
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'var(--color-white)',
            height: 'var(--header-height)',

            '& h4': {
                flexGrow: 1,
                textAlign: 'center',
            },
        },

        todayButton: {
            marginRight: 'calc(var(--grid-unit) * 1px)',
        },
        grid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',

            '& header': {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: 'var(--cell-size)',
                marginBottom: 'var(--week-margin)',
                background: 'var(--color-black-alt4)',
            },
        },

        day: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: 'var(--cell-size)',
            marginBottom: 'var(--week-margin)',
        },
        isToday: {
            fontWeight: 'bold',
        },
        notSelectedMonth: {
            color: 'var(--color-black-alt3)',
        },
        comfortable: {},
        compact: {},
    }),
    { name: 'fusion-components-Calendar' }
);

export default useStyles;
