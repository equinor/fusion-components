import { createStyles, makeStyles } from '@equinor/fusion-react-styles';

export const useStyles = makeStyles(
    createStyles({
        container: {
            display: 'flex',
            alignItems: 'center',
        },
        details: {
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            justifyContent: 'center',
            marginLeft: 'var(--details-spacing)',
            overflow: 'hidden',
        },
        name: {
            fontSize: '16px',
            marginBottom: 'var(--name-spacing)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
        },
        noMargin: {
            margin: '0px',
        },
        jobTitle: {
            fontWeight: 600,
            fontSize: '16px',
            marginBottom: 'var(--name-spacing)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
        },
        email: {
            fontSize: '16px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
        },
        comfortable: {
            '--details-spacing': 'calc(var(--grid-unit) * 2px)',
            '--name-spacing': 'calc(var(--grid-unit) * 0.25px)',
        },
        compact: {
            '--details-spacing': 'calc(var(--grid-unit) * 1px)',
            '--name-spacing': 'calc(var(--grid-unit) * 0.1px)',
        },
    }),
    { name: 'fusion-components-PersonCard' }
);

export default useStyles;
