import { createStyles, makeStyles } from '@equinor/fusion-react-styles';

export const useStyles = makeStyles(
    createStyles({
        container: {
            position: 'relative',
            width: '100%',
            height: '100%',
        },
        messageContainer: {
            position: 'relative',
            left: 0,
            bottom: 0,
            right: 0,
            display: 'flex',
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            zIndex: 999,
        },
        message: {
            textAlign: 'center',
        },
        comfortable: {
            top: 0,
            marginTop: 'calc(var(--grid-unit) * 15px)',

            '& $title': {
                paddingTop: 'calc(var(--grid-unit) * 6px)',
                fontSize: '28px',
                height: 'calc(var(--grid-unit) * 4px)',
                overflow: 'hidden',
            },

            '& $message': {
                fontSize: '20px',
                //height: 'calc(var(--grid-unit) * 3px)',
                paddingBottom: 'calc(var(--grid-unit) * 5px)',
                paddingTop: 'calc(var(--grid-unit) * 3px)',
                height: 'auto;',
            },
        },
        compact: {
            marginTop: 0,
            top: '50%',
            transform: 'translateY(-50%)',

            '& $title': {
                paddingTop: 'calc(var(--grid-unit) * 5px)',
                fontSize: '16px',
                height: 'calc(var(--grid-unit) * 3px)',
                fontWeight: 600,
            },

            '& $message': {
                fontSize: '16px',
                //height: 'calc(var(--grid-unit) * 2px)',
                paddingBottom: 'calc(var(--grid-unit) * 4px)',
                paddingTop: 'calc(var(--grid-unit) * 1px)',
                height: 'auto',
            },
        },

        ':global($react-grid-layout)': {
            //PDP tile styling
            $messageContainer$comfortable: {
                marginTop: 0,
                top: '50%',
                transform: 'translateY(-50%)',

                '& $title': {
                    paddingTop: 'calc(var(--grid-unit) * 5px)',
                    fontSize: '16px',
                    height: 'calc(var(--grid-unit) * 3px)',
                    fontWeight: 600,
                },

                '& $message': {
                    fontSize: '16px',
                    height: 'calc(var(--grid-unit) * 2px)',
                    paddingBottom: 'calc(var(--grid-unit) * 4px)',
                    paddingTop: 'calc(var(--grid-unit) * 1px)',
                },
            },
        },
    })
);
