import { makeStyles, createStyles } from '@equinor/fusion-react-styles';

export const useStyles = makeStyles(
    createStyles({
        notificationsContainer: {
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
        },
        tabContent: {
            overflow: 'auto',
            padding: '0 1rem 1rem 1rem',
        },
        noNotificationMessage: {
            display: 'flex',
            justifyContent: 'center',
            fontWeight: 500,
            paddingTop: '1rem',
        },
        divisionTitle: {
            paddingLeft: '0.5rem',
        },

        division: {
            paddingBottom: '1rem',
        },
        dateMarker: {
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-end',
            padding: '0.5rem 0',
            fontSize: '12px',
            color: 'var(--color-black-alt2)',
        },
        settingsTab: {
            marginLeft: 'auto',
        },
        notificationWrapper: {
            borderRadius: '4px',
            marginBottom: 'calc(var(--grid-unit) * 2px)',
            borderCollapse: 'separate',
            border: '1px solid var(--color-black-alt4)',
        },
        unSeen: {
            border: '1px solid var(--color-primary)',
        },
        chip: {
            backgroundColor: 'var(--color-danger)',
            borderRadius: '50%',
            width: '1rem',
            display: 'inline',
            margin: '0.5rem',
            padding: '0.25rem 0.5rem 0.25rem 0.5rem',
            color: '#fff',
        },
    }),
    { name: 'fusion-components-NotificationSideSheet' }
);

export default useStyles;
