import { createStyles, makeStyles } from '@equinor/fusion-react-styles';

export const useStyles = makeStyles((theme) =>
    createStyles({
        container: {
            display: 'flex',
            flexDirection: 'column',
            width: '14rem',
            color: theme.colors.text.static_icons__default.getVariable('color'),
            fontSize: '16px',
            fontWeight: 700,
        },
        title: {
            marginBottom: '1rem',
        },
        content: {
            display: 'flex',
            flexDirection: 'row',
            color: theme.colors.text.static_icons__tertiary.getVariable('color'),
            fontSize: '14px',
            fontWeight: 400,
            alignItems: 'center',
            marginBottom: '1rem',
            letterSpacing: '1px',
        },
        spaceBetween: {
            justifyContent: 'space-between',
            marginBottom: '0rem',
        },
        text: {
            marginLeft: '.5rem',
        },
    })
);
