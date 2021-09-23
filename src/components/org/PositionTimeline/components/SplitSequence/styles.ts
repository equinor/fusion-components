import { createStyles, makeStyles } from '@equinor/fusion-react-styles';

export const useStyles = makeStyles((theme) =>
    createStyles({
        container: (props: { hasRotationGroups: boolean }) => ({
            display: 'flex',
            flexDirection: 'row',
            height: 'calc(var(--grid-unit) * 7px)',
            alignItems: 'center',
            '&:last-child': props.hasRotationGroups
                ? {
                      borderBottom: '1px solid var(--color-black-alt3)',
                  }
                : {},
        }),
        '&$multipleSequences': {
            borderTop: '1px solid var(--color-black-alt3)',
        },
        sequence: {
            position: 'relative',
            height: '100%',
            width: '100%',
        },
        label: {
            width: 'calc(var(--grid-unit) * 7px)',
            height: 'calc(var(--grid-unit) * 7px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        indicator: {
            position: 'absolute',
            borderRight: '2px solid var(--color-black-alt3)',
            height: '100%',
        },
    })
);
