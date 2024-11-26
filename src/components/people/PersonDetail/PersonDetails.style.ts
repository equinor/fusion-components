import { makeStyles, createStyles } from '@equinor/fusion-react-styles';

export const useStyles = makeStyles(
    createStyles({
        personDetails: {
            fontSize: '14px',
            lineHeight: '24px',
            whiteSpace: 'nowrap',
            display: 'flex',
        },
        detailsContainer: {
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
        },
        imageContainer: {
            isplay: 'flex',
            flexDirection: 'column',
            flex: 0,
            padding: '0 calc(var(--grid-unit) * 3px)',
        },
        presenceSection: {
            display: 'flex',
            flexDirection: 'row',
        },
        presenceUnknown: {
            paddingRight: 'calc(var(--grid-unit) * 1px)',
            color: 'var(--color-black-alt3)',
        },
        accountTypeSection: {
            display: 'flex',
            flexDirection: 'row',
        },
        iconContainer: {
            display: 'flex',
            alignItems: 'center',
            paddingRight: 'calc(var(--grid-unit) * 1px)',
        },
        personPositions: {
            paddingTop: 'calc(var(--grid-unit) * 1px)',
        },
        personName: {
            fontSize: '18px',
            fontWeight: 600,
        },
        detailSection: {
            paddingTop: 'calc(var(--grid-unit) * 1px)',
        },
    }),
    { name: 'fusion-components-PersonDetails' }
);

export default useStyles;
