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
        header: {},
        h4: {},
        todayButton: {},
        grid: {},
        day: {
            '&$isToday': {},
            '&$notSelectedMonth': {},
        },
        comfortable: {},
        compact: {},
    })
);

export default useStyles;
