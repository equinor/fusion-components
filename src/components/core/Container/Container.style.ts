import { makeStyles, createStyles } from '@equinor/fusion-react-styles';
export const useStyles = makeStyles(
    createStyles({
        root: {
            width: '100%',
            height: '100%',
            position: 'relative',
            display: 'grid',
            gridTemplateAreas: '"header" "content"',
            gridTemplateRows: 'var(--header-height) calc(100 % - var(--header-height))',
            '&$noHeader': {
                '--header-height': '0px',
            },
        },
        comfortable: {
            '--header-height': 'calc((var(--grid-unit) * 10px) + 2px)',
        },
        compact: {
            '--header-height': 'calc((var(--grid-unit) * 6px) + 2px)',
        },
        noHeader: {},
    }),
    { name: 'fusion-components-container' }
);
export default useStyles;
