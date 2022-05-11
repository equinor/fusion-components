import { makeStyles, createStyles } from '@equinor/fusion-react-styles';

export const useStyles = makeStyles(
    createStyles({
        cardContainer: {
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
        },
        actionableComponents: {
            display: 'flex',
            flexDirection: 'row',
            height: 'calc(var(--grid-unit) * 10px)',
            alignItems: 'center',
            padding: '0 calc(var(--grid-unit) * 2px)',
            borderTop: '1px solid var(--color-black-alt3)',
        },
        closeIconContainer: {
            position: 'absolute',
            top: 0,
            right: 0,
            zIndex: 10000,
        },
        notificationCard: {
            borderRadius: '4px',
            backgroundColor: 'var(--color-black-alt5)',
        },
    })
);
export default useStyles;
