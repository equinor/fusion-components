import { makeStyles, createStyles } from '@equinor/fusion-react-styles';

export const useStyles = makeStyles(
    createStyles({
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
        },
        accordionContainer: {
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            alignItems: 'center',
        },
        content: {
            width: '80%',
        },
        link: {
            cursor: 'pointer',
            color: 'var(--color-primary)',

            paddingLeft: 'calc(var(--grid-unit) * 1px)',
            '&:hover': { textDecoration: 'underline' },
        },
        detailsContainer: {
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            paddingLeft: 'calc(var(--grid-unit) * 13px)',
        },
        description: {
            width: '80%',
        },
        ownerContainer: {
            display: 'flex',
            flexDirection: 'column',
            paddingTop: 'calc(var(--grid-unit) * 1px)',
        },
        createdBy: {
            color: 'var(--color-black-alt3)',
            fontSize: '14px',
        },
        personDetailsContainer: {
            display: 'flex',
            flexDirection: 'row',
            paddingTop: 'calc(var(--grid-unit) * 1px)',
            columnGap: 'calc(var(--grid-unit) * 1px)',
        },
        personDetails: {
            display: 'flex',
            flexDirection: 'column',
        },
        creatorEmail: {
            color: 'var(--color-primary)',
            textDecoration: 'underline',
        },

        sharedBookmark: {
            height: 'calc(var(--grid-unit) * 6px)',
            width: 'calc(var(--grid-unit) * 6px)',
            display: 'flex',
        },
        icon: {
            height: 'calc(var(--grid-unit) * 6px)',
            width: 'calc(var(--grid-unit) * 6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',

            '&:hover': {
                backgroundColor: 'var(--color-primary-alt4)',
            },
        },

        viewMore: {
            cursor: 'pointer',
        },
        shareContainer: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            columnGap: '10px',
        },
        inputContainer: {
            backgroundColor: '#f1f3f4',
            height: '30px',
            width: '100%',
            padding: '5px',
            borderRadius: '0.5em',
        },
        input: {
            backgroundColor: 'transparent',
            borderWidth: 0,
            textOverflow: 'ellipsis',
            width: 'inherit',
            lineHeight: '2em',
        },
        buttonContainer: {
            paddingLeft: '2px',
        },
    })
);
export default useStyles;
